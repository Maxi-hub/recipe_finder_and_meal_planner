import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import s from '../../App.module.css';
import { Button } from '../button/Button';
import { setIngredientsState, setShoppingListState } from '../../reducers/recipeSlice';
import { useEffect, useState } from 'react';

export const ShoppingList = () => {
    let checkedObj = [];
    const productList = useSelector(state => state.recipe.ingredientsState);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { shoppingListState } = useSelector(state => state.recipe);
    const [shoppingListItems, setShoppingListItems] = useState([]);

    console.log(shoppingListState); // Массив объектов
    console.log(productList); // объект с ключами и значениями(массив объектов) {'Sushi': [{},{},{}]}

    useEffect(() => {
        const initialShoppingListItems = Object.values(productList).map(arr => {
            return arr.filter(item => {
                const value = Object.values(item)[0];
                return value[1] === true; 
            });
        });
        setShoppingListItems(initialShoppingListItems);

    }, [productList]); 

     useEffect(() => {
        if (shoppingListState.length > 0) {
            setShoppingListItems([shoppingListState]);
        } else {
            setShoppingListItems([]);
        }
    }, [shoppingListState]);

    

    function handleChange() {
        const checkboxes = [...document.querySelectorAll('input[type="checkbox"]')];
        checkedObj = checkboxes.map(checkbox => ({
            [checkbox.id]: [checkbox.value, checkbox.checked],
        }));
        console.log(checkedObj);
        dispatch(setShoppingListState(checkedObj));
    }


    function handleClick(dishName) {
        const updatedShoppingList = shoppingListItems.map(arr => {
            return arr.filter(obj => Object.keys(obj)[0] !== dishName)
        });
        const flattenedList = updatedShoppingList.flat();
        const newShoppingListState = flattenedList.map(obj => (
            { [Object.keys(obj)[0]]: obj[Object.keys(obj)[0]] }
        ));
        console.log(newShoppingListState);
        dispatch(setShoppingListState(newShoppingListState));

        // dispatch(setIngredientsState({ dishName, }))
    }


    const listItems = shoppingListItems.map(arr => {
        return (
            arr.map(obj => {
                console.log(obj);
                const key = Object.keys(obj)[0];
                const value = obj[key];

                const checkedItems = shoppingListState.some(obj => {
                    const values = Object.keys(obj)[0];
                    return values === key && obj[values][1] === true;
                });

                return <li key={key}>
                    <input type="checkbox" value={value} id={key} onChange={handleChange} checked={checkedItems} />
                    <label htmlFor={value}> {key} - {value}</label>
                    <button onClick={() => handleClick(key)}>Delete</button>
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