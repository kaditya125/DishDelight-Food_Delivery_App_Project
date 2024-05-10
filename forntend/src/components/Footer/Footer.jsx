import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';

const Footer = () => {
  const handleMapClick = () => {
    const mapUrl = `https://www.google.com/maps?q=${28.540427},${77.168297}`;
    window.open(mapUrl, '_blank');
  };

  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo2} alt="" />
          <p>Welcome to DishDelight.com, your go-to destination for fresh and flavorful meals delivered right to your doorstep. With a passion for quality ingredients and culinary excellence, we strive to bring you a dining experience that's both convenient and satisfying. Explore our diverse menu, discover new favorites, and let us tantalize your taste buds with every bite. At Tomato.com, good food is just a click away!</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
            <img src={assets.insta_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
             <li><a href="./">Home</a></li>
             <li>About us</li>
             <li>Delivery</li>
             <li>Privacy Policy</li>
          </ul>

        </div>
        <div className="footer-content-right">
          <div className="contact">
            <h2>GET IN TOUCH</h2>
            <ul>
              <li>
                <a href="tel:9102202267">
                  <img src={assets.mobile} alt="" />
                  <span>9102202267</span>
                </a>
              </li>
              <li>
                <a href="mailto:kaditya125.ak@gmail.com">
                  <img src={assets.email1} alt="" />
                  <span>kaditya125.ak@gmail.com</span>
                </a>
              </li>
              <li>
                <a href="https://wa.me/9102202267">
                  <img src={assets.whatsapp} alt="" />
                  <span>9102202267</span>
                </a>
              </li>
              <li>
                <a href="#" onClick={handleMapClick}>
                  <img src={assets.map} alt="" />
                  <span>JNU, New Delhi</span>
                </a>
              </li>
            </ul>
          </div>
          <h2>Download App</h2>
          <div className="download">
            <ul>
              <li><img src={assets.play_store} alt="" /></li>
              <li><img src={assets.app_store} alt="" /></li>
            </ul>
          </div>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 @ DishDelight.com - All Right Reserved</p>
    </div>
  );
};

export default Footer;
