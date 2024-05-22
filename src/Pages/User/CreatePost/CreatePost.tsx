import React from 'react'
import CreatePost1 from '../../../Components/User/CreatePost/CreatePost2'
import Sidebar2 from '../../../Components/User/Sidebar/Sidebar2'
import { toast } from 'react-toastify'
const CreatePost = () => {
    toast.success('worked')
  return (
    <div className='w-full h-full  bg-white flex '>
        <Sidebar2/>
     
      <div
          id="post-container"
          className='w-full  flex justify-center items-center '
        >
      <CreatePost1/>
      </div>
     
    </div>
  )
}

export default CreatePost
