import React from 'react'
import OnlineFriends from './OnlineFriends'
import {AllUsers} from '../dummyData'

const RightSidebar = () => {
  return (
    <>
      <div className='w-2/5  mt-5 space-y-5'>

        {/* birthday updates */}
        <div className='flex items-center px-3 space-x-2'>
          <i className="fa-solid fa-gift text-green-600 text-4xl"></i>
          <p><span className='font-bold'>Pola Foster</span> and <span className='font-bold'>3 Other friends </span> have a birthday today </p>
        </div>

        {/* advertisment */}
        <img src='../assets/post/5.jpeg' className='w-full h-auto rounded-md' />

        {/* online friends */}
        <h1 className='font-bold'>Online Friends</h1>

        {
          AllUsers.map((curUser) =>
          {
            return <OnlineFriends key={curUser.id} passUserData={curUser} />

          })
        }

      </div>

    </>
  )
}

export default RightSidebar