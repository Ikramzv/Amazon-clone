import React from "react";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "../AppState/AppState";
import { actionTypes } from "../AppState/reducer";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate("");
  const [{ user }, dispatch] = useStateValue();

  const signIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        if (result) {
          dispatch({
            type: actionTypes.SET_USER,
            user: result.user,
          });
          navigate("/");
        }
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="flex h-screen bg-white flex-col items-center pt-10">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
        alt="logo"
        className="w-[150px] object-contain"
      />
      <div className="w-[300px] md:w-[400px] h-fit border border-gray-200 rounded-md p-2 mt-4">
        <h1 className="font-semibold text-[32px] text-center ">Sign in</h1>
        <form className="flex flex-col gap-3 p-2">
          <div className="flex flex-col gap-1">
            <label>Email</label>
            <input
              type={"email"}
              placeholder="Your email"
              className="border border-black px-2 py-1 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Password</label>
            <input
              type={"password"}
              placeholder="Your password"
              className="border border-black px-2 py-1 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="amazon-btn border border-[#a88734 #9c7e31 #846a29] h-8 mt-3 w-full"
            onClick={signIn}
          >
            Sign in
          </button>
        </form>
        <p className="text-center text-sm font-semibold">
          By signing-in you agree to Amazon's Conditions of Use & Sale. Please
          see our Privacy Notice , our Cookies Notice and our Interest-Bases Ads
          Notice
        </p>
        <Link to={"/register_account"}>
          <button className="w-full text-center border border-gray-600 text-base bg-gray-300 mt-3 mb-1 hover:bg-gray-200 duration-300 rounded-md">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
