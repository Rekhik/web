import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Context from './components/contextApi/context.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(

  <Context>
    <BrowserRouter>
      <GoogleOAuthProvider clientId="260823959309-nj1jle63p0js250anitnqp7qngm8971s.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </BrowserRouter>
  </Context>
)
