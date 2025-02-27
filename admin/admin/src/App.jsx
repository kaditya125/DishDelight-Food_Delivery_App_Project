import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes, Link } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer/Footer'

const App = () => {
  const url = "https://food-delivery-app-project-3.onrender.com"

  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <div style={{ backgroundColor: 'orange', padding: '10px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' ,backgroundColor: 'orange'}}>
          Home
        </Link>
      </div>
      
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path='/add' element={<Add  url={url}/>}/>
          <Route path='/list' element={<List url={url}/>}/>
          <Route path='/orders' element={<Orders url={url}/>}/>
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
