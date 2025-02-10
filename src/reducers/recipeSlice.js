import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    recipes: [],
    mealPlan: [],
    shoppingList: [],
    ingredientsState: {},
    buttonState: {},
};

const recipeSlice = createSlice({
    name: 'recipe', 
    initialState,
    reducers: {
        setRecipes(state, action) {
            state.recipes = action.payload;
        },
        addRecipeToPlan: (state, action) => {
            state.mealPlan.push(action.payload);
        },
        removeRecipeFromPlan: (state, action) => {
            state.mealPlan = state.mealPlan.filter(item => item.idMeal !== action.payload);
        },
        addIngredientsToList: (state, action) => {
            state.shoppingList = [...state.shoppingList, action.payload]; // добавляет ингредиенты только по текущему блюду
        },
        setIngredientsState: (state, action) => {
            state.ingredientsState = { ...state.ingredientsState, [action.payload.dishName]: action.payload.checkedObj };
        },
        updateButtonState: (state, action) => {
            state.buttonState = { ...state.buttonState, [action.payload]: !state.buttonState[action.payload] }
        },
    }
});

export const { setRecipes, addRecipeToPlan, addIngredientsToList, removeRecipeFromPlan, setIngredientsState, updateButtonState } = recipeSlice.actions;
export default recipeSlice.reducer;