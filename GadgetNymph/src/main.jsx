import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import Router from './router.jsx'
import { useState } from 'react'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
)
