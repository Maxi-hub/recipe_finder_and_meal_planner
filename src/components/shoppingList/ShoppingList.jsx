import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import s from '../../App.module.css';
import { Button } from '../button/Button';
import { resetIngredientsState, setIngredientsState, setShoppingListState } from '../../reducers/recipeSlice';
import { useEffect, useState } from 'react';

export const ShoppingList = () => {
    const productList = useSelector(state => state.recipe.ingredientsState);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { shoppingListState } = useSelector(state => state.recipe);
    const [shoppingListItems, setShoppingListItems] = useState({});

    function filteredObjs(dishesList) {
        const filteredObjs = Object.entries(dishesList).map(([nameOfDish, ingredients]) => {
            const filteredValues = ingredients.filter(ingredient => {
                return Object.values(ingredient)[0][1] === true
            });
            return (filteredValues.length > 0 ? { [nameOfDish]: filteredValues } : null);
        });
        return Object.assign({}, ...filteredObjs);
    }

    useEffect(() => {
        const dishesObject = filteredObjs(productList);
        dispatch(setShoppingListState(dishesObject));
        setShoppingListItems(dishesObject);
    }, []);

    useEffect(() => {
        if (Object.keys(shoppingListState).length > 0) {
            const dishesObject = filteredObjs(shoppingListState);
            setShoppingListItems(dishesObject);
        }
    }, [shoppingListState]);


    function handleChange(event) {
        const { id, checked, value } = event.target;
        const eventObj = JSON.parse(value);

        const updatedCheckedObj = Object.fromEntries(
            Object.entries(shoppingListItems).map(([dishName, ingredients]) => {
                if (shoppingListItems[id]) {
                    const updatedIngredients = ingredients.map(ingredient => {
                        const ingredientName = Object.keys(ingredient)[0];
                        const ingredientValue = Object.values(ingredient)[0][0];
                        const newIngredient = {
                            [ingredientName]: [...ingredient[ingredientName].slice(0, 2), checked]
                        };
                        return (dishName === id && ingredientName === Object.keys(eventObj)[0] && ingredientValue === Object.values(eventObj)[0][0]) ? newIngredient : ingredient;
                    });
                    return [dishName, updatedIngredients];
                }
                return [dishName, ingredients];
            })
        );

        setShoppingListItems(updatedCheckedObj);
        dispatch(setShoppingListState(updatedCheckedObj));

        const updatedProductList = Object.fromEntries(
            Object.entries(productList).map(([dishName, ingredients]) => {
                if (updatedCheckedObj[dishName]) {
                    const updatedIngredients = ingredients.map(ingredient => {
                        const ingredientName = Object.keys(ingredient)[0];
                        const ingredientValue = Object.values(ingredient)[0][0];
                        const foundIngredient = updatedCheckedObj[dishName].find(item => Object.keys(item)[0] === ingredientName && Object.values(item)[0][0] === ingredientValue);
                        if (foundIngredient) {
                            return foundIngredient;
                        }
                        return ingredient;
                    })
                    return [dishName, updatedIngredients];
                }
                return [dishName, ingredients];
            })
        );

        Object.entries(updatedProductList).forEach(([mealName, checkedObj]) => {
            dispatch(setIngredientsState({ mealName, checkedObj }));
        })
    }

    function handleClick() {
        if (window.confirm("Are you sure you want to delete the shopping list?")) {
            setShoppingListItems({});
            dispatch(setShoppingListState({}));
            dispatch(resetIngredientsState());
        }
    }

    const listItems = Object.entries(shoppingListItems).map(([dishName, ingredients]) => {
        return (
            <div>
                <Link to={`/${dishName}`}><h3 style={{ color: 'teal' }}>Ingredients for {dishName}</h3></Link>
                <ul className={s.shoppingList} >
                    {ingredients.map((ingredient, index) => {
                        const key = Object.keys(ingredient)[0];
                        const value = ingredient[key][0];
                        const checkedItems = Object.entries(shoppingListState).some(([dish, ingredients]) =>
                            ingredients.some(ingredient => {
                                const ingredientName = Object.keys(ingredient)[0];
                                const ingredientValue = Object.values(ingredient)[0][0];
                                return dishName === dish && ingredientName === key && ingredientValue === value && ingredient[ingredientName][2] === true;
                            })
                        );

                        return (
                            <li key={`${dishName}-${index}`}>
                                <input
                                    type="checkbox"
                                    value={JSON.stringify(ingredient)}
                                    id={dishName}
                                    onChange={handleChange}
                                    checked={checkedItems}
                                />
                                <label htmlFor={key}> {key} - {value}</label>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    });



    function goBack() {
        navigate(-1);
    }

    return (
        <div>
            <Button className={`${s.button} ${s.goBackButton}`} handlerClick={goBack}>Go back</Button>
            {Object.keys(shoppingListItems).length > 0 ? (
                <div>
                    <h2>Mark the ingredients that you have already purchased or simply delete from the list.</h2>
                    {listItems}
                    <Button className={s.shoppinglistButton} handlerClick={handleClick}>Delete all ingredients</Button>
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