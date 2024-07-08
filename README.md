# DishDelight Food Delivery Platform

Welcome to DishDelight, an innovative food delivery platform that connects customers with their favorite restaurants. This repository contains the source code for the DishDelight project, which is a full-stack application developed using the MERN stack (MongoDB, Express.js, React.js, and Node.js).

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview

DishDelight is designed to provide a seamless and enjoyable food ordering experience for users. Whether you are looking to order food for delivery or pickup, DishDelight offers a wide range of restaurant options and a user-friendly interface.

## Features

- User Authentication: Secure login and registration for customers and restaurant owners.
- Restaurant Management: Restaurant owners can add, update, and delete their menus.
- Order Management: Customers can place orders, track order status, and view order history.
- Real-time Notifications: Get updates on order status in real-time.
- Responsive Design: Optimized for both desktop and mobile devices.
- Review and Rating System: Customers can leave reviews and rate their dining experiences.

## Technologies Used

- **Frontend:** React.js, Redux, Bootstrap
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **Deployment:** Docker, AWS

## Installation

To get a local copy up and running, follow these steps:

1. Clone the repository:
   
   git clone https://github.com/kaditya125/Food_Delivery_App_Project.git
   
2. Navigate to the project directory:

   cd Food_Delivery_App_Project
   
3. Install dependencies for both the frontend and backend:

      # For the backend
        cd backend
        npm install

      # For the frontend
       cd ../frontend
       npm install
   
5. Create a .env file in the backend directory and add the following environment variables:


      PORT=5000
      MONGO_URI=<your_mongodb_uri>
      JWT_SECRET=<your_jwt_secret>
      
6. Run the application:


      # In the backend directory
      npm start

       # In the frontend directory
       npm start
    The application should now be running on http://localhost:3000 for the frontend and http://localhost:5000 for the backend.

##Usage
 -Open your browser and go to http://localhost:3000.
 -Register as a new user or log in with your existing account.
 -Browse available restaurants and menus.
 -Place an order and enjoy your meal!
 
##Contributing
      Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

##Fork the Project
   -Create your Feature Branch (git checkout -b feature/AmazingFeature)
   -Commit your Changes (git commit -m 'Add some AmazingFeature')
   -Push to the Branch (git push origin feature/AmazingFeature)
   -Open a Pull Request
##License
    Distributed under the MIT License. See LICENSE for more information.

Contact
Aditya Kumar - kaditya125

## Project Link: https://github.com/kaditya125/Food_Delivery_App_Project
