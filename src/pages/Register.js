import axios from 'axios';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  //useref for create reference
  const username = useRef()
  const email = useRef()
  const password = useRef()

  //useNavigate hook for redirect page
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();  //page can't reload

    //stores new user data
    const user =
    {
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
    }

    try {
      //fetch new user data
      await axios.post("/auth/register", user)

      //if register sucess then redirect at login page
      navigate('/login')
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white shadow-md">
        <h1 className="text-2xl font-bold text-center">Register</h1>
        <form onSubmit={handleClick} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm">Name</label>
            <input
              ref={username}
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm">Email</label>
            <input
              ref={email}
              maxLength={50}
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
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
