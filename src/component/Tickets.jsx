import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TicketsPage.css';

const TicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    category: ''
  });

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await import('./tikii.json');
        setTickets(response.tickets || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const filteredTickets = tickets.filter(ticket => {
    // Search filter
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus = !filters.status || ticket.status === filters.status;
    
    // Priority filter
    const matchesPriority = !filters.priority || ticket.priority === filters.priority;
    
    // Category filter
    const matchesCategory = !filters.category || ticket.category === filters.category;

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  if (loading) return <div className="loading">Loading tickets...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="tickets-container">
      <div className="tickets-header">
        <h1>Tickets</h1>
        <div className="controls">
          <input
            type="text"
            placeholder="Search tickets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          
          <div className="filter-controls">
            <select 
              value={filters.status} 
              onChange={(e) => setFilters({...filters, status: e.target.value})}
              className="filter-select"
            >
              <option value="">All Statuses</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>

            <select 
              value={filters.priority} 
              onChange={(e) => setFilters({...filters, priority: e.target.value})}
              className="filter-select"
            >
              <option value="">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <select 
              value={filters.category} 
              onChange={(e) => setFilters({...filters, category: e.target.value})}
              className="filter-select"
            >
              <option value="">All Categories</option>
              <option value="IT">IT</option>
              <option value="Hardware">Hardware</option>
              <option value="Maintenance">Maintenance</option>
              <option value="HR">HR</option>
            </select>
          </div>
        </div>
      </div>

      <div className="tickets-list">
        {filteredTickets.length > 0 ? (
          filteredTickets.map(ticket => (
            <div key={ticket.id} className="ticket-card">
              <div className="ticket-header">
                <Link to={`/tickets/${ticket.id}`} className="ticket-id">{ticket.id}</Link>
                <span className={`priority ${ticket.priority.toLowerCase()}`}>
                  {ticket.priority}
                </span>
                <span className={`status ${ticket.status.toLowerCase().replace(' ', '-')}`}>
                  {ticket.status}
                </span>
              </div>
              <h3 className="ticket-title">{ticket.title}</h3>
              <div className="ticket-meta">
                <span className="category">{ticket.category}</span>
                <span className="assignee">Assignee: {ticket.assignee || 'Unassigned'}</span>
                <span className="created">Created: {ticket.created}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">No tickets found matching your criteria</div>
        )}
      </div>
    </div>
  );
};

export default TicketsPage;