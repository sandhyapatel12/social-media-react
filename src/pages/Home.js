import React from 'react'
import LeftSidebar from '../components/LeftSidebar'
import Feed from '../components/Feed'
import RightSidebar from '../components/RightSidebar'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <>
      <Navbar />

      <div className=' flex mx-auto max-w-7xl '>
        <LeftSidebar />
        <Feed />
        <RightSidebar />
      </div>
    </>
  )
}

export default Home