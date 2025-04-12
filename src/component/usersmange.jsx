import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiX, FiRefreshCw, FiTrash2, FiChevronDown } from 'react-icons/fi';
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
  const [selectedRows, setSelectedRows] = useState(new Set());

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: "📊" },
    { name: "Analytics", path: "/analytics", icon: "📈" },
    { name: "Tickets", path: "/tickets", icon: "🎫" },
    { name: "UserManagement", path: "/usersManagement", icon: "👥" }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        const response = await import('./usersData.json');
        const usersWithIds = response.default.users.map((user, index) => ({
          ...user,
          id: user.id || `user-${index}`,
          lastActive: user.lastActive || new Date().toLocaleDateString()
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

  // ... (keep all your existing filter and handler functions)


const toggleSidebar = () => {
  setSidebarOpen(!sidebarOpen);
};

const handleFilterChange = (e) => {
  const { name, value } = e.target;
  setFilters(prev => ({ ...prev, [name]: value }));
};

const resetFilters = () => {
  setFilters({
    search: '',
    role: 'All Roles',
    department: 'All Departments',
    status: 'All Statuses'
  });
};

const filterOptions = {
  roles: ['All Roles', 'Admin', 'Manager', 'Employee'],
  departments: ['All Departments', 'HR', 'IT', 'Finance'],
  statuses: ['All Statuses', 'Active', 'Inactive', 'Pending']
};

const handleRoleChange = (userId, newRole) => {
  const updatedUsers = users.map(user =>
    user.id === userId ? { ...user, role: newRole } : user
  );
  setUsers(updatedUsers);
  setFilteredUsers(updatedUsers);
};

const handleDeleteUser = (userId) => {
  if (window.confirm('Are you sure you want to delete this user?')) {
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setSuccessMessage('User deleted successfully');
    setTimeout(() => setSuccessMessage(''), 3000);
  }
};


  const toggleRowSelection = (userId) => {
    const newSelection = new Set(selectedRows);
    if (newSelection.has(userId)) {
      newSelection.delete(userId);
    } else {
      newSelection.add(userId);
    }
    setSelectedRows(newSelection);
  };

  const handleBulkDelete = () => {
    if (selectedRows.size === 0) return;
    if (window.confirm(`Are you sure you want to delete ${selectedRows.size} users?`)) {
      setUsers(prevUsers => prevUsers.filter(user => !selectedRows.has(user.id)));
      setSelectedRows(new Set());
      setSuccessMessage(`${selectedRows.size} users deleted successfully`);
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

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
            <div>
              <h1>User Management</h1>
              <p className="subtitle">Manage user accounts and permissions</p>
            </div>
            <div className="header-actions">
              <Link to="/usersManagement/add" className="add-user-btn">
                + Add User
              </Link>
            </div>
          </div>
          
          {successMessage && (
            <div className="success-message">
              {successMessage}
              <button onClick={() => setSuccessMessage('')} className="dismiss-btn">
                <FiX />
              </button>
            </div>
          )}
          
          <div className="filters-container">
            <div className="search-container">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                className="search-input"
              />
              {filters.search && (
                <button 
                  onClick={() => setFilters({...filters, search: ''})}
                  className="clear-search"
                >
                  <FiX />
                </button>
              )}
            </div>
            
            <div className="filter-group">
              <div className="filter-select-container">
                <label>Role</label>
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
                <FiChevronDown className="select-arrow" />
              </div>
              
              <div className="filter-select-container">
                <label>Department</label>
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
                <FiChevronDown className="select-arrow" />
              </div>
              
              <div className="filter-select-container">
                <label>Status</label>
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
                <FiChevronDown className="select-arrow" />
              </div>
            </div>

            <div className="filter-actions">
              <button onClick={resetFilters} className="reset-filters">
                <FiRefreshCw /> Reset
              </button>
              {selectedRows.size > 0 && (
                <button onClick={handleBulkDelete} className="bulk-delete-btn">
                  <FiTrash2 /> Delete Selected ({selectedRows.size})
                </button>
              )}
            </div>
          </div>
          
          <div className="users-table-container">
            <div className="table-responsive">
              <table className="users-table">
                <thead>
                  <tr>
                    <th className="checkbox-cell">
                      <input 
                        type="checkbox" 
                        checked={selectedRows.size === filteredUsers.length && filteredUsers.length > 0}
                        onChange={() => {
                          if (selectedRows.size === filteredUsers.length) {
                            setSelectedRows(new Set());
                          } else {
                            setSelectedRows(new Set(filteredUsers.map(user => user.id)));
                          }
                        }}
                      />
                    </th>
                    <th>User</th>
                    <th>Role</th>
                    <th>Department</th>
                    <th>Status</th>
                    <th>Last Active</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => (
                      <tr 
                        key={user.id} 
                        className={`table-row ${selectedRows.has(user.id) ? 'selected' : ''}`}
                      >
                        <td className="checkbox-cell">
                          <input 
                            type="checkbox" 
                            checked={selectedRows.has(user.id)}
                            onChange={() => toggleRowSelection(user.id)}
                          />
                        </td>
                        <td>
                          <div className="user-info">
                            <div className="user-avatar">
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="user-name">{user.name}</div>
                              <div className="user-email">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="role-select-container">
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
                            <FiChevronDown className="select-arrow" />
                          </div>
                        </td>
                        <td>{user.department}</td>
                        <td>
                          <span className={`status-badge ${user.status.toLowerCase()}`}>
                            {user.status}
                          </span>
                        </td>
                        <td>{user.lastActive}</td>
                        <td>
                          <div className="action-buttons">
                            <Link to={`/usersManagement/edit/${user.id}`} className="edit-btn">
                              Edit
                            </Link>
                            <button 
                              onClick={() => handleDeleteUser(user.id)}
                              className="delete-btn"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="no-results-row">
                      <td colSpan="7">
                        <div className="no-results">
                          <div className="no-results-icon">
                            <FiSearch />
                          </div>
                          <p>No users found matching your filters</p>
                          <button onClick={resetFilters} className="reset-filters-btn">
                            Reset Filters
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {filteredUsers.length > 0 && (
              <div className="table-footer">
                <div className="selected-count">
                  {selectedRows.size > 0 ? `${selectedRows.size} selected` : `${filteredUsers.length} users`}
                </div>
                <div className="pagination-controls">
                  <button className="pagination-btn" disabled>
                    Previous
                  </button>
                  <span className="page-info">Page 1 of 1</span>
                  <button className="pagination-btn" disabled>
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;