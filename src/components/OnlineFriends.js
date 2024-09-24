import React from 'react'

//destructure passUserData from RightSidebar.js and pass as a props
const OnlineFriends = ({passUserData}) => {
    
    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <>

            {/* online friends */}
            <div>

                <div className='space-y-5 mt-5'>

                    <div className='flex items-center space-x-5'>
                        <img src={publicFolder + passUserData.profilePicture} className='h-14 w-14 rounded-full relative' />
                        <div className='bg-green-600 h-4 w-4 rounded-full absolute -translate-y-6 translate-x-3 border-2 border-white'></div>
                        <span>{passUserData.username}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OnlineFriends
