import React from 'react'
import { BrowserRouter as Router, Routes, Route,redirect, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import { useCustomAuth } from './context/AuthContext';


const App = () => {

  //destructure user from useCustomAuth which includes at AuthContext
  const { user } = useCustomAuth();   //user includes all user data

  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={user ? <Home /> : <Login />} />  {/* if user want to go home page if that user logged in then goto home otherwise goto Login */}
          <Route path='/profile/:username' element={<Profile />} />
          <Route path='/login' element={user ? <Navigate to='/' /> : <Login />} />  {/* if user want to go login page if that user logged in then redirect home page otherwise login */}
          <Route path='/register' element={<Register />} />   {/* if user want to go register page if that user alredy registered  then goto home otherwise goto register */}
        </Routes>
      </Router>
    </>
  )
}

export default App
