import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    role: 'All Roles',
    department: 'All Departments',
    status: 'All Statuses'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: "📊" },
    { name: "Analytics", path: "/analytics", icon: "📈" },
    { name: "Tickets", path: "/tickets", icon: "🎫" },
    { name: "UserManagement", path: "/usersManagement", icon: "👥" }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await import('./usersData.json');
        const usersWithIds = response.default.users.map((user, index) => ({
          ...user,
          id: user.id || `user-${index}`
        }));
        setUsers(usersWithIds);
        setFilteredUsers(usersWithIds);
        setLoading(false);
      } catch (error) {
        console.error("Error loading user data:", error);
        setError("Failed to load user data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const filtered = users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(filters.search.toLowerCase()) || 
                         user.email.toLowerCase().includes(filters.search.toLowerCase());
      const matchesRole = filters.role === 'All Roles' || user.role === filters.role;
      const matchesDept = filters.department === 'All Departments' || user.department === filters.department;
      const matchesStatus = filters.status === 'All Statuses' || user.status === filters.status;
      
      return matchesSearch && matchesRole && matchesDept && matchesStatus;
    });
    setFilteredUsers(filtered);
  }, [filters, users]);

  const getFilterOptions = () => {
    const roles = ['All Roles', ...new Set(users.map(user => user.role))];
    const departments = ['All Departments', ...new Set(users.map(user => user.department))];
    const statuses = ['All Statuses', ...new Set(users.map(user => user.status))];
    
    return { roles, departments, statuses };
  };

  const filterOptions = getFilterOptions();

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      setSuccessMessage('User deleted successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleRoleChange = (userId, newRole) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
    setSuccessMessage('User role updated successfully');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      role: 'All Roles',
      department: 'All Departments',
      status: 'All Statuses'
    });
  };

  if (loading) return (
    <div className="loading-state">
      <div className="spinner"></div>
      <p>Loading user data...</p>
    </div>
  );
  
  if (error) return (
    <div className="error-state">
      <p>Error loading data: {error}</p>
      <button onClick={() => window.location.reload()}>Retry</button>
    </div>
  );

  return (
    <div className={`dashboard-container ${!sidebarOpen ? 'sidebar-collapsed' : ''}`}>
      {/* Sidebar Navigation */}
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
                <Link 
                  to={item.path}
                  className={({ isActive }) => isActive ? 'active' : ''}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {sidebarOpen && <span className="nav-text">{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="user-management">
          <div className="page-header">
            <h1>User Management</h1>
            <p className="subtitle">Manage user accounts and permissions</p>
          </div>
          
          {successMessage && <div className="success-message">{successMessage}</div>}
          
          <div className="filters-container">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search users..."
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                className="search-input"
              />
              <svg className="search-icon" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </div>
            
            <div className="filter-selects">
              <select 
                name="role" 
                value={filters.role} 
                onChange={handleFilterChange}
                className="filter-select"
              >
                {filterOptions.roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              
              <select 
                name="department" 
                value={filters.department} 
                onChange={handleFilterChange}
                className="filter-select"
              >
                {filterOptions.departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              
              <select 
                name="status" 
                value={filters.status} 
                onChange={handleFilterChange}
                className="filter-select"
              >
                {filterOptions.statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <button onClick={resetFilters} className="reset-filters">
              Reset Filters
            </button>
          </div>
          
          <div className="users-table-container">
            <div className="table-header">
              <div className="header-cell">User</div>
              <div className="header-cell">Role</div>
              <div className="header-cell">Department</div>
              <div className="header-cell">Status</div>
              <div className="header-cell">Last Active</div>
              <div className="header-cell">Actions</div>
            </div>
            
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <div className="table-row" key={user.id}>
                  <div className="table-cell user-info">
                    <div className="user-avatar">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="user-name">{user.name}</div>
                      <div className="user-email">{user.email}</div>
                    </div>
                  </div>
                  <div className="table-cell">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className="role-select"
                    >
                      {filterOptions.roles
                        .filter(role => role !== 'All Roles')
                        .map(role => (
                          <option key={`${user.id}-${role}`} value={role}>{role}</option>
                        ))}
                    </select>
                  </div>
                  <div className="table-cell">{user.department}</div>
                  <div className="table-cell">
                    <span className={`status-badge ${user.status.toLowerCase()}`}>
                      {user.status}
                    </span>
                  </div>
                  <div className="table-cell">{user.lastActive}</div>
                  <div className="table-cell">
                    <button 
                      onClick={() => handleDeleteUser(user.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <svg className="no-results-icon" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9z"/>
                </svg>
                <p>No users found matching your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;