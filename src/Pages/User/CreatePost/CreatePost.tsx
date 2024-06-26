import React from 'react'
import CreatePost1 from '../../../Components/User/CreatePost/CreatePost3'
import CreatePostContainer from '@/Components/User/CreatePost/CreatePostContainer'
import Sidebar2 from '../../../Components/User/Sidebar/Sidebar2'
const CreatePost = () => {
  return (
    <div className='w-full h-full  bg-white flex '>
        <Sidebar2/>
     
      <div
          id="post-container"
          className='w-full  flex justify-center items-center '
        >
      <CreatePostContainer/>
      </div>
     
    </div>
  )
}

export default CreatePost
