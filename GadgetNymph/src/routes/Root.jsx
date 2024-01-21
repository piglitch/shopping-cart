import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import BasicBreadcrumbs from '../components/Categories'
import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar';
import Home from './HomePage';
import PropTypes from 'prop-types';

function App({ wishList, setWishList, cart, setCart }) {
  const location = useLocation()

  // Check if the current path is the home path
  const isHomePath = location.pathname === '/';

  return(
    <div id='root'>
      <Navbar 
        wishList={wishList}
        setWishList={setWishList}
        cart={cart}
        setCart={setCart} 
      />
      <BasicBreadcrumbs />
      {isHomePath && <Home />}
      <Outlet />
    </div>
  )
}
App.propTypes = {
  wishList: PropTypes.array,
  setWishList: PropTypes.any,
  cart: PropTypes.array,
  setCart: PropTypes.any,
}
export default App;
