import React, { useEffect, useState } from 'react'
import Friends from './Friends'
import axios from 'axios'
import { useCustomAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import UpdateUser from './UpdateUser';


const UserRightSidebar = () => {

    //destructure user from useCustomAuth which includes at AuthContext
    //here  user already defined so declare user as a current User
    const { user } = useCustomAuth();  //user includes all user data

    //usestate for get user friends
    const [friends, setfriends] = useState([])

    

    //in this store image path
    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

    

// for get user's friends
    useEffect(() => {
        const getFriends = async () => {
            try {
                //fetch user frinends using axios
                //here axios.get(method) is depends on backend in rounter folder where all routers create
                const response = await axios.get("/users/friends/" + user._id)      //user._id specify that which user's friends want to get
                setfriends(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        getFriends()
    }, [user])



 

    return (
        <>
            <div className='w-2/5 flex flex-col mt-5 space-y-5'>

            <UpdateUser />

                {/* user's followings friends list */}
                <h1 className='font-extrabold text-center text-lg'>My Friends</h1>

                <div className='grid grid-cols-2 gap-3'>


                    {friends.map((curFriend, index) => {
                        return <Link key={index} to={'/profile/' + curFriend.username}>

                            <div  className='flex flex-col items-center justify-center  space-x-5'>
                                {/* // if user has profilePicture then display user profilepicture otherwise display avtar(blank picture) */}
                                <img
                                    src={curFriend.profilePicture ? publicFolder + curFriend.profilePicture : publicFolder + 'person/noAvatar.png'}
                                    className='w-28 h-28 rounded-md' />
                                <span className=''>{curFriend.username}</span>
                            </div>
                        </Link>
                    })
                    }

                </div>


            </div>

        </>
    )
}

export default UserRightSidebar