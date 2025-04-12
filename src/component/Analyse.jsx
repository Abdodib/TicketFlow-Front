import { useEffect, useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './dashboard.css';

const AnalyticsPage = () => {
  const [data, setData] = useState({
    metrics: [],
    monthlyTickets: [],
    responseTimes: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
        await new Promise(resolve => setTimeout(resolve, 800));
        const response = await import('./AnalyseData.json');
        setData(response.default || response);
      } catch (err) {
        setError(err.message);
        console.error("Failed to load data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (loading) return (
    <div className="loading-state">
      <div className="spinner"></div>
      <p>Loading analytics data...</p>
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
        <div className="analytics-content">
          
          
          <header className="dashboard-header">
            <div className="header-content">
              <h1>Analytics Dashboard</h1>
              <p>Track and analyze ticket performance metrics</p>
            </div>
          </header>

          <section className="metrics-section">
            <h2 className="section-title">Key Metrics</h2>
            <div className="metrics-grid">
              {data.metrics?.map((metric, index) => (
                <div key={index} className="metric-card">
                  <div className="metric-header">
                    <h3>{metric.title}</h3>
                    <span className={`trend ${metric.change.startsWith('+') ? 'positive' : 'negative'}`}>
                      {metric.change}
                    </span>
                  </div>
                  <div className="metric-value">{metric.value}</div>
                  {metric.comparison && (
                    <div className="metric-comparison">
                      vs {metric.comparison} last period
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="charts-section">
            <h2 className="section-title">Trend Analysis</h2>
            
            <div className="chart-container">
              <div className="chart-card">
                <div className="chart-header">
                  <h3>Tickets by Month</h3>
                  <p>Number of tickets submitted each month</p>
                </div>
                <div className="chart-wrapper">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data.monthlyTickets || []}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis 
                        dataKey="month" 
                        tick={{ fill: '#6b7280' }}
                        axisLine={false}
                      />
                      <YAxis 
                        tick={{ fill: '#6b7280' }}
                        axisLine={false}
                      />
                      <Tooltip 
                        contentStyle={{
                          background: '#ffffff',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Legend />
                      <Bar 
                        dataKey="count" 
                        fill="#6366f1" 
                        radius={[4, 4, 0, 0]}
                        name="Ticket Count"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="chart-card">
                <div className="chart-header">
                  <h3>Average Response Time</h3>
                  <p>Average time to first response in hours</p>
                </div>
                <div className="chart-wrapper">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data.responseTimes || []}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis 
                        dataKey="month" 
                        tick={{ fill: '#6b7280' }}
                        axisLine={false}
                      />
                      <YAxis 
                        tick={{ fill: '#6b7280' }}
                        axisLine={false}
                      />
                      <Tooltip 
                        contentStyle={{
                          background: '#ffffff',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Legend />
                      <Bar 
                        dataKey="hours" 
                        fill="#10b981" 
                        radius={[4, 4, 0, 0]}
                        name="Response Hours"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;