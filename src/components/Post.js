import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import TimeAgo from 'timeago-react'; // const TimeAgo = require('timeago-react');
import { useCustomAuth } from '../context/AuthContext';


//destructure post from Feed.js which define in map function
const Post = ({ post }) => {

    //usestate for set likes on post
    const [like, setlike] = useState(post.likes.length)  //default set already likes numbers (here likes is come from database which is added at posts folder)
    const [isLiked, setisLiked] = useState(false)  //set already like button false

    //usestate for get user data
    const [user, setuser] = useState({})

    //destructure user from useCustomAuth which includes at AuthContext
    //here above user already defined so declare user as a current User
    const { user: currentUser } = useCustomAuth(); //user includes all user data

    //in this store default image path
    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

    //not understand
    // useEffect(() => {
    //     setisLiked(post.likes.includes(currentUser._id));
    //   }, [currentUser._id, post.likes]);

    useEffect(() => {
        const fetchPost = async () => {

            {/* fetch which posts which is posted by user and user followings which is at database in users (user followers post are not fetch)  */ }
            const response = await axios.get(`/users/?userId=${post.userId}`)
            setuser(response.data);
        }
        fetchPost();
    }, [post.userId])

    const likeHandler = () => {

        try {
            //post._id define that person id which person want to like post
            axios.put("/posts/" + post._id + "/likedislike", { userId: currentUser._id })
        } catch (error) {

        }
        //if we already like post then like - 1 oherwise like + 1
        setlike(isLiked ? like - 1 : like + 1)
        setisLiked(!isLiked) //if it is not true then isLiked work
    }

    return (
        <>
            <div className='mt-10 mx-5 '>

                <div className='bg-white shadow-xl rounded-md px-5 space-y-3 py-5'>

                    {/* post navbar */}
                    <div className='flex items-center justify-between'>

                        <div className='flex items-center space-x-4'>

                            {/* when user click on profile picture redirect at that user profile page */}
                            <Link Link to={`/profile/${user.username}`} className='flex items-center space-x-4'>
                                <img
                                    // if user has profilePicture then display user profilepicture otherwise display avtar(blank picture)
                                    src={user.profilePicture ? publicFolder + user.profilePicture : publicFolder + 'person/noAvatar.png'}
                                    className='h-14 w-14 rounded-full' />

                                <h1 className='font-bold'>
                                    {user.username}
                                </h1>
                            </Link>


                            <p className='text-sm'>{<TimeAgo datetime={post.createdAt} />}</p>
                        </div>

                        <div>
                            <button><i className="fa-solid fa-ellipsis-vertical font-bold"></i></button>
                        </div>

                    </div>

                    {/* post headline */}
                    <h1>{post?.desc}</h1>

                    {/* post image */}
                    <img src={publicFolder + post.img} className='w-full h-auto' />

                    {/* post footer */}
                    <div className='flex space-x-2 items-center'>
                        <button>
                            <i className="fa-solid fa-comment text-green-700 text-xl"></i>
                        </button>

                        <button onClick={likeHandler}>
                            <i className="fa-solid fa-heart text-red-600 text-xl"></i>
                        </button>
                        <p className='font-semibold text-sm'>{like} people likes your post</p>
                    </div>

                </div>

            </div>
        </>
    )
}

export default Post
