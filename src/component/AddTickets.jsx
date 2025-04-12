import React, { useState } from 'react';
import { FiArrowLeft, FiPlus, FiUpload, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import './addTicket.css';

const AddTicket = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    category: 'Technical',
    attachments: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const removeAttachment = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Ticket submitted:', formData);
      setIsSubmitting(false);
      setSuccessMessage('Ticket created successfully!');
      setTimeout(() => {
        navigate('/my-tickets');
      }, 1500);
    }, 1000);
  };

  return (
    <div className="add-ticket-container">
      {/* Sidebar would be imported from your layout component */}
      
      <div className="main-content">
        <div className="header-section">
          <button className="back-button" onClick={() => navigate(-1)}>
            <FiArrowLeft /> Back
          </button>
          <h1>Create New Ticket</h1>
          <p className="subtitle">Fill out the form below to submit a new support ticket</p>
        </div>

        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="ticket-form">
          <div className="form-group">
            <label htmlFor="title">Ticket Title*</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Briefly describe your issue"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description*</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide detailed information about your issue"
              rows={6}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="priority">Priority*</label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                required
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="category">Category*</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="Technical">Technical</option>
                <option value="Hardware">Hardware</option>
                <option value="Software">Software</option>
                <option value="Network">Network</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Attachments</label>
            <div className="file-upload-area">
              <label htmlFor="file-upload" className="file-upload-label">
                <FiUpload className="upload-icon" />
                <span>Click to upload files</span>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="file-input"
                />
              </label>
              <p className="file-hint">Supports: JPG, PNG, PDF, DOC (Max 5MB each)</p>
            </div>

            {formData.attachments.length > 0 && (
              <div className="attachments-list">
                {formData.attachments.map((file, index) => (
                  <div key={index} className="attachment-item">
                    <span className="file-name">{file.name}</span>
                    <span className="file-size">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                    <button
                      type="button"
                      onClick={() => removeAttachment(index)}
                      className="remove-file"
                    >
                      <FiX />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="cancel-button"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-button"
            >
              {isSubmitting ? 'Submitting...' : 'Create Ticket'}
              {!isSubmitting && <FiPlus className="button-icon" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTicket;