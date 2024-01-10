import { useState } from 'react'
import BasicBreadcrumbs from '../components/Categories'
import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar';

function App() {

  return(
    <div id='root'>
      <Navbar />
      <BasicBreadcrumbs />
      <Outlet />
    </div>
  )
}

export default App;
