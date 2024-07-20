import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../Store/user/userSlice';
import { clearLoadedPosts, clearUserPosts } from '../../../Store/user/postSlice';
import IconUsers from '../../icons/Users';
import { FaSignOutAlt } from 'react-icons/fa';
import IconPicture from '../../icons/PostIcon';
import ProfileDataInterface from '../../../Types/User/userProfile';
import { RootState } from '../../../Store/store';
import classNames from 'classnames';
import IconHome from '../../icons/HomeIcon';
import IconMessage from '../../icons/MessageIco';
import IconExplore from '../../icons/ExploreIcon';
import IconNotifications from '../../icons/NotificationIcon';
import IconSettings from '../../icons/Settings';
import { useDarkMode } from '../../../Context/DarkModeContext';
import IconSearch from '../../icons/SearchIcon';
import { useNotificationStore } from '@/ZustandStore/notificationStore';
import { GetAllNotifications } from '@/Api/user/notificationApiMethod';

const Sidebar2 = () => {
  const { isDarkMode } = useDarkMode();
  const userData: ProfileDataInterface = useSelector((state: RootState) => state.auth.userInfo);
  const { notifications, setNotifications } = useNotificationStore();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await GetAllNotifications();
      if (response.success) {
        setNotifications([...notifications, ...response.data.notifications]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickLogout = () => {
    dispatch(logout());
    dispatch(clearLoadedPosts());
    dispatch(clearUserPosts());
  };

  return (
    <div className={classNames("w-1/6 h-screen sticky top-0 border-black rounded-md shadow-lg mr-1 md:block lg:block hidden", { 'bg-white': !isDarkMode, 'bg-gray-900 text-white': isDarkMode })}>
      <div className="h-full px-4 py-6 overflow-y-auto no-scrollbar">
        <Link to="/home" className="flex items-center pb-4 mb-6 border-b border-gray-300 dark:border-gray-700">
          <img src="/logo.png" className="h-8 mr-3" alt="Share Blitz Logo" />
          <span className="text-2xl font-semibold whitespace-nowrap">Share Blitz</span>
        </Link>

        <ul className="space-y-4">
          <li>
            <Link to="/home" className="flex items-center p-3 rounded-lg hover:bg-green-700 hover:text-white transition">
              <IconHome className="w-6 h-6" />
              <span className="ml-3 font-bold">Home</span>
            </Link>
          </li>
          <li>
            <Link to="/search" className="flex items-center p-3 rounded-lg hover:bg-green-700 hover:text-white transition">
              <IconSearch className="w-6 h-6" />
              <span className="ml-3  font-bold">Search</span>
            </Link>
          </li>
          <li>
            <Link to="/createPost" className="flex items-center p-3 rounded-lg hover:bg-green-700 hover:text-white transition">
              <IconPicture className="w-6 h-6" />
              <span className="ml-3 font-bold">Create Post</span>
            </Link>
          </li>
          <li>
            <Link to="/explore" className="flex items-center p-3 rounded-lg hover:bg-green-700 hover:text-white transition">
              <IconExplore className="w-6 h-6" />
              <span className="ml-3 font-bold">Explore</span>
            </Link>
          </li>
          <li>
            <Link to="/message" className="flex items-center p-3 rounded-lg hover:bg-green-700 hover:text-white transition">
              <IconMessage className="w-6 h-6" />
              <span className="ml-3 font-bold">Message</span>
            </Link>
          </li>
          <li>
            <Link to="/notifications" className="flex items-center p-3 rounded-lg hover:bg-green-700 hover:text-white transition">
              <IconNotifications className="w-6 h-6" />
              <span className="ml-3 font-bold">Notifications</span>
            </Link>
          </li>
          <li>
            <Link to={`/profile/${userData._id}`} className="flex items-center p-3 rounded-lg hover:bg-green-700 hover:text-white transition">
              <IconUsers className="w-6 h-6" />
              <span className="ml-3 font-bold">Profile</span>
            </Link>
          </li>
          <li>
            <Link to="/settings" className="flex items-center p-3 rounded-lg hover:bg-green-700 hover:text-white transition">
              <IconSettings className="w-6 h-6" />
              <span className="ml-3 font-bold">Settings</span>
            </Link>
          </li>
          <li>
            <button onClick={handleClickLogout} className="flex items-center p-3 w-full rounded-lg hover:bg-green-700 hover:text-white transition">
              <FaSignOutAlt className="w-6 h-6" />
              <span className="ml-3 font-bold">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar2;
