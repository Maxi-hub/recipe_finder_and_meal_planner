import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../button/Button';

export const RecipeDetail = () => {
    const navigate = useNavigate();
    const { dishName } = useParams();
    const { recipes } = useSelector(state => state.recipe);

    const dish = recipes.find(item => item.strMeal === dishName);

    const num = 20; // Quantity of ingredients in API
    const listOfIngredients = [];

    for (let i = 1; i <= num; i++) {
        const ingredient = dish[`strIngredient${i}`];
        const quantityOfIngredient = dish[`strMeasure${i}`];
        const obj = {};
        if (ingredient !== '') {
            obj[ingredient] = quantityOfIngredient.trim();
            listOfIngredients.push(obj);
        }
    }

    function goBack() {
        navigate('/');
    }

    const listItems = listOfIngredients.map(element => {
        const key = Object.keys(element)[0];
        const value = element[key];
        return <li key={key}>{key} - {value}</li>
    })

    return (
        <div>
            <Button handlerClick={goBack}>Go back</Button>
            {
                <div>
                    <h2>{dish.strMeal}</h2>
                    <img className="recipeImg" src={dish.strMealThumb} alt="" />
                    <p>Category: {dish.strCategory}</p>
                    <p><b>Recipe:</b> {dish.strInstructions}</p>
                    <div>
                        <h3>Ingredients:</h3>
                        <ul>
                            {listItems}
                        </ul>
                    </div>
                </div>
            }
        </div>
    )
}
