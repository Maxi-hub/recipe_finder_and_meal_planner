import React from 'react'
import { Form } from '../form/Form'
import { NavLink } from 'react-router-dom'

export const HomePage = () => {
  return (
    <div>
      <nav>
        <NavLink to='/mealplanner'>Meal Planner</NavLink>
        <NavLink to='/shoppingList'>Shopping List</NavLink>
      </nav>
      <h1>Recipes</h1>
      <p>Here you can find many recipes for various dishes.</p>
      <p>In the search bar, you can specify the name of the dish, the ingredient, or the category of the dish (for example, a cake).</p>
      {<Form />}
    </div>
  )
}
