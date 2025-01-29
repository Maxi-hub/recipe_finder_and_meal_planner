import { Link } from "react-router-dom";
import { RecipeCard } from "./RecipeCard";
import { Button } from "../button/Button";
import { useDispatch, useSelector } from "react-redux";
import { addRecipeToPlan, removeRecipeFromPlan } from "../../reducers/recipeSlice";
import s from '../../App.module.css';


export const RecipesList = ({ recipes, message }) => {
    const dishes = useSelector(state => state.recipe.mealPlan);
    const dispatch = useDispatch();

    const addToPlan = (event, dish) => {
        const pointedDish = dishes.find(item => item.strMeal === dish.strMeal);
        if (!pointedDish) {
            dispatch(addRecipeToPlan(dish));
        } else {
            dispatch(removeRecipeFromPlan(dish.strMeal));
        }
        
        event.target.textContent = event.target.textContent === 'Add to your plan'
            ? 'Added to your plan'
            : 'Add to your plan';
    }

    return (
        <ul className={s.recipeList}>
            {recipes.length > 0 ?
                (recipes.map(item =>
                    <div className={s.recipeBlock} key={item.idMeal}>
                        <li>
                            <Link to={`/${item.strMeal}`}>
                                <RecipeCard item={item} />
                            </Link>
                        </li>
                        <Button disabled className={`${s.button} ${s.dishButton}`} handlerClick={(e) => addToPlan(e, item)}>Add to your plan</Button>
                    </div>
                ))
                : (<p>{message}</p>)
            }
        </ul>
    )
}
