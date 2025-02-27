import React, { useState } from 'react'
import { Button } from './Button'
import s from './HelpButton.module.css'

export const HelpButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    function toggleIsOpen() {
        setIsOpen(!isOpen);
    }


    return (
        <>
            <Button className={s.helpButton} handlerClick={toggleIsOpen}>?</Button>
            {isOpen && (
                <div className={s.helpWindow}>
                    <div className={s.helpContent}>
                        <Button className={s.closeButton} handlerClick={toggleIsOpen}>Close</Button>
                        <h2> How to use site?</h2>
                        <p>Our site offers a seamless way to discover new recipes, plan your meals, and organize your shopping list. Let’s explore its key features:</p>
                        <p>📚 Pages Overview</p>
                        <ul>
                            <li><strong>Main Page</strong> - search for your favorite dishes by name, ingredient, or category.</li>
                            <li><strong>Meal Planner</strong> - organize your weekly meal plan by assigning dishes to each day and mealtime (breakfast, lunch, and dinner).</li>
                            <li><strong>Shopping List</strong> - keep track of the ingredients you need for your planned meals.</li>
                        </ul>

                        <p>🔎 Finding a Dish</p>
                        <p> Use the search bar on the <strong>Main Page</strong> to enter the name of a dish, an ingredient, or a category (for example: <i>sushi</i>, <i>avocado</i>, or <i>salad</i>). If your search returns no results, try refining your query.</p>
                        <p> Click on a dish to view its full recipe, including a list of ingredients and cooking instructions. If you find a recipe you like, you can add it to your <strong>Meal Planner</strong> directly from the main page or the recipe page by clicking the <strong>"Add to your plan"</strong> button.</p>

                        <p>📅 Planning Your Meals</p>
                        <p>In the <strong>Meal Planner</strong>, you can map out your meals for the week. Select a day and mealtime, then choose a dish from your saved recipes. To view a recipe again, simply click on the dish name. Want to switch things up? Just click an empty cell to add a new dish or replace an existing one.</p>

                        <p>🛒 Managing Your Shopping List</p>
                        <p>The <strong>Shopping List</strong> automatically compiles all the missing ingredients for your planned meals. As you shop, mark off the items you've purchased by checking the box next to each ingredient. Once you have everything you need, clear the list with a single click.</p>

                        <p>🍽️ Your Personal Cooking Assistant</p>
                        <p>This app is designed to introduce you to exciting new dishes, simplify meal planning, and streamline your grocery shopping.</p>

                        <h3>Bon Appétit!</h3>
                    </div>
                </div>
            )}
        </>

    )
}
