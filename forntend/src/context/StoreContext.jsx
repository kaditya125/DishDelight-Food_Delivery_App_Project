// StoreContextProvider.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [discount, setDiscount] = useState(0);
  const url = "http://localhost:4000"
  const [ token,setToken] = useState("");
  const  [food_list,setFoodList] =   useState([]);
  const [usedPromoCodes, setUsedPromoCodes] = useState([]);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if(token){
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      
      await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
  
      // Update the local state of cartItems
      if (cartItems[itemId] === 1) {
        const updatedCartItems = { ...cartItems };
        delete updatedCartItems[itemId];
        setCartItems(updatedCartItems);
      } else {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };
  




  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };


  const fetchFoodList = async ()  =>{
    const response = await axios.get(url+"/api/food/list")
    setFoodList(response.data.data)
  }

  const loadCartData = async (token) => {
    try {
      const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
      console.log(response);
      console.log(response.data.cartData);
      //setCartItems(response.data.cartData);
      setCartItems(response.data.cartData);
    } catch (error) {
      console.error("Error loading cart data:", error);
      toast.error("Error loading cart data");
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const storedToken = localStorage.getItem('token');
      console.log(storedToken);
       storedToken ? (setToken(storedToken), await loadCartData(storedToken)) : toast.info("Please Login!");
    }

    loadData();
  }, []);


const applyPromoCode = (promoCode) => {
  if (promoCode.trim().toUpperCase() === 'DISCOUNT10') {
    // Apply 10% discount
    if (usedPromoCodes.includes(promoCode)) {
      return 'already_used';
    }

    // Apply 10% discount
    const totalAmountBeforeDiscount = getTotalCartAmount();
    const discountAmount = totalAmountBeforeDiscount * 0.1;
    
    setDiscount(discountAmount);
    // Add the promo code to the list of used promo codes
    setUsedPromoCodes([...usedPromoCodes, promoCode]);

    return true;  
  } else {
    setDiscount(0);
    return false;
  }
};


  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    applyPromoCode,
    discount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
