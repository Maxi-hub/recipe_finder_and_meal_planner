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
        addIngredientsToList: (state, action) => {
            state.shoppingList.push(action.payload);
        },
    }
});

export const { setRecipes, addRecipeToPlan, addIngredientsToList } = recipeSlice.actions;
export default recipeSlice.reducer;