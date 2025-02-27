import React from 'react'
import { Form } from '../form/Form'
import { NavLink } from 'react-router-dom'
import s from '../../App.module.css';
import { Button } from '../button/Button';
import { HelpButton } from '../button/HelpButton';

export const HomePage = () => {
  return (
    <div className={s.wrapper}>
      <nav className={s.navigation}>
        <NavLink to='/mealplanner' style={{ marginRight: '20px', color: 'teal' }}>Meal Planner</NavLink>
        <NavLink to='/shoppinglist' style={{ color: 'teal' }}>Shopping List</NavLink>
      </nav>
      <HelpButton />
      <h1>Recipes</h1>
      <p className={s.indentation}> Here you can find many recipes for various dishes.</p>
      <p className={`${s.indentation} ${s.textExp}`}>In the search bar, specify the name of the dish, the ingredient, or the category of the dish (for example, a cake).</p>
      {<Form />}
    </div>
  )
}
