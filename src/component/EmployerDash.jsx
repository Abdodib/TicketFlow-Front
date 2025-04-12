import React, { useState, useEffect } from 'react';
import { FiSearch, FiChevronDown, FiUser, FiSettings } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './MyTickets.css';

const MyTickets = () => {
  const navItems = [
      { name: "My Tickets", path: "/employerDash", icon: "📈" },
      { name: "Add Tickets", path: "/addTicket", icon: "📊" },
    { name: "LOGOUT", path: "/", icon: "🎫" }
  ];

  const [tickets, setTickets] = useState([]);
  const [user, setUser] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.includes(searchTerm);
    const matchesFilter = activeFilter === 'All' || ticket.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const statusOptions = ['All', 'Open', 'In Progress', 'Received'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        const response = await import('./tikii.json');
        const tickets = response.default.tickets || [];
        const user = response.default.user || { name: '', email: '' };

        setTickets(tickets);
        setUser(user);
        setLoading(false);
      } catch (err) {
        console.error("Error loading user data:", err);
        setError("Failed to load data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className={`tickets-container ${!sidebarOpen ? 'sidebar-collapsed' : ''}`}>
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          {sidebarOpen && <h1 className="app-title">TaskerFlow</h1>}
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        <div className="section">
          {sidebarOpen && <h2 className="section-title">Menu</h2>}
          <ul className="nav-menu">
            {navItems.map((item, index) => (
              <li key={index} className="nav-item">
                <Link to={item.path} className="nav-link">
                  <span className="nav-icon">{item.icon}</span>
                  {sidebarOpen && <span className="nav-text">{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>


        <div className="user-profile">
          <div className="user-avatar">
            {user.name?.charAt(0) || 'U'}
          </div>
          {sidebarOpen && (
            <div className="user-info">
              <div className="user-name">{user.name || 'Unknown User'}</div>
              <div className="user-email">{user.email || 'No email'}</div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="tickets-header">
          <h1>My Tickets</h1>
          <div className="search-filter">
            <div className="search-container">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="filter-dropdown">
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className="filter-select"
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <FiChevronDown className="dropdown-arrow" />
            </div>
          </div>
        </div>

        <div className="tickets-table">
          <div className="table-header">
            <div className="header-cell">Ticket ID</div>
            <div className="header-cell">Title</div>
            <div className="header-cell">Priority</div>
            <div className="header-cell">Status</div>
            <div className="header-cell">Created</div>
            <div className="header-cell">Last Updated</div>
          </div>

          {filteredTickets.length > 0 ? (
            filteredTickets.map(ticket => (
              <div key={ticket.id} className="ticket-row">
                <div className="ticket-cell id-cell">#{ticket.id}</div>
                <div className="ticket-cell title-cell">{ticket.title}</div>
                <div className="ticket-cell">
                  <span className={`priority-badge ${ticket.priority.toLowerCase()}`}>
                    {ticket.priority}
                  </span>
                </div>
                <div className="ticket-cell">
                  <span className={`status-badge ${ticket.status.toLowerCase().replace(' ', '-')}`}>
                    {ticket.status}
                  </span>
                </div>
                <div className="ticket-cell">{ticket.created}</div>
                <div className="ticket-cell">{ticket.updated}</div>
              </div>
            ))
          ) : (
            <div className="no-results">No tickets found matching your criteria</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyTickets;
