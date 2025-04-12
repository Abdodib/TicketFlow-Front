import { Link } from 'react-router-dom';
import './dashboard.css';

const Sidebar = ({ navItems, isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${!isOpen ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {isOpen && <h1 className="app-title">TaskerFlow</h1>}
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          {isOpen ? '◀' : '▶'}
        </button>
      </div>
      
      <div className="section">
        {isOpen && <h2 className="section-title">Menu</h2>}
        <ul className="nav-menu">
          {navItems.map((item, index) => (
            <li key={index} className="nav-item">
              <Link 
                to={item.path}
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                <span className="nav-icon">{item.icon}</span>
                {isOpen && <span className="nav-text">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;