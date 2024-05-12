import React, { useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import axios from "axios";
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from 'react-router-dom';

const LoginPopup = ({ setShowLogin, setLoggedInUserName }) => {
    const { url, setToken } = useContext(StoreContext);
    const [currState, setCurrState] = useState("Sign Up");
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
        const name = event.target.name;
        const value = event.target.value;
        setData({ ...data, [name]: value });
        // Clear password error when user starts typing again
        setPasswordError("");
        setSignupError(""); // Clear signup error when user starts typing
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${url}/api/user/login`, data);
            console.log(response);
            if (response.data.success) {
                const token = response.data.token;
                localStorage.setItem('token', token);
                setToken(token);
                setShowLogin(false);
                const userName = response.data.name; 
                localStorage.setItem('Name', userName);
                setLoggedInUserName(userName);
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
            }
                // Set password error message
                else{
                    setPasswordError("user not found")
                    toast.error(error.response.data.message);
                }
            }
            
                console.error("Error logging in:", error);
                toast.error("An error occurred!");
        
        
    };

    const onSignup = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${url}/api/user/register`, data);
            if (response.data.success) {
                const token = response.data.token;
                localStorage.setItem("token", JSON.stringify(token));
                setToken(token);
                setShowLogin(false);
                toast.success("Sign up successful!");
            } else {
                setSignupError(response.data.message); // Set signup error message
            }
        } catch (error) {
            console.error("Error registering user:", error);
            toast.error(error.response.data.message);
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
                            <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' />
                            <input name='mobile' onChange={onChangeHandler} value={data.mobile} type="tel" placeholder='Mobile no' />
                        </>
                    )}
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' />
                    <div className="password-input">
                        <input name='password' onChange={onChangeHandler} value={data.password} type={showPassword ? "text" : "password"} placeholder='Password' />
                        <span className="password-toggle" onClick={togglePasswordVisibility}>{showPassword ? "Hide" : "Show"}</span>
                        {passwordError && <span className="password-error">{passwordError}</span>} {/* Display password error */}
                    </div>
                    {currState === "Sign Up" && (
                        <>
                            <input name='confirmPassword' onChange={onChangeHandler} value={data.confirmPassword} type="text" placeholder='Confirm Password' />
                        </>
                    )}
                    {signupError && <span className="signup-error">{signupError}</span>} {/* Display signup error */}
                </div>

                <button type='submit'>{currState === "Sign Up" ? "Create account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" id="termsCheckbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} required />
                    <label htmlFor="termsCheckbox">By continuing, I agree to the <span className="terms-link" onClick={() => setShowTermsModal(true)}>terms of use & privacy policy.</span></label>
                </div>
                <div className='login-popup-switch'>
                    {currState === "Login" ?
                    <div className='login'>
                        <p>Create a new account? <span className="login-popup-links" onClick={() => setCurrState("Sign Up")}>Click here</span></p>
                        <p>Forget Password? <NavLink to="./password-reset" className={"login-popup-links"}  onClick={() => setShowLogin(false)}>Click Here</NavLink></p>

                    </div>
                        
                        :
                        
                        <p>Already have an account? <span className="login-popup-links" onClick={() => setCurrState("Login")}>Login here</span></p>
                        }
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
