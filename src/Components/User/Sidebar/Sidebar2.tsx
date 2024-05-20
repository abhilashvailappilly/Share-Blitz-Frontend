import {BiBookAlt, BiHelpCircle, BiHome, BiMessage, BiStats, BiTask} from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { logout } from '../../../Store/user/userSlice';
import { clearLoadedPosts,clearUserPosts } from '../../../Store/user/postSlice';
import IconUsers from '../../icons/Users';
import { FaSignOutAlt } from 'react-icons/fa';
import IconPicture from '../../icons/PostIcon';

const Sidebar2 = () => {
    const dispatch = useDispatch()
    const handleClickLogout = ()=>{
        dispatch(logout())
        dispatch(clearLoadedPosts())
        dispatch(clearUserPosts())
    }
  return (
  
       <div className="w-1/5 h-screen sticky bg-white top-0  border-black rounded  md:block lg:block hidden border-r-2 mr-3">
          <div className="h-full px-3 py-4 overflow-y-auto bg-white ">
      <a href="https://flowbite.com/" className="flex items-center ps-2.5 mb-5">
         <img src="./logo.png" className="h-6 me-3 sm:h-7" alt="Flowbite Logo" />
         <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Share Blitz</span>
      </a>
         {/* <button id="theme-toggle" className="mb-5 p-2 bg-gray-200 dark:bg-gray-600 rounded">
                Toggle Dark Mode
            </button> */}
      <ul className="space-y-2 font-medium">
      <li><hr className="bg-black h-[1.5px]" /></li>
        <li>
         <Link to="/home" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-green-900 hover:text-white font-bold ">
              <svg className="flex-shrink-0 w-5 h-5 
              
               text-black transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap">Home</span>

         </Link>
         </li>
         <li><hr className="bg-black h-[1.5px]" /></li>
        <li>
         <Link to="/createPost" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-green-900 hover:text-white font-bold ">
         <IconPicture className='text-black '/>
            
               <span className="flex-1 ms-3 whitespace-nowrap">Create Post</span>

         </Link>
         </li>

         <li><hr className="bg-black h-[1.5px]" /></li>
        <li>
         <Link to="/profile" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-green-900 hover:text-white font-bold ">
             <IconUsers/>
               <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>

         </Link>
         </li>

         <li><hr className="bg-black h-[1.5px]" /></li>
        <li>
         <Link to="/message" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-green-900 hover:text-white font-bold ">
              <BiMessage className='icon' />
               <span className="flex-1 ms-3 whitespace-nowrap">Message</span>

         </Link>
         </li>

         <li><hr className="bg-black h-[1.5px]" /></li>
         <li><hr className="bg-black h-[1.5px]" /></li>
        <li>
         <Link to="/logout" onClick={handleClickLogout} className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-green-900 hover:text-white font-bold ">
         <FaSignOutAlt className='icon'/>

               <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>

         </Link>
         </li>

         

       

       
            </ul>
  
    </div>
    </div>
  )
}

export default Sidebar2
