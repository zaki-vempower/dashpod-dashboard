import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import './satoshi.css';
import { Toaster } from "react-hot-toast";
import { Authenticator } from "@aws-amplify/ui-react";
import { AuthProvider } from './hooks/useAuth';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
    <AuthProvider>
    <Authenticator.Provider>
      <Toaster   toastOptions={{
    success: {
      style: {
        background: 'green',
        color: '#fff'
      },
    },
    error: {
      style: {
        background: 'red',
        color: '#fff'
      },
    },
  }}/>
      <App />
      </Authenticator.Provider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
