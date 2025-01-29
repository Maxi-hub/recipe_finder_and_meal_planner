import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../button/Button";
import { RecipesList } from "../recipes/RecipesList";
import { setRecipes } from "../../reducers/recipeSlice";
import PropTypes from "prop-types";

export const Form = () => {
    const [inputDish, setInputDish] = useState('');
    const [dishes, setDishes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFetched, setIsFetched] = useState(false);
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const recipes = useSelector(state => state.recipe.recipes); 

    useEffect(() => {
        if (recipes && recipes.length > 0) {
            setDishes(recipes);
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

    const handleGetDish = async () => {
        const arrayDishes = await fetchRecipes(inputDish);
        setDishes(arrayDishes);
        setIsFetched(true);
        setInputDish('');
        dispatch(setRecipes(arrayDishes));
    };

    useEffect(() => {
        if (isFetched && dishes.length === 0) {
            setMessage('The dish was not found for the specified query! Try another option.');
        } else {
            setMessage('');
        }
        setIsLoading(false);
    }, [dishes, isFetched]);

    if (isLoading) {
        return (
            <p>Loadind ...</p>
        )
    }

    const handlerSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <form onSubmit={handlerSubmit}>
            <input className="" type="text" value={inputDish} onChange={(e) => setInputDish(e.target.value)} placeholder="Salad" />
            <Button handlerClick={handleGetDish}>search</Button>
            <div>
                <RecipesList recipes={dishes} message={message} />
            </div>
        </form>
    )
};

Form.propTypes = {
    recipies: PropTypes.array,
}
