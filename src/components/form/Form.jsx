import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../button/Button";
import { RecipesList } from "../recipes/RecipesList";
import { setAllFoundRecipes, setRecipes } from "../../reducers/recipeSlice";
import s from '../../App.module.css';

export const Form = () => {
    const [inputDish, setInputDish] = useState('');
    const [dishes, setDishes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetched, setIsFetched] = useState(false);
    const [message, setMessage] = useState('');
    const recipes = useSelector(state => state.recipe.recipes);
    const allFoundRecipes = useSelector(state => state.recipe.allFoundRecipes);
    const dispatch = useDispatch();

    useEffect(() => {
        if (recipes && recipes.length > 0) {
            setDishes(recipes);
        } else {
            setDishes([]);
        }
    }, [recipes]);

    const fetchRecipes = async (inputDish) => {
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputDish}`);
            const data = await response.json();
            const result = data.meals;
            return result || [];
        } catch (error) {
            console.error('Ошибка получения данных', error);
        }
    };

    const handlerGetDish = async () => {
        setIsLoading(true);
        setIsFetched(true);

        const arrayDishes = await fetchRecipes(inputDish);
        console.log(arrayDishes);

        if (arrayDishes.length > 0) {
            setDishes(arrayDishes);
            dispatch(setRecipes(arrayDishes));

            const newArr = [...allFoundRecipes, ...arrayDishes];
            const uniqValue = Array.from(new Map(newArr.map(dish => [dish.idMeal, dish])).values());
            dispatch(setAllFoundRecipes(uniqValue));
        } else {
            dispatch(setRecipes([]));
        }


        setIsLoading(false);
    };

    useEffect(() => {
        if (isLoading) {
            setMessage('Loading...');
        }
        else if (isFetched && dishes.length === 0) {
            setMessage('The dish was not found for the specified query! Try another option.');
        } else {
            setMessage('');
        }
    }, [dishes, isLoading, isFetched]);

    const handlerSubmit = (e) => {
        e.preventDefault();
        if (!isLoading) {
            handlerGetDish();
        }
        setInputDish('');
    }

    return (
        <form onSubmit={handlerSubmit}>
            <input className={s.inputField} type="text" value={inputDish} onChange={(e) => setInputDish(e.target.value)} placeholder="Salad" />
            <Button className={s.button} handlerClick={handlerGetDish}>search</Button>
            <div>
                <RecipesList recipes={dishes} message={message} />
            </div>
        </form>
    )
};