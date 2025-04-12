import React, { useState } from 'react';
import './dashboard.css';
import dashboardData from './data.json';
import { Link, Outlet } from 'react-router-dom';


const TaskerFlowDashboard = () => {
  const [dashboardDataState] = useState(dashboardData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeNavItem, setActiveNavItem] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { name: "Dashboard", path: "/admin" },
    { name: "Analytics", path: "/analytics" },
    { name: "Tickets", path: "/tickets" },
    { name: "UserManagement", path: "/usersManagement"}
  ];

  if (loading) return <div className="loading">Loading dashboard...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="tasker-flow-dashboard">
      {/* Sidebar Navigation */}
      <div className="sidebar">
        <h1 className="app-title">TaskerFlow</h1>
        
        <div className="section">
          <h2 className="section-title">Menu</h2>
          <ul className="nav-menu">
            {navItems.map((item, index) => (
              <li key={index} className="nav-item">
                <Link 
                  to={item.path}
                  className={({ isActive }) => isActive ? 'active' : ''}
                  onClick={() => setActiveNavItem(item.name)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <Outlet />
        {activeNavItem === 'Dashboard' && dashboardDataState && (
          <>
            {/* Header */}
            <div className="dashboard-header">
              <h2>Dashboard Overview</h2>
              <p>Welcome back! Here's what's happening with your tickets.</p>
            </div>

            {/* Ticket Metrics */}
            <div className="metrics-grid">
              {dashboardDataState.metrics.map((metric, index) => (
                <div key={index} className="metric-card">
                  <div className="metric-icon">{metric.icon || '📊'}</div>
                  <h3>{metric.title}</h3>
                  <div className="metric-value">{metric.value}</div>
                  <div className={`metric-change ${metric.change.startsWith('+') ? 'positive' : 'negative'}`}>
                    {metric.change}
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Tickets */}
            <div className="recent-tickets">
              <div className="section-header">
                <h2>Recent Tickets</h2>
                <p>You have {dashboardDataState.openTicketsCount} open tickets assigned to you</p>
              </div>
              <div className="tickets-list">
                {dashboardDataState.recentTickets.map(ticket => (
                  <div key={ticket.id} className="ticket-card">
                    <div className="ticket-header">
                      <span className="ticket-id">#{ticket.id}</span>
                      <span className={`priority ${ticket.priority.toLowerCase()}`}>
                        {ticket.priority}
                      </span>
                    </div>
                    <p className="ticket-title">{ticket.title}</p>
                    <div className="ticket-footer">
                      <span className="department">{ticket.department}</span>
                      <span className="ticket-date">{ticket.date || '2 days ago'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ticket Distribution */}
            <div className="ticket-distribution">
              <div className="section-header">
                <h2>Ticket Distribution</h2>
                <p>Breakdown by department and priority</p>
              </div>
              
              <div className="distribution-grid">
                <div className="department-distribution">
                  <h3>Departments</h3>
                  {dashboardDataState.distribution.departments.map(dept => (
                    <div key={dept.name} className="distribution-item">
                      <div className="label-row">
                        <span className="label">{dept.name}</span>
                        <span className="percentage">{dept.percentage}</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress" 
                          style={{ width: dept.percentage }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="priority-distribution">
                  <h3>Priorities</h3>
                  {dashboardDataState.distribution.priorities.map(priority => (
                    <div key={priority.name} className="distribution-item">
                      <div className="label-row">
                        <span className="label">{priority.name}</span>
                        <span className="percentage">{priority.percentage}</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress" 
                          style={{ width: priority.percentage }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskerFlowDashboard;