import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'; // Import the LoadingSpinner component

const FoodDisplay = ({ category }) => {
    const { food_list, fetchFoodList } = useContext(StoreContext); // Assuming fetchFoodList fetches food data
    const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
    const navigate = useNavigate(); // Initialize useNavigate
    const [loading, setLoading] = useState(true); // Initialize loading state

    useEffect(() => {
        // Fetch data when the component mounts
        const fetchData = async () => {
            setLoading(true); // Set loading to true before fetching data
            await fetchFoodList(); // Fetch food list from the context
            setLoading(false); // Set loading to false after data is fetched
        };

        fetchData();
    }, [fetchFoodList]); // Dependency array

    const handleFoodItemClick = (item) => {
        // Redirect to Product-details route with state containing the item data
        navigate('/product-details');
    };

    if (loading) {
        return <LoadingSpinner />; // Display loading spinner while data is being fetched
    }

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
                                onClick={() => handleFoodItemClick(item)} // Pass onClick handler
                            />
                        );
                    }
                    return null;
                })}
            </div>
            <hr />
        </div>
    );
};

export default FoodDisplay;
