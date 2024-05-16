import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext);
    const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleFoodItemClick = (item) => {
        // Redirect to Product-details route with state containing the item data
        navigate('/product-details');
    };

    return (
        <div className='food-display card' id='food-display'>
            <h2>Top dishes near you</h2>
            <div className="food-display-list">
                {food_list.map((item, index) => {
                    if (category === "All" || category === item.category) {
                        return (
                            <FoodItem
                                key={index}
                                id={item._id}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                image={item.image}
                                 // Pass onClick handler
                            />
                        );
                    }
                })}
            </div>
            <hr />
        </div>
    );
};

export default FoodDisplay;
