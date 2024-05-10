import React from 'react'
import './Navbar.css'
import {assets} from  '../../assets/assets' 

const Navbar = () => {
  return (
    <div className='navbar'>
        
        <img src={assets.logo1} alt="" className="logo" />
        <img src={assets.profile} alt="" className="profile_logo" />
    </div>
  )
}

export default Navbar