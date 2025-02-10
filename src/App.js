import { BrowserRouter, Route, Routes } from 'react-router-dom';
import s from './App.module.css';
import { RecipeDetail } from './components/recipes/RecipeDetail';
import { HomePage } from './components/homePage/HomePage';
import { MealPlanner } from './components/mealPlanner/MealPlanner';
import { ShoppingList } from './components/shoppingList/ShoppingList';
import Modal from 'react-modal';

Modal.setAppElement('#root'); 

function App() {

  return (
      <BrowserRouter>
        <div className={s.App}>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/:dishName' element={<RecipeDetail />} />
            <Route path='/shoppinglist' element={<ShoppingList />} />
            <Route path='/mealplanner' element={<MealPlanner />} />
            <Route path='/*' element={<h1>Page not found!</h1>} />
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
