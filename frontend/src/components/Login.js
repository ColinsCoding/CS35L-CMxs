// frontend/src/components/Login.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/login.css'; 

function Login() {
  const [signupEmail, setSignupEmail] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  const [signupMessage, setSignupMessage] = useState('');

  const [loginMessage, setLoginMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5555/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: signupEmail, username: signupUsername, password: signupPassword })
      });
      
      const data = await response.json();
      console.log(data);

      if (response.ok) {
      console.log(data);
      setSignupMessage('Sign up successful');
      setTimeout(() => {
        setSignupMessage('');
      }, 10000);
    } else {
      setSignupMessage(data.message || 'Sign up failed');
      setTimeout(() => {
        setSignupMessage('');
      }, 10000);
    }
  } catch (error) {
    console.error('Sign up failed:', error);
    setSignupMessage('Sign up failed');
    setTimeout(() => {
      setSignupMessage('');
    }, 10000);
  }
};


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5555/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });
      
      const data = await response.json();
      console.log(data);
      
      if (response.ok) {
        setLoginMessage('Login successful');
        setTimeout(() => {
          setLoginMessage('');
        }, 10000);
      } else {
        setLoginMessage(data.message || 'Login failed');
        setTimeout(() => {
          setLoginMessage('');
        }, 10000);
      }
    } catch (error) {
      console.error('Login failed:', error);
      setLoginMessage('Login failed');
      setTimeout(() => {
        setLoginMessage('');
      }, 10000);
    }
  };

  return (
    <div>
      <h1>Sign Up or Login</h1>
      <hr />
      <div className="message-container">
      {signupMessage && (
        <span className="bubble signup-bubble">{signupMessage}</span>
      )}
      {loginMessage && (
            <span className="bubble login-bubble">{loginMessage}</span>
          )}
    </div>
      <div id="konten">
        <Link to="/" style={{ position: 'absolute', top: '10px', left: '20px' }}>Back</Link>
        <div className="signup">
          <h3>Sign Up</h3>
          <form onSubmit={handleSignup}>
            <input
              type="email"
              name="signupEmail"
              placeholder="Email"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              required
            />
            <input
              type="text"
              name="signupUsername"
              placeholder="Username"
              value={signupUsername}
              onChange={(e) => setSignupUsername(e.target.value)}
              required
            />
            <input
              type="password"
              name="signupPassword"
              placeholder="Password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              required
            />
            <input type="submit" value="Sign Up" />
          </form>
        </div>
        <div className="login">
          <h3>Login</h3>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              name="loginEmail"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />
            <input
              type="password"
              name="loginPassword"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
            <input type="submit" value="Login" />
          </form>
        </div>
      </div>
      <br /><hr />
    </div>
  );
}

export default Login;
