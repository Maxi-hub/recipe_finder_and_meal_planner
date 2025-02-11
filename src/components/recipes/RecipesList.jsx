import { Link } from "react-router-dom";
import { RecipeCard } from "./RecipeCard";
import { Button } from "../button/Button";
import { useDispatch, useSelector } from "react-redux";
import { addRecipeToPlan, removeRecipeFromPlan, updateButtonState } from "../../reducers/recipeSlice";
import s from '../../App.module.css';

export const RecipesList = ({ recipes, message }) => {
    const dishes = useSelector(state => state.recipe.mealPlan);
    const buttonState = useSelector(state => state.recipe.buttonState);
    const dispatch = useDispatch();

    const addToPlan = (dish) => {
        const pointedDish = dishes.find(item => item.idMeal === dish.idMeal);
        if (!pointedDish) {
            dispatch(addRecipeToPlan(dish));
        } else {
            dispatch(removeRecipeFromPlan(dish.idMeal));
        }

        dispatch(updateButtonState(dish.strMeal));
    }

    return (
        <ul className={s.recipeList}>
            {recipes.length > 0 ?
                (recipes.map(item =>
                    <div className={s.recipeBlock} key={item.idMeal}>
                        <li>
                            <Link to={`/${item.strMeal}`} style={{ color: '#535353' }}>
                                <RecipeCard item={item} />
                            </Link>
                        </li>
                        <Button
                            className={`${s.button} ${s.dishButton}`}
                            style={{ backgroundColor: buttonState[item.strMeal] ? "#ffcd39" : "white" }}
                            handlerClick={() => addToPlan(item)}>
                            {buttonState[item.strMeal] ? "Added to your plan" : "Add to your plan"}
                        </Button>
                    </div>
                ))
                : (<p>{message}</p>)
            }
        </ul>
    )
}
