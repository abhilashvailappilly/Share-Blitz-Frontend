import React, { useEffect, useState } from 'react';
import { BiBookAlt, BiHelpCircle, BiHome, BiMessage, BiStats, BiTask } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../Store/user/userSlice';
import { clearLoadedPosts, clearUserPosts } from '../../../Store/user/postSlice';
import IconUsers from '../../icons/Users';
import { FaSignOutAlt } from 'react-icons/fa';
import IconPicture from '../../icons/PostIcon';
import ProfileDataInterface from '../../../Types/User/userProfile';
import { RootState } from '../../../Store/store';
import SearchIcon from '../../icons/SearchIcon';
import classNames from 'classnames';
import IconHome from '../../icons/HomeIcon';
import IconMessage from '../../icons/MessageIco';
import { DarkThemeToggle } from 'flowbite-react';
import IconExplore from '../../icons/ExploreIcon';
import IconNotifications from '../../icons/NotificationIcon';
import IconSettings from '../../icons/Settings';
import { useDarkMode } from '../../../Context/DarkModeContext';
import IconSearch from '../../icons/SearchIcon';
import { useNotificationStore } from '@/ZustandStore/notificationStore';
import { GetAllNotifications } from '@/Api/user/notificationApiMethod';

const Sidebar2 = () => {
  const{isDarkMode,toggleDarkMode} = useDarkMode()
   const userData: ProfileDataInterface = useSelector((state: RootState) => state.auth.userInfo);
   const {notifications,setNotifications} = useNotificationStore()
  const dispatch = useDispatch();
  // const [isDarkMode, setisDarkMode] = useState(false);

  useEffect(() => {
    fetchNotifications()
  },[])

  const fetchNotifications = async ()=>{
    try {
      const response = await GetAllNotifications()
      console.log("all notifications",response)
      if(response.success){
        setNotifications([...notifications,...response.data.notifications])
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleClickLogout = () => {
    dispatch(logout());
    dispatch(clearLoadedPosts());
    dispatch(clearUserPosts());
  };



  return (
    <div className={classNames("w-1/6  h-screen sticky top-0 border-black rounded md:block lg:block hidden border-r-2 mr-3", { 'bg-white': !isDarkMode, 'bg-gray-900 text-white': isDarkMode } )}>
      <div className="h-full px-3 py-4 overflow-y-auto  no-scrollbar">
        <a href="/home" className="flex items-center ps-2.5 mb-5">
          <img src="/logo.png" className="h-6 me-3 sm:h-7" alt="Share Blitz Logo" />
          <span className="self-center text-xl font-semibold lg:block hidden flex-1 ms-3 whitespace-nowrap">Share Blitz</span>
        </a>

        <ul className="space-y-2 font-medium">
          {/* <li>
            <button  className=" flex items-center p-2 justify-center rounded-lg hover:bg-green-900 hover:text-white font-bold">
            
              <DarkThemeToggle onClick={toggleDarkMode}/>
            </button>
          </li> */}
          <li><hr className={classNames("h-[1.5px]", { 'bg-black': !isDarkMode, 'bg-white': isDarkMode })} /></li>
          <li>
            <Link to="/home" className="flex items-center p-2 justify-center rounded-lg hover:bg-green-900 hover:text-white font-bold">
              <IconHome className={classNames("flex-shrink-0 w-5 h-5 transition duration-75", { 'dark:text-gray-400': isDarkMode, 'group-hover:text-gray-900 dark:group-hover:text-white': isDarkMode })} />
              <span className="lg:block hidden flex-1 ms-3 whitespace-nowrap">Home</span>
            </Link>
          </li>
          <li><hr className={classNames("h-[1.5px]", { 'bg-black': !isDarkMode, 'bg-white': isDarkMode })} /></li>
          <li>
            <Link to="/search" className="flex justify-center items-center p-2 rounded-lg hover:bg-green-900 hover:text-white font-bold">
              <IconSearch />
              <span className="lg:block hidden flex-1 ms-3 whitespace-nowrap">Search</span>
            </Link>
          </li>
          <li><hr className={classNames("h-[1.5px]", { 'bg-black': !isDarkMode, 'bg-white': isDarkMode })} /></li>
          <li>
            <Link to="/createPost" className="flex justify-center items-center p-2 rounded-lg hover:bg-green-900 hover:text-white font-bold">
              <IconPicture />
              <span className="lg:block hidden flex-1 ms-3 whitespace-nowrap">Create Post</span>
            </Link>
          </li>
          <li><hr className={classNames("h-[1.5px]", { 'bg-black': !isDarkMode, 'bg-white': isDarkMode })} /></li>
          
         <li className=''>
            <Link to="/explore" className="flex justify-center items-center p-2 rounded-lg hover:bg-green-900 hover:text-white font-bold">
              <IconExplore />
              <span className="lg:block hidden flex-1 ms-3 whitespace-nowrap">Explore</span>
            </Link>
          </li>
          <li><hr className={classNames("h-[1.5px]", { 'bg-black': !isDarkMode, 'bg-white': isDarkMode })} /></li>
          <li><hr className={classNames("h-[1.5px]", { 'bg-black': !isDarkMode, 'bg-white': isDarkMode,'hidden':isDarkMode })} /></li>
          
          {/* <li><hr className={classNames("h-[1.5px]",  'bg-red-600' )} /></li> */}
          {/* <li><hr className={classNames("h-[1.5px]", { 'bg-red-400': !isDarkMode, 'bg-white': isDarkMode })} /></li> */}

          <li>
            <Link to="/message" className="flex justify-center items-center p-2 rounded-lg hover:bg-green-900 hover:text-white font-bold">
              <IconMessage />
              <span className="lg:block hidden flex-1 ms-3 whitespace-nowrap">Message</span>
            </Link>
          </li>
          <li><hr className={classNames("h-[1.5px]", { 'bg-black': !isDarkMode, 'bg-white': isDarkMode })} /></li>
          <li>
            <Link to="/notifications" className="flex justify-center items-center p-2 rounded-lg hover:bg-green-900 hover:text-white font-bold">
              <IconNotifications />
              {notifications?.length}
              <span className="lg:block hidden flex-1 ms-3 whitespace-nowrap">Notifications</span>
            </Link>
          </li>
          <li><hr className={classNames("h-[1.5px]", { 'bg-black': !isDarkMode, 'bg-white': isDarkMode })} /></li>
          <li>
            <Link to={`/profile/${userData._id}`} className="flex justify-center items-center p-2 rounded-lg hover:bg-green-900 hover:text-white font-bold">
              <IconUsers />
              <span className="lg:block hidden flex-1 ms-3 whitespace-nowrap">Profile</span>
            </Link>
          </li>
          <li><hr className={classNames("h-[1.5px]", { 'bg-black': !isDarkMode, 'bg-white': isDarkMode })} /></li>
          <li>
            <Link to={`/settings`} className="flex justify-center items-center p-2 rounded-lg hover:bg-green-900 hover:text-white font-bold">
              <IconSettings />
              <span className="lg:block hidden flex-1 ms-3 whitespace-nowrap">Settings</span>
            </Link>
          </li>

          <li><hr className={classNames("h-[1.5px]", { 'bg-black': !isDarkMode, 'bg-white': isDarkMode })} /></li>
          <li>
            <Link to="/logout" onClick={handleClickLogout} className="flex justify-center items-center p-2 rounded-lg hover:bg-green-900 hover:text-white font-bold">
              <FaSignOutAlt className="icon" />
              <span className="lg:block hidden flex-1 ms-3 whitespace-nowrap">Logout</span>
            </Link>
          </li>
          <li><hr className={classNames("h-[1.5px]", { 'bg-black': !isDarkMode, 'bg-white': isDarkMode })} /></li>

        </ul>
      </div>
    </div>
  );
};

export default Sidebar2;
