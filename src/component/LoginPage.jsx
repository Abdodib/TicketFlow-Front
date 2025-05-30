import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/employerDash');
  };
  const handleowner = (e) => {

    e.preventDefault();
    navigate('/admin');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="welcome-text">Welcome</h1>
        <form className="login-form" onSubmit={handleLogin}>
          <h2 className="login-title">Login</h2>
          
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              className="password-input"
              placeholder="Enter your password"
            />
          </div>
<div className="btns"></div>
          <button type="submit" className="login-button">
            Login
          </button>
<button  className='login-button' onClick={ handleowner}>login as owner </button>

        </form>
      </div>
    </div>
  );
};

export default Login;