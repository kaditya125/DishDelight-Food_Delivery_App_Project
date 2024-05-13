import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './OrderStatus.css'; // Import the CSS file
import { assets } from '../../assets/assets';

const OrderStatus = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [orderDetails, setOrderDetails] = useState({ orderId: '', status: '', expectedDeliveryTime: null });

    // Extract order details from query parameter
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const orderId = searchParams.get("orderId") || "";
        const status = searchParams.get("status") || "";

        // Calculate expected delivery time
        const currentTime = new Date();
        const expectedDeliveryTime = new Date(currentTime.getTime() + 30 * 60000); // Adding 30 minutes

        setOrderDetails({ orderId, status, expectedDeliveryTime });
    }, [location]);

    // Define steps of the order status
    const steps = [
        { name: "Ordered", icon: assets.ordered },
        { name: "Food Processing", icon: assets.cooking },
        { name: "Food Shipped", icon: assets.Shipped },
        { name: "Out for delivery", icon: assets.delivery },
        { name: "Delivered", icon: assets.delivered }
    ];

    // Calculate the index of the current status in the steps array
    const currentIndex = orderDetails.status ? steps.findIndex(step => step.name === orderDetails.status) : -1;

    // Calculate the expected time for each step
    const stepTimes = steps.map((step, index) => {
        const currentTime = orderDetails.expectedDeliveryTime ? new Date(orderDetails.expectedDeliveryTime) : new Date();
        const timeForStep = new Date(currentTime.getTime() + (index * 5 * 60000)); // Assuming 5 minutes interval for each step
        return timeForStep.toLocaleTimeString();
    });

    const handleTrackDelivery = () => {
        navigate('/map-container'); // Navigate to the map container
    };

    return (
        <div className="order-status-container">
            <h2>Order Status</h2>
            <div className="order-details">
                <p>Order ID: {orderDetails.orderId}</p>
                <p>Expected Delivery Time: {orderDetails.expectedDeliveryTime ? orderDetails.expectedDeliveryTime.toLocaleTimeString() : ""}</p>
            </div>
            <div className="order-status-timeline">
                
                <div className="order-steps">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.name}
                            initial={{ opacity: 0, y: -50 }}
                            animate={{
                                opacity: currentIndex >= index ? 1 : 0,
                                y: currentIndex >= index ? 0 : -50
                            }}
                            transition={{ duration: 0.5 }}
                            className={`order-status-step ${currentIndex === index ? 'active' : ''}`}
                        >
                            <div className="status">
                                <img src={step.icon} alt={step.name} />
                                <h3>{step.name}</h3>
                                <p className="step-time">{stepTimes[index]}</p>
                            </div>
                           {/* Display expected time for each step */}
                        </motion.div>
             
                    ))}
                    <div className="map-button">
                    <button onClick={handleTrackDelivery}>Track Delivery on Map</button>
                    </div>
                  
                </div>
                   
            </div>
        </div>
    );
};

export default OrderStatus;
