import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import s from '../../App.module.css';
import { Button } from '../button/Button';

export const ShoppingList = () => {
    const productList = useSelector(state => state.recipe.shoppingList);
    const navigate = useNavigate();

    const listItems = productList.map(element => {
        const key = Object.keys(element)[0];
        const value = element[key];
        return <li key={key}>
            <input type="checkbox" value={value} id={key} />
            <label htmlFor={value}> {key} - {value}</label>
        </li>
    });

    function goBack() {
        navigate(-1);
    }

    return (
        <div>
            <Button className={`${s.button} ${s.goBackButton}`} handlerClick={goBack}>Go back</Button>
            <h2>Mark the ingredients that you have already purchased</h2>
            <ul style={{textAlign: 'justify'}}>{listItems}</ul>
        </div>
    )
}