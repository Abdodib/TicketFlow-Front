// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './component/dashboard.css';
import TaskerFlowDashboard from './component/adminDashboard';
import AnalyticsPage from './component/Analyse'
import UserManagement from './component/usersmange';
import Login from './component/LoginPage';
import TicketsPage from './component/Tickets';



function App() {
 

  return (
    <Router>
      

       
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/admin" element={<TaskerFlowDashboard/>} />
            <Route path='/analytics' element={<AnalyticsPage />} />
            <Route path='/usersManagement' element={<UserManagement />} />
            <Route path='/tickets' element={<TicketsPage />} />

          </Routes>
        
    </Router>
  );
}

export default App;