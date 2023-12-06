import React, { useState, useEffect } from "react";
import { LoginInput } from "..";
import { FaEnvelope, FaLock, FaArrowLeft } from "react-icons/fa";
import { LoginBg } from "../../assets";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");

  const signUpWithEmailPass = async () => {};
  const signInWithEmailPass = async () => {};

  return (
    <div
      className="w-full h-screen bg-cover absolute top-0 left-0"
      style={{ backgroundImage: `url(${LoginBg})` }}
    >
      {/*Return Button*/}
      <NavLink to={"/"}>
        <button className="">
          <FaArrowLeft className="text-4xl" />
        </button>
      </NavLink>

      <div className="flex items-center justify-center relative overflow-hidden">
        <div className="w-98 p-12 bg-slate-100 bg-opacity-90 shadow-md rounded-md mt-20">
          {/*content box*/}
          <h2 className="text-3xl text-center font-bold mb-4">
            Pixel Art Editor
          </h2>

          <div className="flex flex-col items-center bg-lightOverlay w-full  h-full z-10 backdrop-blur-md p-4 px-4 py-12 gap-6">
            {/*Welcome */}
            {!isSignUp && (
              <p className="text-2xl font-semibold text-headingColor">
                Welcome Back
              </p>
            )}
            <p className="text-xl text-textColor -mt6">
              {isSignUp ? "Sign up" : "Sign in"} with the following
            </p>

            {/*Inputs */}
            <div className="w-full flex rounded-md flex-col items-center justify-center gap-6 px-4 md:px-12 py-4">
              <LoginInput
                placeHolder="Email Here"
                icon={<FaEnvelope className="text-xl" />}
                inputState={userEmail}
                inputStateFunc={setUserEmail}
                type="email"
                isSignUp={isSignUp}
              />

              <LoginInput
                placeHolder="Password Here"
                icon={<FaLock className="text-xl" />}
                inputState={password}
                inputStateFunc={setPassword}
                type="password"
                isSignUp={isSignUp}
              />

              {isSignUp && (
                <LoginInput
                  placeHolder="Confirm Password Here"
                  icon={<FaEnvelope className="text-xl" />}
                  inputState={confirm_password}
                  inputStateFunc={setConfirm_password}
                  type="password"
                  isSignUp={isSignUp}
                />
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

            {/*Submit Button */}
            <button
              className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md focus:outline-none"
              onClick={isSignUp ? signUpWithEmailPass : signInWithEmailPass}
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
