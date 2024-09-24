import React, { useRef } from 'react';
import { useCustomAuth } from '../context/AuthContext';
import { CircularProgress } from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

  //destructure logincall from useCustomAuth which includes at AuthContext
  const { isFetching, dispatch } = useCustomAuth();

//UseRef for create reference
  const email = useRef()
  const password = useRef()
  
    const loginCall = async (userCredentials, dispatch) => {
        dispatch({ type: "LOGIN_START" })

        try {
            // starting path of api includes at package,json in proxy string http://localhost:5000/api
            const response = await axios.post("/auth/login", userCredentials)
         dispatch({ type: "LOGIN_SUCCESS", payload: response.data });     //if login sucess then send response(response.data includes user data)
            console.log("data", response.data);

          } catch (error) {
            dispatch({ type: "LOGIN_FAILURE", payload: error });
        }

  }

  const handleClick = (e) => {

    e.preventDefault();  //page can't reload

    //in loginCall store new email and password data
    loginCall({ email: email.current.value, password: password.current.value }, dispatch)  //in loginCall function we fetch apidata through dispatch

  }
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white shadow-md">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form onSubmit={handleClick} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm">Email</label>
            <input
              maxLength={50}
              ref={email}
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm">Password</label>
            <input
              ref={password}
              minLength={6}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <button className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
            {/* if login process is running then display loader */}
            {isFetching ? <CircularProgress /> : "Login"}
          </button>

          <NavLink to='/register' >
            <button className="w-full px-4 py-2 font-bold text-white bg-green-600 rounded-md hover:bg-indigo-700 mt-5">
              Create a new Account
            </button>
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default Login;
