import React, { useRef, useState } from 'react'
import { useCustomAuth } from '../context/AuthContext';
import axios from 'axios';
import { Form } from 'react-router-dom';

const Share = () => {

  //destructure user from useCustomAuth which includes at AuthContext
  const { user } = useCustomAuth(); //user includes all user data

  //usestate for set files
  const [file, setfile] = useState(null)

  //useRef for create reference
  const desc = useRef()

  //in this store image path
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleSubmit = async (e) => {
    e.preventDefault();   //can't page reload

    //store new post
    const newPost =
    {
      userId: user._id, //_id is a user unique id
      desc: desc.current.value  //one time desc used at useRef hook so use here as a current
    }

    //when user post any image if that is file then performs like following
    if (file) {
      //create a FormData (FormData is a javascript object)
      // FormData enables you to easily gather data from various input elements, such as text fields, checkboxes, and file inputs
      const data = new FormData();

      //here Date.now function used for generate some numbers like '23131' using of this method user image id become like this -->  '54264627like.png' so also make unique data
      const fileName = file.name;

      //add data into FormData use append method and data store as a key valiue pairs
      data.append("name", fileName)
      data.append("file", file)

      //for add image
      newPost.img = fileName;  //here img come form posts  model which is in backend
      console.log(newPost);

      try {
        // Now you can send 'data' to your server using fetch or Axios
        await axios.post("/upload", data)
      } catch (error) {
        console.log("file error is", error);
      }
    }

    try {
      await axios.post("/posts", newPost)
      //after upload post display that post
      window.location.reload()
    } catch (error) {
      console.log("new post error is:", error);
    }
    // console.log('upload successfully....');
  }


  return (
    <div className='mx-5 '>
      <div className='bg-white shadow-2xl	 px-5 py-5 rounded-xl space-y-3'>
        <div className='flex items-center space-x-5 '>

          {/* // if user has profilePicture then display user profilepicture otherwise display avtar(blank picture) */}
          <img src={user.profilePicture ? publicFolder + user.profilePicture : publicFolder + 'person/noAvatar.png'}
            className='h-16 w-16 rounded-full' />
          <input
            type='text'
            placeholder={"What's in your mind " + user.username + "?"}
            className='w-full'
            ref={desc} />

        </div>

        <div className='border border-b-gray-400'></div>

        {/* when file menu is open and select any img then display that image on screen not directy posted */}
        {file && (
          <div className="flex justify-between px-5">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <i 
            onClick={() => setfile(null)} 
            className="fa-solid fa-square-xmark text-3xl"></i>
          </div>
        )}

        <form onSubmit={handleSubmit} >
          <div className='flex items-center space-x-8'>

            {/* here label through we can set choose file option into photo video icon */}
            <label htmlFor='file' className='cursor-pointer'>
              <div className='flex space-x-2 items-center'>
                <i className="fa-solid fa-image text-lg text-green-700 font-bold"></i>
                <h1 className='text-sm font-bold'>Photo or Video</h1>
                <input
                  className='hidden'
                  type='file'
                  id='file'
                  accept='.png, .jpg, .jpeg'
                  // if we right only files then take multiple files
                  //[0] take 1 file
                  onChange={(e) => setfile(e.target.files[0])} />
              </div>
            </label>


            <div className='flex space-x-2 items-center'>
              <i className="fa-solid fa-tag text-lg text-blue-700 font-bold"></i>
              <h1 className='text-sm font-bold'>Tags</h1>
            </div>

            <div className='flex space-x-2 items-center'>
              <i className="fa-solid fa-location-dot text-lg text-yellow-700 font-bold"></i>
              <h1 className='text-sm font-bold'>Location</h1>
            </div>

            <div className='flex space-x-2 items-center'>
              <i className="fa-solid fa-face-smile text-lg text-orange-700 font-bold"></i>
              <h1 className='text-sm font-bold'>Photo or Video</h1>
            </div>

            <button type='submit' className='bg-green-700 rounded-md py-2 text-white font-bold px-5 hover:bg-green-800'>Share</button>

          </div>
        </form>

      </div>

    </div>
  )
}

export default Share