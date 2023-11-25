import React, { useState, useEffect } from "react";
import { LoginInput } from "./";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const [password, setPassword] = useState("second");
  const [confirm_password, setConfirm_password] = useState("");

  const signUpWithEmailPass = async () => {};
  const signInWithEmailPass = async () => {};

  return (
    <div>
      {/*content box*/}
      <p>Pixel Art Editor</p>

      {/*Welcome */}
      <p className="">Welcome Back</p>
      <p className="">{isSignUp ? "Sign up" : "Sign in"} with the following</p>

      {/*Inputs */}
      <div className="">
        <LoginInput
          placeHolder="Email Here"
          inputState={userEmail}
          inputStateFunc={setUserEmail}
          type="email"
          isSignUp={isSignUp}
        />

        <LoginInput
          placeHolder="Password Here"
          inputState={password}
          inputStateFunc={setPassword}
          type="password"
          isSignUp={isSignUp}
        />

        {isSignUp && (
          <LoginInput
            placeHolder="Confirm Password Here"
            inputState={confirm_password}
            inputStateFunc={setConfirm_password}
            type="password"
            isSignUp={isSignUp}
          />
        )}

        {!isSignUp ? (
          <p>
            Don't have an account:{" "}
            <button className="" onClick={() => setIsSignUp(true)}>
              Create one
            </button>
          </p>
        ) : (
          <p>
            Already have an account:{" "}
            <button className="" onClick={() => setIsSignUp(false)}>
              Sign-in here
            </button>
          </p>
        )}

        {/*Submit Button */}
        {isSignUp ? (
          <button className="" onClick={signUpWithEmailPass}>
            Sign Up
          </button>
        ) : (
          <button onClick={signInWithEmailPass} className="">
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
