import React, { useState, useContext } from 'react';
import './PassWordReset.css'; // Define your CSS styles for the ResetPassword component
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const PassWordReset = ({ setShowResetPassword }) => {
    const { url, token } = useContext(StoreContext);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useNavigate();

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${url}/api/mail/forgetpass`, { email }, { headers: { token } });
            if (response.status === 200) {
                setEmail("");
                toast.success("Password reset link sent to your email.");
                history('/');
                setShowResetPassword(false);
            } else {
                toast.error("Failed to send reset password link. Please try again.");
            }
        } catch (error) {
            console.error("Error sending reset password link:", error);
            toast.error("An error occurred while sending reset password link.");
        }
        setLoading(false);
    };

    const handleClose = () => {
        // Redirect to home page
        history('/');
    };

    return (
        <div className='reset-password-popup'>
            <form onSubmit={handleSubmit} className="reset-password-popup-container">
                <div className="reset-password-popup-title">
                    <h2>Reset Password</h2>
                    <img onClick={handleClose} src={assets.cross_icon} alt="Close" />
                </div>
                <div className="reset-password-popup-inputs">
                    <input
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Sending..." : "Send Reset Link"}
                </button>
            </form>
        </div>
    );
};

export default PassWordReset;
