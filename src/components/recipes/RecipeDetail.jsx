import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button } from '../button/Button';
import s from '../../App.module.css';
import { addIngredientsToList, setIngredientsState } from '../../reducers/recipeSlice';

export const RecipeDetail = () => {
    let listOfIngredients = [];
    const { dishName } = useParams();
    const { recipes } = useSelector(state => state.recipe);
    const navigate = useNavigate();
    const dispatch = useDispatch();

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

    function goBack() {
        navigate('/');
    }

    function changeValues() {
        const checkboxes = [...document.querySelectorAll('input[type="checkbox"]')];
        const checkedObj = checkboxes.map(checkbox => ({ 
            [checkbox.id]: [checkbox.value, checkbox.checked], 
        }));
        console.log(checkedObj);
        dispatch(setIngredientsState({ dishName, checkedObj }));
        dispatch(addIngredientsToList(checkedObj)); // shoppingList
    };

    const listItems = listOfIngredients.map(element => {
        const key = Object.keys(element)[0];
        const value = element[key];
        return <li key={key}>
            <input type="checkbox" value={value} id={key} onChange={changeValues} />
            <label htmlFor={value}> {key} - {value}</label>
        </li>
    });

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
                        <p>Mark the missing ingredients to add them to your <Link to={'/shoppinglist'}>Shopping list</Link>.</p>
                        <ul className={s.ingredientsList}>
                            {listItems}
                        </ul>
                    </div>
                </div>
            }
        </div>
    )
}
