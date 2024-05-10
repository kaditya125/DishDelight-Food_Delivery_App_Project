import React, { useContext, useState, useEffect } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, applyPromoCode, discount, url } = useContext(StoreContext);
  const [promoCode, setPromoCode] = useState('');
  const [totalCartAmount, setTotalCartAmount] = useState(getTotalCartAmount());
  const [promoCodeApplied, setPromoCodeApplied] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const calculateTotalPrice = (item) => {
    return item.price * cartItems[item._id];
  };

  const handleApplyPromoCode = async () => {
    const isValidPromoCode = await applyPromoCode(promoCode);
    if (isValidPromoCode === 'already_used') {
      setError('Promo code has already been utilized');
      setPromoCodeApplied(false);
      toast.error('Promo code has already been utilized');
    } else if (isValidPromoCode) {
      setPromoCodeApplied(true);
      setError(null);
      toast.success('Promo code applied successfully!');
    } else {
      setError('Invalid promo code');
      setPromoCodeApplied(false);
      toast.error('Invalid promo code');
    }
  };
  
  

  const handleProceedToCheckout = () => {
    setTotalCartAmount(getTotalCartAmount() - discount);
    navigate('/order');
  };

  const handleRemoveItem = (itemId, itemName) => {
    removeFromCart(itemId);
    toast.info(`${itemName} removed from cart`); // Display info toast for removing item from cart
  };

  useEffect(() => {
    setTotalCartAmount(getTotalCartAmount());
  }, [cartItems, getTotalCartAmount]);

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          const quantity = cartItems[item._id] || 0;
          if (quantity > 0) {
            const totalPrice = calculateTotalPrice(item);
            return (
              <React.Fragment key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={url + "/images/" + item.image} alt="" />
                  <p>{item.name}</p>
                  <p>&#x20B9; {item.price}</p>
                  <p>{quantity}</p>
                  <p>&#x20B9; {totalPrice}</p>
                  <p onClick={() => handleRemoveItem(item._id, item.name)} className='cross'>X</p>
                </div>
                <hr />
              </React.Fragment>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>&#x20B9; {totalCartAmount}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Discount</p>
              <p> - &#x20B9; {discount}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>+ &#x20B9; {totalCartAmount === 0 ? 0 : 60}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b> &#x20B9; {totalCartAmount === 0 ? totalCartAmount + 0 : totalCartAmount + 2}</b>
            </div>
          </div>
          <button onClick={handleProceedToCheckout}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='promo code' value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
              <button onClick={handleApplyPromoCode}>Submit</button>
            </div>
            {error && <p className="error-message">{error}</p>}
            {promoCodeApplied && <p className="success-message">Promo code applied successfully!</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
