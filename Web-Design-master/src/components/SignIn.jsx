import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";

const SignIn = () => {
  const emailRef = useRef();
  const passRef = useRef();
  const navigate=useNavigate()
  const buttonClickHandler = async (event) => {
    event.preventDefault()
    const emailval = emailRef.current.value;
    const passVal = passRef.current.value;
    console.log(emailval,passVal)
    if (emailval.includes("@") && passVal.length <= 5) {
      console.log("SS")
      const res = await fetch("http://127.0.0.1:8000/api/token/", {
        body: JSON.stringify({
          username: emailval,
          password: passVal,
        }),
        method: "POST",
        headers:{
          "Content-type":"application/json"
        }
      });
      const token = await res.json();
      console.log(token)
      if(token["detail"]){
        console.log("Not found")
      }
      else
      {localStorage.setItem("token", token["access"]);
      navigate("/homepage")}
    }
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-12 rounded space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white-900">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  ref={emailRef}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  ref={passRef}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium underline underline-offset-4 text-blue-600">
                  Forgot your password?
                </a>
              </div>
            </div>

          
              <button
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={buttonClickHandler}>
                Sign in
              </button>
          
            <div>
              <Link
                to="/signup"
                className="group relative w-full flex justify-center underline underline-offset-4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-blue-600">
                Create an Account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
