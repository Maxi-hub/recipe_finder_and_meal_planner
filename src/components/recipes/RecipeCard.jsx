export const RecipeCard = ({ item }) => {

    return (
        <>
            <h2>{item.strMeal}</h2>
            <img className="recipeImg" src={item.strMealThumb} alt={item.strMeal} />
        </>
    )
}
