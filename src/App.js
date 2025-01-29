import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { RecipeDetail } from './components/recipes/RecipeDetail';
import { HomePage } from './components/homePage/HomePage';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/:dishName' element={<RecipeDetail />} />
            <Route path='/*' element={<h1>Page not found!</h1>} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
