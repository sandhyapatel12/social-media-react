import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCustomAuth } from '../context/AuthContext';


const Navbar = () => {
    //destructure user from useCustomAuth which includes at AuthContext
    const { user } = useCustomAuth(); //user includes all user data

    //in this store image path
    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

    //usestate for responsive
    const [isOpen, setIsOpen] = useState(false);      //set to  false toggle button

    return (
        <>
            <div className='bg-black sticky top-0 left-0 right-0 z-20 '>

                {/* for large devices */}
                <div className='max-w-7xl  items-center justify-between flex mx-auto py-4  text-white px-3 lg:px-10  '>
                    <h1 className='font-extrabold text-2xl text-green-700'>SOCIAL MEDIA</h1>

                    <div>
                        <input type='text' className='border border-gray-300 rounded-full py-1 px-5 ' placeholder='search for friends, posts, videos' />
                    </div>

                    <div className='hidden lg:flex lg:space-x-8 font-bold  items-center '>
                        <NavLink to="/" className={({ isActive }) => isActive ? "text-green-800" : 'text-white hover:text-gray-500'} >Home</NavLink>
                    </div>

                    <div className='space-x-5 text-lg flex'>
                        <div>
                            <i className="fa-solid fa-user"></i>
                        </div>
                        <div>
                            <i className="fa-solid fa-comment"></i>
                        </div>
                        <div>
                            <i className="fa-regular fa-bell"></i>
                        </div>
                    </div>

                    {/* when user click on profile picture redirect at that user profile page */}
                        <div className='flex flex-col items-center'>
                            {/* // if user has profilePicture then display user profilepicture otherwise display avtar(blank picture) */}
                            <Link NavLink to={`/profile/${user.username}`}>       {/*here user.username define path of particular user uniuq through username */}

                            <img src={user.profilePicture ? publicFolder + user.profilePicture : publicFolder + 'person/noAvatar.png'}
                                className='h-10 w-10 rounded-full' />
                            <p>{user.username}</p>
                            </Link>

                        </div>

{/* for small devices */}
                    {/* if toggle button is open */}
                    <button className='lg:hidden' onClick={() => setIsOpen(!isOpen)} >
                        {isOpen ? (

                            <div className="fixed z-10 lg:hidden inset-0 bg-slate-900 text-white ">

                                <div className="nav-bar flex justify-between  mx-auto p-4 items-center">
                                    <h1 className='font-semibold text-xl'> SOCIAL MEDIA</h1>
                                    <i className="fa-solid fa-square-xmark text-2xl "></i>    {/* close icon */}
                                </div>

                                <div>
                                    <input type='text' className='border border-gray-300 rounded-full py-1 px-5' />
                                </div>

                                <div className='py-8 px-10 flex flex-col space-y-5 items-center '>
                                    <NavLink to="/" className={({ isActive }) => isActive ? "text-green-800" : 'text-white hover:text-gray-500'}>Home</NavLink>
                                </div>
                            </div>) :

                            (
                                <i className="fa-solid fa-bars text-xl text-white"></i>
                            )}
                    </button >
                </div>
            </div>
        </>
    );
};

export default Navbar;
