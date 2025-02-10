import s from '../../App.module.css';

export const RecipeCard = ({ item }) => {

    return (
        <>
            <h2 className={s.recipeTitle}>{item.strMeal}</h2>
            <img className={s.recipeImg} src={item.strMealThumb} alt={item.strMeal} />
        </>
    )
}
