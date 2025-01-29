import { useDispatch, useSelector } from 'react-redux';

export const MealPlanner = () => {
    const dishes = useSelector(state => state.recipe.mealPlan);
    const dispatch = useDispatch();




  return (
    <div>
        <h1>weekly meal plan</h1>
        <p>Here you can plan your weekly meal schedule. Here you can plan your weekly meal schedule. You need to go to the day of the week and meal field and select the appropriate dish.</p>
    </div>
  )
}
