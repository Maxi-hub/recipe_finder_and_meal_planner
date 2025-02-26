import { useSelector } from 'react-redux';
import s from '../../App.module.css';
import { Button } from '../button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Modal from 'react-modal';
import { ModalContent } from '../modalContent/ModalContent';
import React from 'react';


export const MealPlanner = () => {
  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dishes = useSelector(state => state.recipe.mealPlan);
  const { modalListState } = useSelector(state => state.recipe);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [stateModal, setStateModal] = useState({ day: '', mealType: '' });
  const navigate = useNavigate();

  const customStyles = {
    content: {
      width: "600px",
      height: "400px",
      margin: "auto",
      padding: "20px",
      borderRadius: "10px",
      border: "1px solid #ccc",
      backgroundColor: "#fff",
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
    },
  };

  const openModal = (day, mealType) => {
    setStateModal({ day, mealType });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const getFilteredMeals = (currentDay, currentDayMealType) => {
    if (!modalListState[currentDay]) return [];

    const mealDay = modalListState[currentDay][currentDayMealType];
    if (!mealDay) return [];

    const object = Object.fromEntries(Object.entries(mealDay).filter(([_, value]) => value === true));

    const keys = Object.keys(object);
    return dishes.filter(item => keys.includes(item.idMeal));
  }

  const renderContent = (currentDay, currentDayMealType) => {
    const filteredMeals = getFilteredMeals(currentDay, currentDayMealType);

    return filteredMeals.length > 0
      ? (<ol>
        {filteredMeals.map(element => (
          <Link to={`/${element.strMeal}`} style={{ color: 'teal' }}><li key={element.idMeal}>{element.strMeal}</li></Link>
        ))}
      </ol>)
      : <span style={{ color: '#ccc' }}>+</span>;
  }


  function goBack() {
    navigate('/');
  }

  return (
    <div className={s.mealPlannerBlock}>
      <Button className={`${s.button} ${s.goBackButton}`} handlerClick={goBack}>Go back</Button>
      <h1>Weekly Meal Plan</h1>
      <p>Here you can plan your weekly meal schedule. You need to go to the day of the week and meal field and select the appropriate dish.</p> 
      <div className={s.mealBox}>
        <div className={s.mealPlan}>
          <div className={`${s.cell} ${s.headerCell}`}></div>
          {(['Breakfast', 'Lunch', 'Dinner']).map(mealType => (
            <div className={`${s.cell} ${s.headerCell}`}>{mealType}</div>
          ))}
          {weekDays.map((day, index) => (
            <React.Fragment>
              <div key={`${day}-${index}`} className={`${s.cell} ${s.day}`}>{day}</div>
              {(['breakfast', 'lunch', 'dinner']).map(mealType => (
                <div
                  key={`${index}-${mealType}`}
                  className={`${s.cell} ${s.meal}`}
                  onClick={() => openModal(day, mealType)}
                >
                  {renderContent(day, mealType)}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} className={s.modalContent}>
        {<ModalContent dishes={dishes} closeModal={closeModal} stateModal={stateModal} />}
      </Modal>
    </div>
  )
}
