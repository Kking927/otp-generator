import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'      // match App.jsx exactly
import './index.css'         // global/reset styles
import './app.css'           // component styles (optional)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
