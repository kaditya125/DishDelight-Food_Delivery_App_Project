import React, { useState, useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  // Get the quantity of this item in the cart
  const itemCount = cartItems[id] || 0;

  const handleAddToCart = () => {
    addToCart(id);
    toast.success(`${name} added to cart`); // Display success toast for adding item to cart
  };

  const handleRemoveFromCart = () => {
    removeFromCart(id);
    toast.info(`${name} removed from cart`); // Display info toast for removing item from cart
  };

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img src={`${url}/images/${image}`} alt="" className="food-item-image" />
        {
          !itemCount ?
            <img className='add' onClick={handleAddToCart} src={assets.add_icon_white} alt="" />
            :
            <div className='food-item-counter'>
              <img onClick={handleRemoveFromCart} src={assets.remove_icon_red} alt="" />
              <p>{itemCount}</p>
              <img onClick={handleAddToCart} src={assets.add_icon_green} alt="" />
            </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" /> {/* Corrected typo */}
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">&#x20B9; {price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
