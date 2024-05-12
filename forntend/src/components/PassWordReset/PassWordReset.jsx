import React, { useState,useContext } from 'react';
import './PassWordReset.css'; // Define your CSS styles for the ResetPassword component
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';


const PassWordReset = ({ setShowResetPassword }) => {
    const { url, token } = useContext(StoreContext);
  
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage]  = useState("")

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${url}/api/reset-password`, { email }, { headers: { token } });

      const data = await response.json();

      if(data.status==201)
        {
           setEmail("");
           setMessage(true);
           toast.success("Password reset link sent to your email.");
        }
      
      setShowResetPassword(false); // Close the ResetPassword component
    //   redirectToLoginPage(); // Redirect to login page
    } catch (error) {
      console.error("Error sending reset password link:", error);
      toast.error("An error occurred while sending reset password link.");
      setLoading(false);
    }
  };

  return (
    <div className='reset-password-popup'>
      <form onSubmit={handleSubmit} className="reset-password-popup-container">
        <div className="reset-password-popup-title">
          <h2>Reset Password</h2>
          <img onClick={() => { setShowResetPassword(false); }} src={assets.cross_icon} alt="Close" />
        </div>
        <div className="reset-password-popup-inputs">
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={handleChange}
            required
          />

          {message? <p>password reset link sent successfully</p>:""}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
};

export default PassWordReset;
