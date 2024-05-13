// EmailVerification.js
import React, { useState, useRef, useEffect } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import './EmailVarification.css'; // Import CSS for the email verification component
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const EmailVarification = ({ email }) => {
    const { url, setToken } = useContext(StoreContext);
    const [otp, setOtp] = useState(["", "", "", ""]); // Array to store each digit of OTP
    const [otpError, setOtpError] = useState("");
    const inputRefs = useRef([]); // Ref to store references to input fields
    const history = useNavigate();

    useEffect(() => {
        // Focus on the previous input field when a digit is deleted
        inputRefs.current.forEach((inputRef, index) => {
            
            inputRefs.current.forEach((inputRef, index) => {
                if (otp[index].length === 1 && index < otp.length - 1) {
                    inputRefs.current[index + 1].focus();
                }
            });
        });
    }, [otp]);

    const onChangeHandler = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setOtpError("");
    };

    const onVerify = async (event) => {
        event.preventDefault();
        try {
            // Replace `${url}` with your backend API URL
            
            const response = await axios.post(`${url}/api/user/verify-email`, { email, otp: otp?.join('') });
            if (response.data.success) {
                toast.success("Email verification successful!");
                
                history('/');

            } else {
                setOtpError(response?.data?.message);
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            console.log(email);
            console.log(otp?.join(''));
            toast.error("An error occurred!");
        }
    };

    return (
        <div className="login-popup-container">
            <h2>Email Verification</h2>
            <div className="login-popup-inputs">
                <p>We have sent a code to your email {email}</p>
                <form onSubmit={onVerify}>
                    <div className="otp-input-container">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                className="otp-input"
                                type="text"
                                maxLength="1"
                                value={digit}
                                ref={(input) => (inputRefs.current[index] = input)} // Assign ref
                                onChange={(e) => onChangeHandler(index, e.target.value)}
                            />
                        ))}
                    </div>
                    {otpError && <span className="password-error">{otpError}</span>}
                    <button type="submit">Verify Account</button>
                </form>
            </div>
        </div>
    );
}

export default EmailVarification;
