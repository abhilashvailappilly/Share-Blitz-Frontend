import React from 'react'
import CreatePost1 from '../../../Components/User/CreatePost/CreatePost2'
import Sidebar2 from '../../../Components/User/Sidebar/Sidebar2'
import { toast } from 'react-toastify'
const CreatePost = () => {
    toast.success('worked')
  return (
    <div className='w-full h-full bg-green-500 flex'>
        <Sidebar2/>
      <div>
      <div
          id="post-container"
          className='w-full h-screen flex justify-center items-center overflow-hidden'
        >
      {/* <CreatePost1/> */}
      </div>
      </div>
    </div>
  )
}

export default CreatePost
