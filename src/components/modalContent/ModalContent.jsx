import { Button } from "../button/Button";
import s from '../../App.module.css';
import { useDispatch, useSelector } from "react-redux";
import { setModalListState } from "../../reducers/recipeSlice";
import { useEffect, useState } from "react";

export const ModalContent = ({ dishes, closeModal, stateModal }) => {
    const dispatch = useDispatch();
    const { modalListState } = useSelector(state => state.recipe);
    const [checkedObj, setCheckedObj] = useState({});

    useEffect(() => {
        setCheckedObj(modalListState);
    }, [modalListState])

    const handleCheckboxChange = (id) => {
        const newCheckedObj = {
            ...checkedObj,
            [id]: !checkedObj[id]
        };
        setCheckedObj(newCheckedObj);
        console.log(newCheckedObj);
        dispatch(setModalListState(newCheckedObj));
    };

    const dishList = dishes.map(item => {
        const isChecked = checkedObj[item.idMeal] || false;

        return <li key={item.idMeal}>
            <input
                type="checkbox"
                value={item.strMeal}
                id={item.idMeal}
                onChange={() => handleCheckboxChange(item.idMeal)}
                checked={isChecked}
            />
            <label htmlFor={item.strMeal}>{item.strMeal}</label>
        </li>
    })


    return (
        <div className={s.modalBox}>
            <Button className={s.modalButton} handlerClick={closeModal}>Close</Button>
            {
                dishes.length > 0
                    ? (
                        <div>
                            <h2 className={s.modalTitle}>Сhoose a dish for {stateModal.mealType} on {stateModal.day}</h2>
                            <ul>{dishList}</ul>
                        </div>
                    )
                    : (
                        <h3>Go back to the recipes and add your favorite dishes to the meal plan for the week.</h3>
                    )
            }
        </div>
    )
}
