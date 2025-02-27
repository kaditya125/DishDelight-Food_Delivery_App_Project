import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import ExploreMenu from './components/ExploreMenu/ExploreMenu';
import Verify from './pages/Verify/Verify';
import MyOrders from './pages/MyOrders/MyOrders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChatBot from './components/ChatBot/ChatBot';
import OrderStatus from './pages/OrderStaus/OrderStatus';
import ForgotPass from './components/ForgotPass/ForgotPass';
import PassWordReset from './components/PassWordReset/PassWordReset';
import EmailVarification from './components/EmailVarification/EmailVarification';
import MapContainer from './components/MapContainer/MapContainer';
import ProductDetail from './components/ProductDetail/ProductDetail';
import AboutUs from './components/AboutUs/AboutUs';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';
import Delivery from './components/Delivery/Delivery';


const App = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [loggedInUserName, setLoggedInUserName] = useState("");
    const [email, setEmail] = useState("");
    const [orderItems, setOrderItems] = useState([]);
    const [orderData, setOrderData] = useState({});

    return (
        <>
           <ToastContainer/>
           <ChatBot/>
            {showLogin ? <LoginPopup setShowLogin={setShowLogin} setLoggedInUserName={setLoggedInUserName} setEmail={setEmail}/> : null}
            <div className='app'>
                <Navbar setShowLogin={setShowLogin} loggedInUserName={loggedInUserName} />
                <Routes>
                    <Route path='forgotpassword/:id/:token' element={<ForgotPass/>}/>
                    <Route path='password-reset' element={<PassWordReset/>}/>
                    <Route path='/' element={<Home />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='./explore-menu' element={<ExploreMenu/>} />
                    <Route path='/order' element={<PlaceOrder  />} />
                    <Route path='/verify' element= {<Verify/>}/>
                    <Route path='/myorders' element={<MyOrders />} />
                    <Route path='/orderstatus' element ={<OrderStatus/>}/>
                    <Route path='/email-verification' element={<EmailVarification email={email}/>}/>
                    <Route path='/map-container' element={<MapContainer/>}/>
                    <Route path='/product-details' element={<ProductDetail />} />
                    <Route path='about-us' element={<AboutUs/>}/>
                    <Route path='privacy-policy' element={<PrivacyPolicy/>}/>
                    <Route path='delivery'  element={<Delivery/>}/>

                </Routes>
            </div>
            <Footer />
        </>
    );
}

export default App;
