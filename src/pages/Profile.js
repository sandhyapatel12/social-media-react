import React, { useEffect, useState } from 'react'
import LeftSidebar from '../components/LeftSidebar'
import Feed from '../components/Feed'
import UserRightSidebar from '../components/UserRightSidebar'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useCustomAuth } from '../context/AuthContext'

const Profile = () => {

  //usestate for get user data
  const [user, setUser] = useState({});

  //destructure user from useCustomAuth which includes at AuthContext
  //here  user already defined so declare user as a current User
  const { user: currentUser, dispatch } = useCustomAuth();  //user includes all user data

  // const [followed, setfollowed] = useState('');


  //useParams allows you to access the dynamic parameters from the current URL.
  //here username is assigned at backend folder use through useParams we can access username
  const username = useParams().username;

  //in this store image path
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchUser = async () => {
      //fetch user data and user's all posts
      const response = await axios.get(`/users?username=${username}`);
      setUser(response.data);
    };
    fetchUser();
  }, [username]);

  // for follow unfollow users
  // useEffect(() => {
  //   setfollowed(user.following.includes(user?.id))
  // }, [user, user.id])

  //  handleClick for follow unfollow user
  // const handleClick = async () => {
  //   try {
  //     if (followed) {
  //       await axios.put(`/users/${user._id}/unfollow`, {userId: currentUser._id,});
  //       dispatch({ type: "UNFOLLOW", payload: user._id });
  //     } 
  //     else {
  //       await axios.get(`/users/${user._id}/follow`, {userId: currentUser._id,});
  //       dispatch({ type: "FOLLOW", payload: user._id });
  //     }
  //     setfollowed(!followed);
  //   } 
  //   catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <>
      <Navbar />

      <div className='max-w-7xl  mx-auto flex'>
        <LeftSidebar />

        <div>

          <div className=' w-full my-5 mx-5 '>

            {/* user profile */}
            <div >
              {/* // if user has coverPicture then display user coverPicture otherwise display avtar(blank coverPicture) */}
              <img src={user.coverPicture ? publicFolder + user.coverPicture : publicFolder + "person/noCover.png"} className='w-full h-72  ' />

              <div className='flex flex-col items-center justify-center -mt-20  '>

                {/* // if user has profilePicture then display user profilePicture otherwise display avtar(blank coverPicture) */}
                <img src={user.profilePicture ? publicFolder + user.profilePicture : publicFolder + "person/noAvatar.png"} className='h-40 w-40 rounded-full    border-2 border-white ' />
                <h1 className='text-2xl font-extrabold'>{user.username}</h1>
                <p className='text-lg'>{user.desc}</p>
              </div>
            </div>

            {/* display user followers and following   */}
            <div className='flex items-center justify-center space-x-5 mt-10'>
              <h1 className='bg-green-500 px-10 py-2 rounded-md text-white shadow-md w-fit font-bold'>Followers : <span className='font-bold'>{user.followers?.length}</span></h1>  {/*here ? is needed otherwise our error  (this checks if the array is empty or if a value exists ) */}
              <h1 className='bg-blue-500 px-10 py-2 rounded-md text-white shadow-md w-fit font-bold'>Followings : <span className='font-bold'>{user.following?.length}</span></h1>
            </div>


            {/* follow button    */}
            {/* if username is that which through user logged in then display not display follow button otherwise display */}
            {/* if user open their friends profile then  display follow button */}
            {/* {user.username !== currentUser.username &&
              (
                <div className='flex items-center justify-center mt-5'>
                  <button
                    className='bg-black px-10 py-2 rounded-md text-gray-300 font-bold shadow-md '
                    onClick={handleClick}>
                    {followed ? "UnFollow " : "Follow +"}
                  </button>
                </div>
              )} */}

            {/* {user.username !== currentUser.username && (
              <button className="rightbarFollowButton" onClick={handleClick}>
                {followed ? "Unfollow" : "Follow"}
              </button>
            )} */}

          </div>

          <div className='flex'>

            {/* user posts */}
            <Feed username={username} /> {/* passing username as a props to Feed.js file */}

            {/* if username is that which through user logged in then display share section otherwise not */}
            {/* if user open their friends profile then not display share option */}
            {username === currentUser.username ? <UserRightSidebar /> : ""}

          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
