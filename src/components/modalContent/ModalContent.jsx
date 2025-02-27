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
        const object = Object.entries(modalListState).reduce((acc, [day, mealType]) => {
            if (day === stateModal.day && mealType[stateModal.mealType]) {
                return mealType[stateModal.mealType];
            }
            else {
                return acc;
            }
        }, {});
        setCheckedObj(object);
    }, [modalListState])

    const handleCheckboxChange = (id) => {
        const newCheckedObj = {
            ...checkedObj,
            [id]: !checkedObj[id]
        };

        setCheckedObj(newCheckedObj);

        let obj = {
            [stateModal.day]: {
                [stateModal.mealType]: newCheckedObj
            }
        };

        if (Object.keys(modalListState).length > 0) {
            const day = Object.keys(modalListState)[0];
            const mealType = Object.keys(modalListState[day])[0];

            if (stateModal.day === day) {
                if (stateModal.mealType === mealType) {
                    let newobj = {
                        ...modalListState,
                        [stateModal.day]: {
                            ...modalListState[stateModal.day],
                            [stateModal.mealType]: {
                                ...modalListState[stateModal.day][stateModal.mealType],
                                ...newCheckedObj
                            }
                        }
                    }
                    dispatch(setModalListState(newobj));
                } else {
                    let newobj = {
                        ...modalListState,
                        [stateModal.day]: {
                            ...modalListState[stateModal.day],
                            [stateModal.mealType]: newCheckedObj
                        }
                    }
                    dispatch(setModalListState(newobj));
                }
            } else {
                let newobj = {
                    ...modalListState,
                    [stateModal.day]: {
                        ...modalListState[stateModal.day],
                        [stateModal.mealType]: newCheckedObj
                    }
                };
                dispatch(setModalListState(newobj));
            }
        } else {
            dispatch(setModalListState(obj));
        }
    }

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
            {dishes.length > 0
                ? (
                    <div key={Date.now()}>
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