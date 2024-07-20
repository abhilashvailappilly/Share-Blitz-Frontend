import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adminLogout } from '../../../Store/user/userSlice';
import IconUsers from '../../icons/Users';
import IconHome from '../../icons/HomeIcon';
import IconPicture from '../../icons/PostIcon';
import IconLogout from '../../icons/LogoutIcon';
import { Paper } from '@mui/material';
import { useDarkMode } from '@/Context/DarkModeContext';
// import { useDarkMode } from '@/Context/DarkModeContext'; // Assuming you have this context for dark mode

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { isDarkMode } = useDarkMode();

    const handleClickLogout = () => {
        dispatch(adminLogout());
        navigate('/login');
    };

    const getLinkClasses = (path: string) => {
        const baseClasses = 'flex mt-5 items-center px-4 py-2 rounded-md cursor-pointer';
        const activeClasses = location.pathname === path ? 'text-white bg-gray-700' : 'text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700';
        return `${baseClasses} ${activeClasses}`;
    };

    return (
        <Paper
            sx={{ boxShadow: 4 }}
            className={`sm:flex flex-col w-1/6 mr-1 h-screen px-4 py-8 overflow-y-auto border-r dark:bg-gray-900 dark:border-gray-700  bg-white border-gray-200 md:block lg:block hidden`}
        >
            <div className="flex items-center">
                <img src="/logo.png" alt="Share Blitz Logo" />
                {/* <a href="#" className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    Share Blitz
                </a> */}
            </div>

            <div className="flex flex-col justify-between flex-1 mt-6">
                <nav>
                    <Link to="/admin/home" className={getLinkClasses('/admin/home')}>
                        <IconHome className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} />
                        <span className="mx-4 font-bold">Dashboard</span>
                    </Link>

                    <Link to="/admin/users" className={getLinkClasses('/admin/users')}>
                        <IconUsers className='dark:text-gray-300' />
                        {/* <IconUsers className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} /> */}
                        <span className="mx-4 font-bold dark:text-white ">Users</span>
                    </Link>

                    <Link to="/admin/posts" className={getLinkClasses('/admin/posts')}>
                        <IconPicture className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} />
                        <span className="mx-4 font-bold">Posts</span>
                    </Link>

                    <Link to="/admin/verifications" className={getLinkClasses('/admin/verifications')}>
                        <IconUsers className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} />
                        <span className="mx-4 font-bold">Verifications</span>
                    </Link>

                    {/* <Link to="/admin/reports" className={getLinkClasses('/admin/reports')}>
                        <IconUsers className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} />
                        <span className="mx-4 font-bold">Reports</span>
                    </Link> */}

                    <a onClick={handleClickLogout} className={`flex mt-5 items-center px-4 py-2 rounded-md cursor-pointer ${isDarkMode ? 'text-white hover:bg-gray-700' : 'text-black hover:bg-gray-200'}`}>
                        <IconLogout className='dark:text-gray-300' />
                        <span className="mx-4 font-bold">Logout</span>
                    </a>
                </nav>
            </div>
        </Paper>
    );
};

export default Sidebar;
