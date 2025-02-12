import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    recipes: [],
    mealPlan: [],
    shoppingListState: [],
    ingredientsState: {},
    buttonState: {},
    modalListState: [],
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
        setIngredientsState: (state, action) => {
            state.ingredientsState = { ...state.ingredientsState, [action.payload.dishName]: action.payload.checkedObj };
        },
        setShoppingListState(state, action) {
            state.shoppingListState = action.payload;
        },
        updateButtonState: (state, action) => {
            state.buttonState = { ...state.buttonState, [action.payload]: !state.buttonState[action.payload] }
        },
        setModalListState(state, action) {
            state.modalListState = action.payload;
        },
    }
});

export const { setRecipes, addRecipeToPlan, removeRecipeFromPlan, setIngredientsState, setShoppingListState, updateButtonState, setModalListState } = recipeSlice.actions;
export default recipeSlice.reducer;