import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './LoginPage'; // استورد صفحة تسجيل الدخول (أو صفحة أخرى)
import Admin from './adminDashboard'; // استورد صفحة الـ Admin

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
