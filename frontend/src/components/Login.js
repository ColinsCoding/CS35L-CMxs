import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/login.css'; 

function Login() {
  return (
    <div>
      <h1>Sign Up or Login</h1>
      <hr />
      <div id="konten">
      <Link to="/" style={{ position: 'absolute', top: '10px', left: '20px' }}>Back</Link>
        <div className="signup">
          <h3>Sign Up</h3>
          <form action="/register" method="post">
            <input type="email" name="email" placeholder="Email" required />
            <input type="text" name="username" placeholder="Username" required />
            <input type="password" name="password" placeholder="Password" required />
            <input type="password" name="passwordConf" placeholder="Confirm Password" required />
            <input type="submit" value="Register" />
          </form>
        </div>
        <div className="login">
          <h3>Login</h3>
          <form action="/login" method="post">
            <input type="email" name="logemail" placeholder="Email" required />
            <input type="password" name="logpassword" placeholder="Password" required />
            <input type="submit" value="Login" />
          </form>
        </div>
      </div>
      <br /><hr />
    </div>
  );
}

export default Login;
