import React, { useState, useContext, useEffect } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = ({ setShowLogin, loggedInUserName }) => {
    const [menu, setMenu] = useState("home");
    const [loggedInUser, setLoggedInUser] = useState("");
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchButtonText, setSearchButtonText] = useState("");
    const { cartItems, token, setToken, setCartItems } = useContext(StoreContext);
    const [showDropdown, setShowDropdown] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [menuActive, setMenuActive] = useState(false); // State to manage menu visibility
    const navigate = useNavigate();

    const totalItemsInCart = Object.values(cartItems).reduce((acc, curr) => acc + curr, 0);

    useEffect(() => {
        const storedUserName = localStorage.getItem('Name');
        if (storedUserName) {
            setLoggedInUser(storedUserName);
        }
    }, []);

    useEffect(() => {
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

    const handleDropdownToggle = () => {
        setShowDropdown(!showDropdown);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('Name');
        setToken("");
        setLoggedInUser("");
        setCartItems({});
        toast.success("Logout Successfully !");
        navigate("/");
    }

    const handleSearch = () => {
        console.log("Search query:", searchQuery);
        setSearchVisible(false);
    }

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    }

    const toggleMenu = () => {
        setMenuActive(!menuActive);
    }

    return (
        <div className={`navbar ${darkMode ? 'dark' : ''}`}>
            <Link to={'/'}><img src={assets.logo1} alt="" className="logo" /></Link>
            <div className="menu-toggle" onClick={toggleMenu}>
                
            </div>
            <ul className={`navbar-menu ${menuActive ? 'active' : ''}`}>
                <Link to={'/'} onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
                <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
                <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
                <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</a>
                <label className="switch">
                    <input type="checkbox" onChange={toggleDarkMode} />
                    <span className="slider"></span>
                </label>
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
                        <div onClick={() => toast.info('Please log in to access the cart')}>
                            {totalItemsInCart > 0 ? (
                                <>
                                    <img src={assets.food_pic} alt="" />
                                    <div className="item-count">{totalItemsInCart}</div>
                                </>) : (<img src={assets.shop1} alt="" />)}
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
