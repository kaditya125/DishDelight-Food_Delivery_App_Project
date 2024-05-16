import React, { useContext } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import './ProductDetail.css'; // Import CSS for ProductDetail component
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const { token,cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  const location = useLocation();
  const history = useNavigate();

  // Access the state data
  const { id, name, price, description, image, ingredients, discount } = location.state;

  // Function to handle adding item to cart
  const handleAddToCart = () => {
    addToCart(id);
    toast.success(`${name} added to cart`); // Display success message for adding item to cart
  };

  // Function to handle removing item from cart
  const handleRemoveFromCart = () => {
    removeFromCart(id);
    toast.success(`${name} removed from cart`); // Display success message for removing item from cart
  };

  // Function to navigate to the cart page
  const goToCart = () => {
    if (token) {
        history('/cart');
      } else {
        toast.info('Please login to proceed to cart'); 
      }
  };

  // Render the component
  return (
    <div className="product-detail-container">
      <div className="product-detail-image">
        <img src={`${url}/images/${image}`} alt={name} />
      </div>
      <div className="product-detail-info">
        <h1>{name}</h1>
        <p>{description}</p>
        <p>Price: &#x20B9; {price}</p>
        <p>Ingredients: {ingredients}</p>
        <hr />
        {discount && <p>Discount: {discount}%</p>}
        <div className="product-detail-buttons">
          <button className='button' onClick={handleAddToCart}>Add to Cart</button>
          <button className='button' onClick={handleRemoveFromCart}>Remove from Cart</button>
          <button className='button'  onClick={goToCart}>Go to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
