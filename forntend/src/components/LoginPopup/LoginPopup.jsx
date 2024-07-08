import React, { useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import axios from "axios";
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useNavigate } from 'react-router-dom'; // Import useNavigate and NavLink together

const LoginPopup = ({ setShowLogin, setLoggedInUserName,setEmail }) => {
    const { url, setToken } = useContext(StoreContext);
    const navigate = useNavigate();
    const [currState, setCurrState] = useState("Login");
    const [isChecked, setIsChecked] = useState(false);
    const [showTermsModal, setShowTermsModal] = useState(false);
    const [data, setData] = useState({
        name: "",
        mobile: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState(""); 
    const [signupError, setSignupError] = useState(""); // New state for signup error

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
        setPasswordError("");
        setSignupError("");
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${url}/api/user/login`, data);
            if (response.data.success) {
                const { token, name } = response.data;
                localStorage.setItem('token', token);
                setToken(token);
                setShowLogin(false);
                localStorage.setItem('Name', name);
                setLoggedInUserName(name);
                toast.success("Login successful!");
            } else {
                if (response.data.message === "Incorrect Password") {
                    setPasswordError("Incorrect Password!"); // Set password error message
                } else {
                    toast.error(response.data.message);
                }
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setPasswordError("Incorrect Password!");
                toast.error(error.response.data.message); 
            } else {
                setPasswordError("User not found");
                toast.error("An error occurred!");
            }
            console.error("Error logging in:", error);
        }
    };

    const onSignup = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${url}/api/user/register`, data);
            
            if (response.data.success) {
                const { token ,email} = response.data;
                localStorage.setItem("token", response.data.token);
                setToken(token);
                setShowLogin(false);
                
                toast.success("Sign up successful!");
                const sendVerificationEmail = async () => {
                    try {
                        await axios.post(`${url}/api/mail/send-verification-email`, { email: response.data.email });
                        toast.success('Verification email sent successfully');
                        setEmail(response.data.email);
                        navigate('/email-verification'); // Pass email as state
                    } catch (error) {
                        console.error('Error sending verification email:', error);
                        toast.error('Failed to send verification email');
                    }
                };
                sendVerificationEmail();
            } else {
                setSignupError(response.data.message); // Set signup error message
            }
        } catch (error) {
            console.error("Error registering user:", error);
            toast.error(error?.response?.data?.message);
        }
    };

    return (
        <div className='login-popup'>
            <form onSubmit={currState === "Sign Up" ? onSignup : onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? null : (
                        <>
                            <input className='inputs' name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' />
                            <input className='inputs' name='mobile' onChange={onChangeHandler} value={data.mobile} type="tel" placeholder='Mobile no' />
                        </>
                    )}
                    <input className='inputs' name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' />
                    <div className="password-input">
                        <input className='inputs' name='password' onChange={onChangeHandler} value={data.password} type={showPassword ? "text" : "password"} placeholder='Password' />
                        <span className="password-toggle" onClick={togglePasswordVisibility}>{showPassword ? "Hide" : "Show"}</span>
                        {passwordError && <span className="password-error">{passwordError}</span>} {/* Display password error */}
                    </div>
                    {currState === "Sign Up" && (
                        <>
                            <input className='inputs' name='confirmPassword' onChange={onChangeHandler} value={data.confirmPassword} type="text" placeholder='Confirm Password' />
                        </>
                    )}
                    {signupError && <span className="signup-error">{signupError}</span>} {/* Display signup error */}
                </div>

                <button type='submit'>{currState === "Sign Up" ? "Create account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input className='ui-checkbox' type="checkbox" id="termsCheckbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} required />
                    <label  htmlFor="termsCheckbox">By continuing, I agree to the <span className="terms-link" onClick={() => setShowTermsModal(true)}>terms of use & privacy policy.</span></label>
                </div>
                <div className='login-popup-switch'>
                    {currState === "Login" ? (
                        <div className='login'>
                            <p>Create a new account? <span className="login-popup-links" onClick={() => setCurrState("Sign Up")}>Click here</span></p>
                            <p>Forget Password? <NavLink to="./password-reset" className={"login-popup-links"}  onClick={() => setShowLogin(false)}>Click Here</NavLink></p>
                        </div>
                    ) : (
                        <p>Already have an account? <span className="login-popup-links" onClick={() => setCurrState("Login")}>Login here</span></p>
                    )}
                </div>
            </form>

            {showTermsModal && (
                <div className="terms-modal">
                    <div className="terms-modal-content">
                        <h2>Terms and Conditions</h2>
                        <hr />
                        <img className="close" onClick={() => setShowTermsModal(false)} src={assets.cross_icon} alt="Close" />
                        <div className="terms-and-conditions">
                            <h3>Introduction</h3>
                            <p>These Terms and Conditions govern your use of the [Your App Name] services.</p>

                            <h3>Acceptance of Terms</h3>
                            <p>By signing up for an account with [Your App Name], you agree to be bound by these Terms and Conditions.</p>

                            <h3>Account Registration</h3>
                            <p>To sign up for an account with [Your App Name], you must provide accurate and complete information.</p>

                            {/* Add more terms and conditions content here */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LoginPopup;
