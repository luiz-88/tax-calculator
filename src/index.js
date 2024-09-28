import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import global styles
import App from './App'; // Main app component

// Create the root element where the React app will be mounted
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component within the React.StrictMode to help highlight potential problems
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
