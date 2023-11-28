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

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: signupEmail, username: signupUsername, password: signupPassword })
      });
      const data = await response.json();
      console.log(data); // Handle the response data as needed (e.g., display success message)
    } catch (error) {
      console.error('Sign up failed:', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });
      const data = await response.json();
      console.log(data); // Handle the response data as needed (e.g., redirect on successful login)
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <h1>Sign Up or Login</h1>
      <hr />
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
            <input type="submit" value="Register" />
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
