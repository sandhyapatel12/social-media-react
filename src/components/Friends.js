import React from 'react'
import { Link } from 'react-router-dom';

//destructure passUserFriends from UserRightSidebar.js and pass as a props
const Friends = ({ passUserFriends }) => {
    

    //in this store image path
    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <>
            {/* user's frineds list */}
            
                <div className=' space-y-5 mt-5'>
                <Link to={'/profile/' + passUserFriends.username}>

                    <div className='flex flex-col items-center justify-center  space-x-5'>
                        {/* // if user has profilePicture then display user profilepicture otherwise display avtar(blank picture) */}
                        <img 
                        src={passUserFriends.profilePicture ? publicFolder + passUserFriends.profilePicture : publicFolder + 'person/noAvatar.png'}
                        className='w-28 h-28 rounded-md' />
                        <span className=''>{passUserFriends.username}</span>
                    </div>
                </Link>

                </div>
        </>
    )
}

export default Friends
