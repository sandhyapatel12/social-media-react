import React from 'react'

const CloseFriends = ({ sendUser }) => {

  //in this store default image path
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <>
      <div className='friendList space-y-3'>
        <div className='flex items-center space-x-5'>
          <img src={publicFolder + sendUser.profilePicture} className='h-14 w-14 rounded-full' />
          <span>{sendUser.username}</span>
        </div>
      </div>
    </>
  )
}

export default CloseFriends