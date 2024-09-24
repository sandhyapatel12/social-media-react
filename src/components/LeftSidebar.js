import React from 'react'
import CloseFriends from './CloseFriends'
import { AllUsers } from '../dummyData'

const LeftSidebar = () => {
    return (
        <>
            <div className='sticky top-16 z-10 overflow-y-scroll w-2/5 h-screen pb-24 pt-5 px-5'>
                <div className='space-y-5 '>
                    <div className=' space-x-5 text-md flex items-center '>
                        <i className="fa-solid fa-rss"></i>
                        <h1>Feed</h1>
                    </div>

                    <div className=' space-x-5 text-md flex items-center'>
                        <i className="fa-brands fa-rocketchat"></i>
                        <h1>Chats</h1>
                    </div>

                    <div className=' space-x-5 text-md flex items-center'>
                        <i className="fa-solid fa-video"></i>
                        <h1>Videos</h1>
                    </div>

                    <div className=' space-x-5 text-md flex items-center'>
                        <i className="fa-solid fa-user-group"></i>
                        <h1>Groups</h1>
                    </div>

                    <div className=' space-x-5 text-md flex items-center'>
                        <i className="fa-solid fa-bookmark"></i>
                        <h1>Bookmarks</h1>
                    </div>

                    <div className=' space-x-5 text-md flex items-center'>
                        <i className="fa-solid fa-clipboard-question"></i>
                        <h1>Questions</h1>
                    </div>

                    <div className=' space-x-5 text-md flex items-center'>
                        <i className="fa-solid fa-user-doctor"></i>
                        <h1>Jobs</h1>
                    </div>

                    <div className=' space-x-5 text-md flex items-center'>
                        <i className="fa-regular fa-calendar"></i>
                        <h1>Events</h1>
                    </div>

                    <div className=' space-x-5 text-md flex items-center'>
                        <i className="fa-solid fa-graduation-cap"></i>
                        <h1>Courses</h1>
                    </div>

                    <button className='bg-gray-600 px-5 py-2 text-white rounded-sm w-full'>Show More</button>

                    <div className='border border-b-gray-400'></div>

                    {/* close friends list */}
                    {
                        AllUsers.map((curUser) => {
                             return <CloseFriends key={curUser.id} sendUser={curUser} />  //passing curUser using props

                        })
                    }


                </div>
            </div>
        </>
    )
}

export default LeftSidebar
