import React, { useState, useEffect } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets'; // Import your assets

const Header = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const numberOfImages = 10; // Number of images in the sequence

  // Generate the array of image URLs dynamically
  const images = Array.from({ length: numberOfImages }, (_, index) => assets[`food${index + 1}`]);

  useEffect(() => {
    // Update the current image index in a loop
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change 5000 to the desired interval in milliseconds

    // Clear the interval when the component unmounts to prevent memory leaks
    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <div className='header' style={{ backgroundImage: `url(${images[currentImageIndex]})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="header-contents">
        <h2>Order your favourite food <span className='color'>Here </span></h2>
        <p>Indulge in a symphony of flavors at Flavor Haven, your ultimate destination for culinary bliss. Whether you're craving familiar classics or daring delicacies, our menu is a treasure trove of gastronomic delights waiting to be explored. Immerse yourself in a world of taste sensations and embark on a culinary journey unlike any other. At Flavor Haven, every dish tells a story, and every bite is a revelation. Join us and discover the magic of flavor!</p>
        <button><Link to="#explore-menu">Explore Our Menu</Link></button>
      </div>
    </div>
  );
}

export default Header;
