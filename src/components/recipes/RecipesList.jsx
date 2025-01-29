import { Link } from "react-router-dom";
import { RecipeCard } from "./RecipeCard";
import { Button } from "../button/Button";
import { useDispatch, useSelector } from "react-redux";
import { addRecipeToPlan } from "../../reducers/recipeSlice";


export const RecipesList = ({ recipes, message }) => {
    const dishes = useSelector(state => state.recipe.mealPlan);
    const dispatch = useDispatch();

    const addToPlan = (event, dish) => {
        const pointedDish = dishes.find(item => item.strMeal === dish.strMeal);
        if(!pointedDish){
            dispatch(addRecipeToPlan(dish));
        }
        event.target.textContent = 'Added to your plan';
    };

    return (
        <ul className="recipeList">
            {recipes.length > 0 ?
                (recipes.map(item =>
                    <div className="recipeBlock" key={item.idMeal}>
                        <li>
                            <Link to={`/${item.strMeal}`}>
                                <RecipeCard item={item} />
                            </Link>
                        </li>
                        <Button handlerClick={(e) => addToPlan(e, item)}>Add to meal plan</Button>
                    </div>
                ))
                : (<p>{message}</p>)
            }
        </ul>
    )
}
