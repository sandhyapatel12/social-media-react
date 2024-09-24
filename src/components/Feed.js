import React, { useEffect, useState } from 'react'
import Share from './Share'
import Post from './Post'
import axios from 'axios'
import { useCustomAuth } from '../context/AuthContext'

//destructure username from Profile.js
const Feed = ({ username }) => {
  
  //destructure user from useCustomAuth which includes at AuthContext
  const { user, dispatch } = useCustomAuth(); //user includes all user data

  //usestate for fetch post from timeline which is in  backend 
  const [post, setpost] = useState([])

  //usestate for follow user
  // const [followed, setfollowed] = useState(user.following.includes(user?.id))



  //useEffect for fetch all post
  useEffect(() => {
    const fetchPost = async () => {
      //if return username then display user's all posts otherwise display timeline post(in which includes user followings friend posts)
      const response = username ? await axios.get("/posts/profile/" + username) : await axios.get("posts/timeline/" + user._id)  //user._id includes all user id come from backend posts model
      //set updated data which get through api

      //sorting of post (last post will be first and first post will be last)
      setpost(
        response.data.sort((postFirst, postLast) => {
          return new Date(postLast.createdAt) - new Date(postFirst.createdAt)
        })
      )
    }
    fetchPost();
  }, [username, user._id])




  // //  handleClick for follow unfollow user
  // const handleFollow = async () => {
  //   try {
  //     if (followed) {
  //       await axios.put("/users/" + user._id + "/unfollow", { userId: user._id })
  //       dispatch({ type: "UNFOLLOW", payload: user._id })
  //     }
  //     else {
  //       await axios.put("/users/" + user._id + "/follow", { userId: user._id })
  //       dispatch({ type: "FOLLOW", payload: user._id })
  //     }
  //     setfollowed(!followed)

  //   } catch (error) {
  //     console.log("follow error", error);

  //   }
  // }

  return (
    <>
      <div className=' w-full mt-5'>

        {/* if username is that which through user logged in then display not display follow button otherwise display */}
        {/* if user open their friends profile then  display follow button */}
        {/* {username !== user.username &&
          (
            <div className='flex items-center justify-center'>
              <button
                className='bg-blue-700 px-10 py-2 rounded-md text-white shadow-md '
                onClick={handleFollow}>
                {followed ? "UnFollow " : "Follow +"}
              </button>
            </div>
          )} */}

        <div>
         {/* if username is that which through user logged in then display share section otherwise not */}
          {/* if user open their friends profile then not display share option */}
          {(!username || username === user.username) ? <Share /> : ""}
          {/* fetch which posts which is posted by user and user followings which is at database in users (user followers post are not fetch)  */}
          {
            post.map((curPost, index) => {
              return <Post key={index} post={curPost} />  //passing curPost as a props into Posts.js
            })
          }
        </div>
      </div>
    </>
  )
}

export default Feed
