import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    recipes: [],
    mealPlan: [],
    shoppingList: [],
};

const recipeSlice = createSlice({
    name: 'recipe', // имя редьюсера
    initialState,
    reducers: {
        setRecipes(state, action) {
            state.recipes = action.payload;
        },
        addRecipeToPlan: (state, action) => {
            state.mealPlan.push(action.payload);
        },
        removeRecipeFromPlan: (state, action) => {
            state.mealPlan = state.mealPlan.filter(item => item.strMeal !== action.payload);
        },
        addIngredientsToList: (state, action) => {
            state.shoppingList.push(action.payload);
        },
        removeIngredientsFromList: (state, action) => {
            state.shoppingList = state.shoppingList.filter(item => item.strMeal !== action.payload);
        },
    }
});

export const { setRecipes, addRecipeToPlan, addIngredientsToList, removeRecipeFromPlan, removeIngredientsFromList } = recipeSlice.actions;
export default recipeSlice.reducer;