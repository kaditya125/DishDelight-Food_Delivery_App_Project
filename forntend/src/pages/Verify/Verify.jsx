import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios'; // Import axios
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { toast } from 'react-toastify';
import { set } from 'firebase/database';

const Verify = () => {
    const [searchParams] = useSearchParams();
    const [data,setData] = useState({});
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const serializedData = searchParams.get("data");
    const { url ,food_list} = useContext(StoreContext);
    const navigate = useNavigate();
    console.log("dummy"+data);


    const verifyPayment = async () => {
        try {
            const response = await axios.post(`${url}/api/order/verify`, { success, orderId });
            if (response.data.success) {
                navigate("/myorders");
                toast.success("Order Placed Successfully! ");
                console.log(data.email);
                try {
                    // Send confirmation email after placing the order
                    await sendConfirmationEmail(data.email, getTotalCartAmount());
                    toast.success("Confirmation email sent successfully");
                  } catch (error) {
                    console.error("Error sending confirmation email:", error);
                    toast.error("Error sending confirmation email"); // Use alert instead of toast for debugging
                  }

            } else {
                navigate("/");
            }
        } catch (error) {
            console.error('Error verifying payment:', error);
            navigate("/"); // Navigate to home page in case of error
        }
    }

    const sendConfirmationEmail = async (email, totalAmount) => {
        try {
          let orderItemsHtml = '';
          food_list.forEach((item) => {
            if (cartItems[item._id] > 0) {
              orderItemsHtml += `<p>${item.name} - Quantity: ${cartItems[item._id]} - Price: &#x20B9;${item.price * cartItems[item._id]}</p>`;
            }
          });
          console.log(orderItemsHtml);
      
          await axios.post('http://localhost:4000/api/mail/email', {
            to: email,
            subject: 'Order Confirmation',
            html: `<p>Dear ${data.firstName} ${data.lastName}</p>
                   <p>Congratulations! Your order has been successfully placed. Thank you for shopping with us!</p>
                   <p><b>Order Details:</b></p>
                   ${orderItemsHtml}
                   <p><b>Total Amount: &#x20B9;${totalAmount}</b></p>` // Email body with cart details
          });
        } catch (error) {
          console.error("Error sending confirmation email:", error);
          toast.error("Error sending confirmation email");
        }
      }

    useEffect(() => {
        verifyPayment();
        if (serializedData) {
            const data = JSON.parse(decodeURIComponent(serializedData));
            setData(data);
            console.log(data);
        }
    }, []); // Empty dependency array to run effect only once

    console.log(success, orderId);

    return (
        <>
        <div className='verify'>
            <div className='spinner'>
            </div>
        </div>
        <div className="verify-container">
        <h1>Verification Result</h1>
        <p>Success: {success}</p>
        <p>Order ID: {orderId}</p>
        </div>
    </>
    );
}

export default Verify;
