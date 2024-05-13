import React, { useState, useContext, useEffect } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { toast } from 'react-toastify'; // Corrected import
import 'react-toastify/dist/ReactToastify.css';

const Navbar = ({ setShowLogin, loggedInUserName }) => {
    const [menu, setMenu] = useState("home");
    const [loggedInUser, setLoggedInUser] = useState(""); // Use state to manage logged-in user name
    const [searchVisible, setSearchVisible] = useState(false); // State to manage visibility of search bar
    const [searchQuery, setSearchQuery] = useState(""); // State to store search query
    const [searchButtonText, setSearchButtonText] = useState(""); // State to manage search button text
    const { cartItems, token, setToken, setCartItems } = useContext(StoreContext);
    const navigate = useNavigate();

    // Calculate total number of items in cart
    const totalItemsInCart = Object.values(cartItems).reduce((acc, curr) => acc + curr, 0);

    useEffect(() => {
        // Retrieve logged-in user name from localStorage
        const storedUserName = localStorage.getItem('Name');
        if (storedUserName) {
            setLoggedInUser(storedUserName);
        }
    }, []);

    useEffect(() => {
        // Update search button text in a loop
        const interval = setInterval(() => {
            setSearchButtonText((prevText) => {
                if (prevText === "Search") {
                    return "";
                } else {
                    return prevText + " ";
                }
            });
        }, 500);

        return () => clearInterval(interval);
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('Name');
        setToken("");
        setLoggedInUser("");
        setCartItems({});
        toast.success("Logout Successfully !"); // Display success toast
        navigate("/");
    }

    // Function to handle search
    const handleSearch = () => {
        // Perform search logic with searchQuery
        console.log("Search query:", searchQuery);

        // After searching, hide the search bar
        setSearchVisible(false);
    }

    return (
        <div className='navbar'>
            <Link to={'/'}><img src={assets.logo1} alt="" className="logo" /></Link>
            <ul className="navbar-menu">
                <Link to={'/'} onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
                <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
                <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
                <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</a>
            </ul>
            <div className="navbar-right">
                {!searchVisible ? (
                    <img src={assets.search} alt="" onClick={() => setSearchVisible(true)} />
                ) : (
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button onClick={handleSearch}>{searchButtonText}</button>
                    </div>
                )}
                 {!token ? (
                <div className="navbar-search-icon">
                    <div  onClick={() => toast.info('Please log in to access the cart')}>
                    {totalItemsInCart > 0 ? (
                            <>
                                <img src={assets.food_pic} alt="" />
                                <div className="item-count">{totalItemsInCart}</div>
                            </>):(<img src={assets.shop1} alt="" />)}
                    </div>
                    
                </div>
            ) : (
                <div className="navbar-search-icon">
                    <Link to="/Cart">
                        {totalItemsInCart > 0 ? (
                            <>
                                <img src={assets.food_pic} alt="" />
                                <div className="item-count">{totalItemsInCart}</div>
                            </>
                        ) : (
                            <img src={assets.shop1} alt="" />
                        )}
                    </Link>
                </div>
            )}

                {!token ?
                    <button onClick={() => setShowLogin(true)}>sign in</button> :
                    <div className='navbar-profile'>
                        <img src={assets.profile_icon} alt="" />
                        {loggedInUser && <span className="profile-name">{loggedInUser}</span>}
                        <ul className="nav-profile-dropdown">
                            <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                            <hr />
                            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                        </ul>
                    </div>}
            </div>
        </div>
    );
}

export default Navbar;
