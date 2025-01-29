import { useDispatch, useSelector } from 'react-redux';
import s from '../../App.module.css';
import { Button } from '../button/Button';
import { useNavigate } from 'react-router-dom';

export const MealPlanner = () => {
  const dishes = useSelector(state => state.recipe.mealPlan);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function goBack() {
    navigate('/');
  }

  return (
    <div>
      <Button className={`${s.button} ${s.goBackButton}`} handlerClick={goBack}>Go back</Button>
      <h1>Weekly Meal Plan</h1>
      <p>Here you can plan your weekly meal schedule. Here you can plan your weekly meal schedule. You need to go to the day of the week and meal field and select the appropriate dish.</p>
      <div>
        <div className={s.mealPlan}>
          <div className={`${s.cell} ${s.headerCell}`}></div>
          <div className={`${s.cell} ${s.headerCell}`}>Breakfast</div>
          <div className={`${s.cell} ${s.headerCell}`}>Lunch</div>
          <div className={`${s.cell} ${s.headerCell}`}>Dinner</div>

          {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
            <>
              <div className={`${s.cell} ${s.day}`}>{day}</div>
              <div className={`${s.cell} ${s.meal}`}
              // onClick={() => openMealSelector(day, "breakfast")}
              >+</div>
              <div className={`${s.cell} ${s.meal}`}
              // onClick={() => openMealSelector(day, "lunch")}
              >+</div>
              <div className={`${s.cell} ${s.meal}`}
              // onClick={() => openMealSelector(day, "dinner")}
              >+</div>
            </>
          ))}
        </div>

      </div>
    </div>
  )
}
