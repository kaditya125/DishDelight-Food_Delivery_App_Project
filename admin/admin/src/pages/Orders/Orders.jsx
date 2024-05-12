import React, { useState, useEffect } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Error fetching orders");
    }
  };

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value
    })
    if (response.data.success) {
      await fetchAllOrders();
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [url]);

  // Function to return appropriate icon based on order status
  const getStatusIcon = (status) => {
    switch (status) {
      case "Food Processing":
        return <img src={assets.cooking} alt="Food Processing Icon" />;
      case "Food Shipped":
        return <img src={assets.Shipped} alt="Food Shipped Icon" />;  
      case "Out for delivery":
        return <img src={assets.delivery} alt="Out for Delivery Icon" />;
      case "Delivered":
        return <img src={assets.delivered} alt="Delivered Icon" />;
      default:
        return null;
    }
  }

  return (
    <div className='order add'>
      {/* Display orders here */}
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            {/* Display status icon */}
            {getStatusIcon(order.status)}
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " X " + item.quantity
                  } else {
                    return item.name + " X " + item.quantity + " , "
                  }
                })}
              </p>
              <p className="order-item-name">{order.address.firstName + " " + order.address.lastName}</p>
              <div className="order-item-address">
                <p>{order.address.street + " ,"}</p>
                <p>{order.address.city + " , " + order.address.state + ", " + order.address.country + ", " + order.address.pincode}</p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>

            <p>Items: {order.items.length}</p>
            <p>&#x20b9; {order.amount}</p>

            <select onChange={(event) => statusHandler(event, order._id)} value={order.status} name="" id="">
              <option value="Food Processing">Food Processing</option>
              <option value="Food Shipped">Food Shipped</option>
              <option value="Out for delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
