import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import s from '../../App.module.css';
import { Button } from '../button/Button';
import { resetIngredientsState, setShoppingListState } from '../../reducers/recipeSlice';
import { useEffect, useState } from 'react';

export const ShoppingList = () => {
    const productList = useSelector(state => state.recipe.ingredientsState);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { shoppingListState } = useSelector(state => state.recipe);
    const [shoppingListItems, setShoppingListItems] = useState({});
    const [checkedObj, setCheckedObj] = useState({});

    console.log(productList);
    console.log(shoppingListState);
    console.log(shoppingListItems);

    function filteredObjs(dishesList) {
        console.log(dishesList);
        const filteredObjs = Object.entries(dishesList).map(([nameOfDish, ingredients]) => {
            const filteredValues = ingredients.filter(ingredient =>
                Object.values(ingredient)[0][1] === true
            );
            return (filteredValues.length > 0 ? { [nameOfDish]: filteredValues } : null);
        });
        return Object.assign({}, ...filteredObjs);
    }

    useEffect(() => {
        console.log(productList);
        const dishesObject = filteredObjs(productList);
        dispatch(setShoppingListState(dishesObject));
        setShoppingListItems(dishesObject);
        setCheckedObj(dishesObject);
    }, [productList]);

    useEffect(() => {
        console.log(shoppingListItems);
        console.log(Object.keys(shoppingListItems).length > 0);
        if (Object.keys(shoppingListItems).length > 0) {
            const dishesObject = filteredObjs(shoppingListItems);
            setShoppingListItems(dishesObject);
        }
    }, [shoppingListState]);


    function handleChange(event) {
        const { id, checked } = event.target;

        const updatedCheckedObj = Object.fromEntries(
            Object.entries(checkedObj).map(([dishName, ingredients]) => {
                const updatedIngredients = ingredients.map(ingredient => {
                    const objName = Object.keys(ingredient)[0];
                    const newIngredient = {
                        [objName]: [[...ingredient[objName][0]], checked]
                    };
                    return objName === id ? newIngredient : ingredient;
                });

                return [dishName, updatedIngredients];
            })
        );
        setCheckedObj(updatedCheckedObj);
        dispatch(setShoppingListState(updatedCheckedObj));
    }

    function handleClick() {
        if (window.confirm("Are you sure you want to delete the shopping list?")) {
            setShoppingListItems({});
            dispatch(setShoppingListState({}));
            dispatch(resetIngredientsState());
        }
    }

    console.log(shoppingListItems);
    const values = Object.values(shoppingListItems).flat();
    const listItems = values.map(obj => {
        const key = Object.keys(obj)[0];
        const value = obj[key];

        return (
            <li key={key}>
                <input
                    type="checkbox"
                    value={key}
                    id={key}
                    onChange={handleChange}
                />
                <label htmlFor={key}> {key} - {value}</label>
            </li>
        );
    });


    function goBack() {
        navigate(-1);
    }

    console.log(shoppingListItems);
    return (
        <div>
            <Button className={`${s.button} ${s.goBackButton}`} handlerClick={goBack}>Go back</Button>
            {Object.keys(shoppingListItems).length > 0 ? (
                <div>
                    <h2>Mark the ingredients that you have already purchased or simply delete from the list.</h2>
                    <ul style={{ textAlign: 'justify' }}>
                        {listItems}
                    </ul>
                    <Button handlerClick={handleClick}>Delete the list</Button>
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