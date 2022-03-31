import React, { useState } from "react";
import { spicyFoods, getNewSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);
  const [filterBy, setFilterBy] = useState('All')

  const foodsToDisplay = foods.filter(food => {
    if (filterBy === 'All') {
      return true;
    } else {
      return food.cuisine === filterBy;
    }
  })

  const foodList = foodsToDisplay.map((food) => (
    <li key={food.id} onClick={() => handleLiClick(food.id)}>
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
    </li>
  ));

  // function handleLiClick(id) {
  //   const foodRemoved = foods.filter(food => food.id !== id)
  //   setFoods(foodRemoved)
  // }

  function handleLiClick(id) {
    const newHeat = foods.map(food => {
      if (food.id === id) {
        return { ...food, heatLevel: food.heatLevel + 1 }
      } else {
        return food;
      }
    })
    setFoods(newHeat)
  }

  function handleAddFood() {
    const newFood = getNewSpicyFood();
    const newSpicyFood = [...foods, newFood]
    setFoods(newSpicyFood);
  }

  function handleChange(e) {
    setFilterBy(e.target.value)
  }

  return (
    <div>
      <button onClick={handleAddFood}>Add New Food</button>
      <select onChange={handleChange} name="filter">
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>
      <ul>{foodList}</ul>
    </div>
  );
}

export default SpicyFoodList;
