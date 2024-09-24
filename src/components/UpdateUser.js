import React from 'react'
import { useCustomAuth } from '../context/AuthContext';

const UpdateUser = () => {

  //destructure user from useCustomAuth which includes at AuthContext
  const { user } = useCustomAuth(); //user includes all user data
  return (
    <>
      <div className=' mb-10 space-y-5'>
        <h1 className='text-lg font-extrabold text-center'>My Profile</h1>
        <div className='flex  bg-gray-2100 rounded-md shadow-xl px-5 py-4 flex-col space-y-3'>
          <h1><span className='font-bold'>Name :</span> {user.username}</h1>
          <h1><span className='font-bold'>Email :</span> {user.email}</h1>
          <h1><span className='font-bold'>city :</span> {user.city}</h1>
          {/* {user.city && <h1><span className='font-bold'>City :</span> {user.city}</h1>}
          {user.city && <h1><span className='font-bold'>Status :</span> {user.desc}</h1>} */}
          {/* <h1><span className='font-bold'>Email :</span> {user.password}</h1> */}
        </div>
      </div>

    </>
  )
}

export default UpdateUser