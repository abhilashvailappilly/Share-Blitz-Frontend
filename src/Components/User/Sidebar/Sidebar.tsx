import React from 'react'
import {BiBookAlt, BiHelpCircle, BiHome, BiMessage, BiStats, BiTask} from 'react-icons/bi'
import { FaUserCircle , FaPlusCircle,FaSignOutAlt } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import './sidebar.css'
import { logout } from '../../../Store/user/userSlice';
import { clearLoadedPosts } from '../../../Store/user/postSlice';

interface SidebarProps  {
    setShowCreatePost:React.Dispatch<React.SetStateAction<boolean>>;
    setShowPost: React.Dispatch<React.SetStateAction<boolean>>;
};


    const Sidebar = ({setShowCreatePost ,setShowPost}:SidebarProps)=>{
        const dispatch = useDispatch()
        const handleClickCreatePost = ()=>{
        setShowCreatePost(true)
        setShowPost(false)
        
        }
        const handleClickHome = ()=>{
            setShowCreatePost(false)
            setShowPost(true)
            
            }
        const handleClickLogout = ()=>{
            dispatch(logout())
            dispatch(clearLoadedPosts())
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
             {/* <a className="nav-link flex items-center"> */}
            <FaPlusCircle className="mr-2" />
            <span>Create Post</span>
          {/* </a> */}
            </a>
            <a href="#" className='item'>
                <BiTask className='icon'/>
                Profile
            </a>  
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
