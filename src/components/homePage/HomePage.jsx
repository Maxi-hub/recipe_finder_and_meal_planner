import React from 'react'
import { Form } from '../form/Form'

export const HomePage = () => {
  return (
    <div>
        <h1>Recipes</h1>
        <p>Here you can find many recipes for various dishes.</p>
        {<Form />}
    </div>
  )
}
