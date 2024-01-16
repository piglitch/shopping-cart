import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import BasicBreadcrumbs from '../components/Categories'
import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar';
import Home from './HomePage';

function App() {
  const location = useLocation()

  // Check if the current path is the home path
  const isHomePath = location.pathname === '/';

  return(
    <div id='root'>
      <Navbar />
      <BasicBreadcrumbs />
      {isHomePath && <Home />}
      <Outlet />
    </div>
  )
}

export default App;
