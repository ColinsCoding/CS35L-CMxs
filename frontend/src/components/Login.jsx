// frontend/src/components/Login.jsx

import React, { useState } from "react";
import { LoginInput } from "./";
import { FaEnvelope, FaLock, FaArrowLeft } from "react-icons/fa";
import { LoginBg } from "../assets";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupMessage, setSignupMessage] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/routes/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: signupEmail, username: signupUsername, password: signupPassword })
      });
      
      const data = await response.json();
      console.log(data);
  
      if (response.ok) {
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
      const response = await fetch('http://localhost:4000/routes/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: userEmail, password: password })
      });
      
      const data = await response.json();
      console.log(data);
      
      if (response.ok) {
        setLoginMessage(data.message || 'Login successful');
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
    <div
      className="w-full h-screen bg-cover absolute top-0 left-0"
      style={{ backgroundImage: `url(${LoginBg})` }}
    >
      {/* Return Button */}
      <NavLink to={"/"}>
        <button className="">
          <FaArrowLeft className="text-4xl" />
        </button>
      </NavLink>

      <div className="flex items-center justify-center relative overflow-hidden">
        <div className="w-98 p-12 bg-slate-100 bg-opacity-90 shadow-md rounded-md mt-20">
          {/* Content box */}
          <h2 className="text-3xl text-center font-bold mb-4">
            Pixel Art Editor
          </h2>

          <div className="flex flex-col items-center bg-lightOverlay w-full h-full z-10 backdrop-blur-md p-4 px-4 py-12 gap-6">
            {/* Welcome */}
            {!isSignUp && (
              <p className="text-2xl font-semibold text-headingColor">
                Welcome Back
              </p>
            )}
            <p className="text-xl text-textColor -mt6">
              {isSignUp ? "Sign up" : "Sign in"} with the following
            </p>

            {/* Inputs */}
            <div className="w-full flex rounded-md flex-col items-center justify-center gap-6 px-4 md:px-12 py-4">
              {isSignUp && (
                <>
                  <input
                    placeholder="Email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    type="email"
                    className="border-2 border-gray-300 px-3 py-2 rounded-md w-full"
                  />
                  <input
                    placeholder="Username"
                    value={signupUsername}
                    onChange={(e) => setSignupUsername(e.target.value)}
                    type="text"
                    className="border-2 border-gray-300 px-3 py-2 rounded-md w-full"
                  />
                  <input
                    placeholder="Password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    type="password"
                    className="border-2 border-gray-300 px-3 py-2 rounded-md w-full"
                  />
                </>
              )}
              {!isSignUp && (
                <>
                  <input
                    placeholder="Email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    type="email"
                    className="border-2 border-gray-300 px-3 py-2 rounded-md w-full"
                  />
                  <input
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="border-2 border-gray-300 px-3 py-2 rounded-md w-full"
                  />
                </>
              )}
            </div>

            <div className="text-sm text-left">
              {!isSignUp ? (
                <p>
                  or{" "}
                  <button
                    className="text-blue-500 underline focus:outline-none"
                    onClick={() => setIsSignUp(true)}
                  >
                    Create one
                  </button>
                </p>
              ) : (
                <p>
                  or{" "}
                  <button
                    className="text-blue-500 underline focus:outline-none"
                    onClick={() => setIsSignUp(false)}
                  >
                    Sign-in here
                  </button>
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md focus:outline-none"
              onClick={isSignUp ? handleSignup : handleLogin}
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>

            {/* Show Signup/Login Messages */}
            {signupMessage && <p>{signupMessage}</p>}
            {loginMessage && <p>{loginMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
