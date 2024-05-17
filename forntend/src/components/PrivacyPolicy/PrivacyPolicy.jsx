// src/components/PrivacyPolicy.jsx
import React from 'react';
import './PrivacyPolicy.css';
import { FaLock, FaInfoCircle, FaShieldAlt, FaSyncAlt, FaEnvelope } from 'react-icons/fa';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      <h1>Privacy Policy</h1>
      <p>
        At DishDelight, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your information when you use our services.
      </p>
      <div className="section">
        <h2><FaInfoCircle className="icon" /> Information Collection</h2>
        <p>
          We collect personal information that you provide to us directly, such as your name, email address, and payment information. We also collect information about your usage of our services.
        </p>
      </div>
      <div className="section">
        <h2><FaSyncAlt className="icon" /> Use of Information</h2>
        <p>
          We use your information to provide and improve our services, process your orders, communicate with you, and for other customer service purposes. We do not sell your personal information to third parties.
        </p>
      </div>
      <div className="section">
        <h2><FaShieldAlt className="icon" /> Data Security</h2>
        <p>
          We implement a variety of security measures to ensure the safety of your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.
        </p>
      </div>
      <div className="section">
        <h2><FaSyncAlt className="icon" /> Changes to Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on our website.
        </p>
      </div>
      <div className="section">
        <h2><FaEnvelope className="icon" /> Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at support@dishdelight.com.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
