import React from 'react'
import { useNavigate } from 'react-router-dom' // ✅ استدعاء useNavigate

const Login = () => {
  const navigate = useNavigate(); // ✅ hook للتنقل

  const handleLogin = () => {
    
    navigate('/admin'); 
  };

  return (
    <div className='logindiv'>
      <h1 id='welcome'>Welcome</h1>
      <form className='loginform' onSubmit={(e) => e.preventDefault()}>
        <h2>Login</h2>

        <div className="mailinp">
          <label htmlFor='Email'>Email:</label>
          <input type="email" name="Email" id="Email" />
        </div>
        
        <br />

        <div className="mdpsinp">
          <div className='forget'>
            <label htmlFor=" password">Password:</label>
            <a href='' className='fomdps'> Forget Password?</a>
          </div>
          
          <input type="password" name="Password" id="Password" />  
        </div>

        <span className="loginbtn" onClick={handleLogin}>Login</span>
      </form>
    </div>
  )
}

export default Login
