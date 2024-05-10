import React, { useContext, useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, discount, token, food_list, cartItems, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    date:"",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  }

  useEffect(() => {
    if (!token) {
      navigate('/cart');
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token, getTotalCartAmount, navigate]);

  const placeholder = async (event) => {
    event.preventDefault();
    const stripe = await loadStripe("pk_test_51PDmbnSB7MirE2jofzlSfIcu3P3bxnGAtAWYdEORGw8QZLRA5MevURolX4QaQVR2A77kO2DZ7rmnVJ94QVtQR1xn00hlSfVqQK");
   
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
  
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 60),
    };

    try {
      const response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token }  
      });
      
      const session = response.data;
      const result = await stripe.redirectToCheckout({
        sessionId: session.id
      });

      if (result.error) {
  console.error("Error redirecting to checkout:", result.error);
  alert("Error redirecting to checkout"); // Use alert instead of toast for debugging
} else {
  const serializedData = encodeURIComponent(JSON.stringify(data));
  navigate(`/verify?data=${serializedData}`);
}

    } catch (error) {
      console.error("Error placing order from frontend:", error);
      toast.error("Error placing order");
    }
  }

  
  

  return (
    <form onSubmit={placeholder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First Name" />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last Name" />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder="Email Address" />
        <input required name="street" onChange={onChangeHandler} value={data.street} type='text' placeholder="Street" />
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder="City" />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input required name='pincode' onChange={onChangeHandler} value={data.pincode} type="text" placeholder="Pin Code" />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder="Country" />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder="Phone" />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>&#x20B9; {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Discount</p>
              <p> - &#x20B9; {discount}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>+ &#x20B9; {getTotalCartAmount() === 0 ? 0 : 60}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b> &#x20B9; {getTotalCartAmount() === 0 ? getTotalCartAmount() + 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
