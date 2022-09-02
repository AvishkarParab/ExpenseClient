import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-vxt957ex.us.auth0.com"
    clientId="QnoBGCuPoABprufI7b9hPFuBUXo1gwA4"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>
);

