import { useState } from "react";
import { Button } from "../button/Button";
import s from '../../App.module.css';

export const ModalContent = ({ dishes, closeModal, stateModal }) => {
    const [checkedItems, setCheckedItems] = useState([]);

    function changeValues() {
        const checkedObj = [...document.querySelectorAll('input[type="checkbox"]:checked')].map(checkbox => ({ [checkbox.id]: checkbox.value }));
        setCheckedItems(checkedObj);
    };

    return (
        <div className={s.modalBox}>
            <Button className={s.modalButton} handlerClick={closeModal}>Close</Button>
            <h2 className={s.modalTitle}>Сhoose a dish for {stateModal.mealType} on {stateModal.day}</h2>
            <ul>{dishes.map((item) =>
                <li key={item.idMeal}>
                    <input type="checkbox" value={item.strMeal} id={item.idMeal} onChange={changeValues} />
                    <label htmlFor={item.strMeal}>{item.strMeal}</label>
                </li>
            )}</ul>
        </div>
    )
}
