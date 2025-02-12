import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import s from '../../App.module.css';
import { Button } from '../button/Button';
import { setShoppingListState } from '../../reducers/recipeSlice';

export const ShoppingList = () => {
    const productList = useSelector(state => state.recipe.ingredientsState);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { shoppingListState } = useSelector(state => state.recipe);
    console.log(shoppingListState);

    const shoppingListItems = Object.values(productList).map(arr => {
        return arr.filter(item => {
            const value = Object.values(item)[0];
            return value[1] === true;
        });
    });
    console.log(shoppingListItems);

    function handleChange() {
        const checkboxes = [...document.querySelectorAll('input[type="checkbox"]')];
        const checkedObj = checkboxes.map(checkbox => ({
            [checkbox.id]: [checkbox.value, checkbox.checked],
        }));
        dispatch(setShoppingListState(checkedObj));
    }

    const listItems = shoppingListItems.map(arr => {
        return (
            arr.map(obj => {
                const key = Object.keys(obj)[0];
                console.log(key);
                const value = obj[key];

                const checkedItems = shoppingListState.some(obj => {
                   console.log(obj);
                    const values = Object.keys(obj)[0];
                    console.log(values);
                    return values === key &&  obj[values][1] === true;
                });
            
                return <li key={key}>
                    <input type="checkbox" value={value} id={key} onChange={handleChange} checked={checkedItems} />
                    <label htmlFor={value}> {key} - {value}</label>
                </li>
            })
        )
    });

    function goBack() {
        navigate(-1);
    }

    return (
        <div>
            <Button className={`${s.button} ${s.goBackButton}`} handlerClick={goBack}>Go back</Button>
            {shoppingListItems.length > 0 ? (
                <div>
                    <h2>Mark the ingredients that you have already purchased</h2>
                    <ul style={{ textAlign: 'justify' }}>
                        {listItems}
                    </ul>
                </div>

            ) : (
                <div>
                    <p>This list is empty now.</p>
                    <p>Go back to the recipe and mark the ingredients you need to buy.</p>
                </div>
            )
            }
        </div>
    )
}