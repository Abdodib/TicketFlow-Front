import React from 'react';
import ReactDOM from 'react-dom/client'; // استيراد createRoot من react-dom/client
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root')); // إنشاء الجذر
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
