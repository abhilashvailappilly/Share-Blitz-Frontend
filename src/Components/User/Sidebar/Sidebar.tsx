import {BiBookAlt, BiHome, BiMessage, } from 'react-icons/bi'
import {  FaPlusCircle,FaSignOutAlt } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import './sidebar.css'
import { logout } from '../../../Store/user/userSlice';
import { clearLoadedPosts,clearUserPosts } from '../../../Store/user/postSlice';
import IconUsers from '../../icons/Users';



    const Sidebar = ()=>{
        const dispatch = useDispatch()
        const handleClickCreatePost = ()=>{
        // setShowCreatePost(true)
        // setShowPost(false)
        
        }
        const handleClickHome = ()=>{
            // setShowCreatePost(false)
            // setShowPost(true)
            
            }
        const handleClickLogout = ()=>{
            dispatch(logout())
            dispatch(clearLoadedPosts())
            dispatch(clearUserPosts())
        }
  return (
    <div className='menu w-1/5 h-100 border-2 z-50 border-black rounded bg-green-500 md:block lg:block hidden' >
        <div className='logo '>
            <BiBookAlt className='logo-icon'/>
            <h1>Share Blitz</h1>
        </div>
        <div className='menu--list '>
            <a href="#" onClick={handleClickHome} className='item'>
                <BiHome className='icon'/>
                Home
            </a>
        
             <a href="#" onClick={handleClickCreatePost}  className='item'>
            
            <FaPlusCircle className="mr-2" />
            <span>Create Post</span>
          {/* </a> */}
            </a>
            {/* <a href="#" className='item'>
                <BiTask className='icon'/>
                Profile
            </a>   */}

                    <Link to="/createPost" className="flex mt-5  items-center px-4 py-2 text-white rounded-md  dark:bg-gray-800 dark:text-gray-200 hover:bg-white hover:text-black hover:pointer">
                        <IconUsers/>

                        <span className="mx-4 font-bold">
                            Create Post 
                        </span>
                    </Link>

                    <Link to="/profile" className="flex mt-5  items-center px-4 py-2 text-white rounded-md  dark:bg-gray-800 dark:text-gray-200 hover:bg-white hover:text-black hover:pointer">
                        <IconUsers/>

                        <span className="mx-4 font-bold">
                            Profile 
                        </span>
                    </Link>


            <a href="#"  className='item'>
                <BiMessage className='icon'/>
                Message
            </a>
            <a href="#" onClick={handleClickLogout} className='item'>
                <FaSignOutAlt className='icon'/>
                Logout
            </a>

        </div>
    
    </div>
  )
}

export default Sidebar
