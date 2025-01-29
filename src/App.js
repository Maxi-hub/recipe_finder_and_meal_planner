import { BrowserRouter, Navigate, NavLink, Route, Routes } from 'react-router-dom';
import s from './App.module.css';
import { RecipeDetail } from './components/recipes/RecipeDetail';
import { HomePage } from './components/homePage/HomePage';
import { Provider } from 'react-redux';
import store from './store/store';
import { MealPlanner } from './components/mealPlanner/MealPlanner';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className={s.App}>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/:dishName' element={<RecipeDetail />} />
            <Route path='/mealplanner' element={<MealPlanner />} />
            <Route path='/*' element={<h1>Page not found!</h1>} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
