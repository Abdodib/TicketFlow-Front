import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/LoginPage'; // استورد صفحة تسجيل الدخول (أو صفحة أخرى)
import Admin from './components/adminDashboard'; // استورد صفحة الـ Admin
import Forget from './components/forgetMotdepass';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/forget" element={<Forget />} />
      </Routes>
    </Router>
  );
}

export default App;
