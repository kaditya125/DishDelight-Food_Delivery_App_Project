import React, { useEffect } from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';

const Footer = () => {
  const handleMapClick = () => {
    const mapUrl = `https://www.google.com/maps?q=${28.555670},${77.175209}`;
    window.open(mapUrl, '_blank');
  };

  useEffect(() => {
    async function initAerialView() {
      const PARAMETER_VALUE = '1600 Amphitheatre Parkway, Mountain View, CA 94043';
      const API_KEY = 'AIzaSyBeaBoaWNv0CfV5TpPG1DLS14HO83f4qKg';

      const displayEl = document.querySelector('.aerial-view-media');

      displayEl.addEventListener('click', function () {
        if (displayEl.paused) {
          displayEl.play();
        } else {
          displayEl.pause();
        }
      });

      const parameterKey = videoIdOrAddress(PARAMETER_VALUE);
      const urlParameter = new URLSearchParams();
      urlParameter.set(parameterKey, PARAMETER_VALUE);
      urlParameter.set('key', API_KEY);
      const response = await fetch(`https://aerialview.googleapis.com/v1/videos:lookupVideo?${urlParameter.toString()}`);
      const videoResult = await response.json();

      if (videoResult.state === 'PROCESSING') {
        alert('Video still processing..');
      } else if (videoResult.error && videoResult.error.code === 404) {
        alert('Video not found. To generate video for an address, call on Aerial view renderVideo method.');
      } else {
        displayEl.src = videoResult.uris.MP4_MEDIUM.landscapeUri;
      }
    }

    function videoIdOrAddress(value) {
      const videoIdRegex = /[0-9a-zA-Z-_]{22}/;
      return value.match(videoIdRegex) ? 'videoId' : 'address';
    }

    initAerialView();
  }, []);

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
              <a href="https://wa.me/9102202267?text=Check%20out%20DishDelight%20for%20delicious%20meals%20delivered%20to%20your%20doorstep!%20Visit%20our%20website:%20https://food-delivery-app-project-1-user-module.onrender.com/">
                  <img src={assets.whatsapp} alt="" />
                  <span>+919102202267</span>
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
        <div className="footer-content-aerial-view-container">
        <h2>AERIAL VIEW</h2>
        <div className="container">

          <video className="aerial-view-media" muted autoPlay loop>
            Your browser does not support HTML5 video.
          </video>
        </div>
      </div>
      </div>
     
      <hr />
      <p className="footer-copyright">Copyright 2024 @ DishDelight.com - All Right Reserved</p>
    </div>
  );
};

export default Footer;
