// Verify.jsx
import React, { useContext, useEffect,useState } from 'react';
import axios from 'axios';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { toast } from 'react-toastify';


const Verify = () => {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState({});
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const order = searchParams.get('order');
  const { url, food_list, getTotalCartAmount, email, orderItems, orderData } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      const response = await axios.post(`${url}/api/order/verify`, { success, orderId });
      if (response.data.success) {
      await  sendConfirmationEmail(order.userEmail, order);
       navigate("/myorders");
        
        
        toast.success("Order Placed Successfully! ");
      } else {
        toast.error("Order can't be placed");
        navigate("/");
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);


  const sendConfirmationEmail = async (Email, order) => {
    try {
      let orderDetails = order.items.map(item => `<p>${item.name} - Quantity: ${item.quantity} - Price: ${item.price * item.quantity}</p>`).join('');

      const emailContent = `
        <p>Dear Customer,</p>
        <p>Your order has been successfully placed with the following details:</p>
        ${orderDetails}
        <p>Total Amount: ${order.amount}</p>
        <p>Thank you for shopping with us!</p>
      `;

      await axios.post(`http://localhost:4000/api/mail/email`, {
        email: email,
        subject: "Order Confirmation",
        html: emailContent
      });

      toast.success("Confirmation email sent successfully");
      navigate('/myorders');
    } catch (error) {
      console.error("Error sending confirmation email:", error);
      toast.error("Error sending confirmation email");
    }
  };

  return (
    <>
      <div className='verify'>
        <div className='spinner'></div>
      </div>
      <div className="verify-container">
        <h1>Verification Result</h1>
        <p>Success: {success}</p>
        <p>Order ID: {orderId}</p>
      </div>
    </>
  );
};

export default Verify;
