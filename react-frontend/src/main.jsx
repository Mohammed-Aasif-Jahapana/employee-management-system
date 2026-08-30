import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx';
import "./assets/styles/index.css";
import { EmployeeProvider } from './context/EmployeeContext.jsx';

import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from 'react-redux';
import { store } from './redux/store.js';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <EmployeeProvider>
        <GoogleOAuthProvider clientId="522766044619-gpbq6vkr0qlgaaidai0qtdkh30t9ebh5.apps.googleusercontent.com">
          <Provider store={store}>
            <App />
          </Provider>
        </GoogleOAuthProvider>
      </EmployeeProvider>
    </BrowserRouter>
  </StrictMode>,
)
