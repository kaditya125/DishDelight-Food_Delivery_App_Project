import React from 'react'
import'./FoodItem.css'
const FoodItem = ({id, name,price,description,image}) => {
  return (
    <div className='food-item'>
        <div className="food-item-img-container">
            <img src="{image}" alt="" className="food-item-image" />
        </div>
    </div>
  )
}

export default FoodItem