import { useSelector } from 'react-redux';
import s from '../../App.module.css';
import { Button } from '../button/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { ModalContent } from '../modalContent/ModalContent';


export const MealPlanner = () => {
  const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dishes = useSelector(state => state.recipe.mealPlan);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { modalListState } = useSelector(state => state.recipe);
  const [stateModal, setStateModal] = useState({ day: '', mealType: '' });
  const [listTargetMeal, setListTargetMeal] = useState([]);
  const navigate = useNavigate();

  console.log(listTargetMeal);
  console.log(stateModal);

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

  // useEffect(() => {

  // }, [stateModal, listTargetMeal, modalListState])


  const openModal = (day, mealType) => {
    setStateModal({ day, mealType });
    console.log(listTargetMeal);
    const find = listTargetMeal.find(obj => obj.day === stateModal.day && obj.mealType === stateModal.mealType) || {};
    console.log(find);
    const newObj = Object.assign(find, modalListState);

    // if (find) {
    //   find = newObj;
    // }
    console.log(modalListState);
    console.log(newObj);
    // const arrMeal = Object.entries(modalListState);
    // const checkedMeal = arrMeal.filter(arr => arr[1] === true);
    // console.log(checkedMeal);
    const dayDishes = Object.assign(stateModal, modalListState);
    setListTargetMeal(prevState => [...prevState, dayDishes]);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  function goBack() {
    navigate('/');
  }

  return (
    <div>
      <Button className={`${s.button} ${s.goBackButton}`} handlerClick={goBack}>Go back</Button>
      <h1>Weekly Meal Plan</h1>
      <p>Here you can plan your weekly meal schedule. Here you can plan your weekly meal schedule. You need to go to the day of the week and meal field and select the appropriate dish.</p>
      <div>
        <div className={s.mealPlan}>
          <div className={`${s.cell} ${s.headerCell}`}></div>
          <div className={`${s.cell} ${s.headerCell}`}>Breakfast</div>
          <div className={`${s.cell} ${s.headerCell}`}>Lunch</div>
          <div className={`${s.cell} ${s.headerCell}`}>Dinner</div>

          {weekDays.map((day, index) => (
            <>
              <div key={`${day}-${index}`} className={`${s.cell} ${s.day}`}>{day}</div>
              <div
                key={`${day}-breakfast`}
                className={`${s.cell} ${s.meal}`}
                onClick={() => openModal(day, "breakfast")}
              >+</div>
              <div
                key={`${day}-lunch`}
                className={`${s.cell} ${s.meal}`}
                onClick={() => openModal(day, "lunch")}
              >+</div>
              <div key={`${day}-dinner`} className={`${s.cell} ${s.meal}`}
                onClick={() => openModal(day, "dinner")}
              >+</div>
            </>
          ))}
        </div>
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
          {<ModalContent dishes={dishes} closeModal={closeModal} stateModal={stateModal} />}
        </Modal>
      </div>
    </div>
  )
}
