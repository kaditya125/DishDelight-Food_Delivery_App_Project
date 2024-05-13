import React, { useState, useContext, useEffect } from 'react';
import './ForgotPass.css'; // Import your CSS styles
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';

const ForgotPass = () => {
    const { url } = useContext(StoreContext);
    const { id, token } = useParams();
    const history = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const userValid = async () => {
        try {
            const res = await fetch(`${url}/api/user/forgotpassword/${id}/${token}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            });
            
            const data = await res.json();
            if (data.status === 201) {
                toast.success("User validated successfully");
            } else {
                toast.error("User validation failed");
                throw new Error("User validation failed");
            }
        } catch (error) {
            console.error("Error validating user:", error);
            history("/"); // Redirect the user to the login page
        }
    }

    useEffect(() => {
        userValid();
    }, []);

    const handleChangeNewPassword = (e) => {
        setNewPassword(e.target.value);
    };

    const handleChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (newPassword !== confirmPassword) {
                toast.error("Passwords do not match.");
                return;
            }
            const response = await axios.post(`${url}/api/reset-password/${id}/${token}`,{ newPassword, confirmPassword });
            if (response.status === 201) {
                toast.success("Password reset successful.");
                history('/'); // Redirect to home page
            } else {
                toast.error("Failed to reset password. Please try again.");
            }
        } catch (error) {
            console.error("Error resetting password:", error);
            toast.error("An error occurred while resetting password.");
        }
        setLoading(false);
    };

    const handleClose = () => {
        history('/');
    };

    return (
        <div className='reset-password-form'>
            <form onSubmit={handleSubmit} className="reset-password-form-container">
                <div className="reset-password-form-title">
                    <h2>Reset Password</h2>
                    <img onClick={handleClose} src={assets.cross_icon} alt="Close" />
                </div>
                <div className="reset-password-form-inputs">
                    <input
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={handleChangeNewPassword}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={handleChangeConfirmPassword}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Resetting..." : "Reset Password"}
                </button>
            </form>
        </div>
    );
};

export default ForgotPass;
