// src/components/DeliveryInfo.jsx
import React from 'react';
import './Delivery.css';
import { FaTruck, FaClock, FaMoneyBillWave, FaUser } from 'react-icons/fa';

const Delivery = () => {
  return (
    <div className="delivery-container">
      <h1>Delivery Information</h1>
      <div className="section">
        <h2><FaTruck className="icon" /> Fast Delivery</h2>
        <p>
          We offer fast and reliable delivery services to ensure that your food reaches you on time.
        </p>
      </div>
      <div className="section">
        <h2><FaClock className="icon" /> 24/7 Service</h2>
        <p>
          Our delivery service operates 24 hours a day, 7 days a week, so you can order anytime you want.
        </p>
      </div>
      <div className="section">
        <h2><FaMoneyBillWave className="icon" /> Affordable Prices</h2>
        <p>
          We offer competitive prices without compromising on the quality of our service or food.
        </p>
      </div>
      <div className="section">
        <h2><FaUser className="icon" /> Friendly Staff</h2>
        <p>
          Our delivery staff is courteous and professional, ensuring a pleasant experience for our customers.
        </p>
      </div>
    </div>
  );
};

export default Delivery;
