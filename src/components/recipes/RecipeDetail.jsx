import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button } from '../button/Button';
import s from '../../App.module.css';
import { setIngredientsState } from '../../reducers/recipeSlice';

export const RecipeDetail = () => {
    let listOfIngredients = [];
    const { dishName } = useParams();
    const { recipes } = useSelector(state => state.recipe);
    const { ingredientsState } = useSelector(state => state.recipe);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const chechedElements = Object.values(ingredientsState).map(el => {
        return el.filter(obj => {
            const values = Object.values(obj)[0];
            return values[1] === true;
        });
    });

    const dish = recipes.find(item => item.strMeal === dishName);
    for (let i = 1; i <= 20; i++) { //20 - max quantity of ingredients in API
        const ingredient = dish[`strIngredient${i}`];
        const quantityOfIngredient = dish[`strMeasure${i}`];
        const obj = {};
        if (ingredient !== '' && ingredient !== null) {
            obj[ingredient] = quantityOfIngredient;
            listOfIngredients.push(obj);
        }
    }

    function changeValues() {
        const checkboxes = [...document.querySelectorAll('input[type="checkbox"]')];
        const checkedObj = checkboxes.map(checkbox => ({
            [checkbox.id]: [checkbox.value, checkbox.checked],
        }));
        let mealName = dish['strMeal'];
        dispatch(setIngredientsState({ mealName, checkedObj }));
    }

    const listItems = listOfIngredients.map((element, index) => {
        const key = Object.keys(element)[0];
        const value = element[key];

        const isChecked = chechedElements.some(arr => {
            return arr.some(obj => {
                const values = Object.values(obj);
                return Object.keys(obj)[0] === key && values[0][1] === true;
            });
        });

        return <li key={`${key}-${index}`}>
            <input type="checkbox" value={value} id={key} onChange={changeValues} checked={isChecked} />
            <label htmlFor={value}> {key} - {value}</label>
        </li>
    });

    function goBack() {
        navigate(-1);
    }

    return (
        <div className={s.recipeDetailBox}>
            <Button className={`${s.button} ${s.goBackButton}`} handlerClick={goBack}>Go back</Button>
            {
                <div className={s.recipeBox}>
                    <h2>{dish.strMeal}</h2>
                    <img className={`${s.recipeImg} ${s.recipeImgDetail}`} src={dish.strMealThumb} alt="" />
                    <p>Category: {dish.strCategory}</p>
                    <p><b>Recipe:</b> {dish.strInstructions}</p>
                    <div className={s.ingredientsBox}>
                        <h3>Ingredients:</h3>
                        <p>Mark the missing ingredients to add them to your <Link to={'/shoppinglist'} style={{ color: 'teal' }}>Shopping list</Link>.</p>
                        <ul className={s.ingredientsList}>
                            {listItems}
                        </ul>
                    </div>
                </div>
            }
        </div>
    )
}
