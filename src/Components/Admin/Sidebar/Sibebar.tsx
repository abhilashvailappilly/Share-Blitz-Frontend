import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adminLogout } from '../../../Store/user/userSlice';
import IconUsers from '../../icons/Users';
import IconHome from '../../icons/HomeIcon';
import IconPicture from '../../icons/PostIcon';
import IconLogout from '../../icons/LogoutIcon';

const Sidebar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleClickLogout = () => {
        dispatch(adminLogout())
        navigate('/login')
    }
    return (
        <aside className="flex flex-col w-1/6 h-screen px-4 py-8 overflow-y-auto bg-green-600 border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700 md:block lg:block hidden">
            <div className="flex items-center">
       
       
        <a href="#" className="  text-white  font-bold text-lg">
          Share Blitz 
        </a>
      </div>



            <div className="flex flex-col justify-between flex-1 mt-6">
                <nav>
                    <Link to="/admin/home" className="flex mt-5  items-center px-4 py-2 text-white rounded-md  dark:bg-gray-800 dark:text-gray-200 hover:bg-white hover:text-black hover:pointer">
                        <IconHome/>

                        <span className="mx-4 font-bold">
                            Dashboard
                        </span>
                    </Link>

                    <Link to="/admin/users" className="flex mt-5  items-center px-4 py-2 text-white rounded-md  dark:bg-gray-800 dark:text-gray-200 hover:bg-white hover:text-black hover:pointer">
                        <IconUsers/>

                        <span className="mx-4 font-bold">
                            Users
                        </span>
                    </Link>

                    <Link to="/admin/posts" className="flex mt-5  items-center px-4 py-2 text-white rounded-md  dark:bg-gray-800 dark:text-gray-200 hover:bg-white hover:text-black hover:pointer">
                        <IconPicture/>

                        <span className="mx-4 font-bold">
                            Posts 
                        </span>
                    </Link>

                    <Link to="/admin/verifications" className="flex mt-5  items-center px-4 py-2 text-white rounded-md   dark:bg-gray-800 dark:text-gray-200 hover:bg-white hover:text-black hover:pointer">
                        <IconUsers/>

                        <span className="mx-4 font-bold">
                            Verifications
                        </span>
                    </Link>

                    <Link to="/admin/reports" className="flex mt-5  items-center px-4 py-2 text-white rounded-md   dark:bg-gray-800 dark:text-gray-200 hover:bg-white hover:text-black hover:pointer">
                        <IconUsers/>

                        <span className="mx-4 font-bold">
                            Reports
                        </span>
                    </Link>

                    <a onClick={handleClickLogout} className="flex mt-5  items-center px-4 py-2 text-white rounded-md   dark:bg-gray-800 dark:text-gray-200 hover:bg-white hover:text-black hover:pointer">
                        <IconLogout/>

                        <span className="mx-4 font-bold">
                            Logout
                        </span>
                    </a>




                    

                

                </nav>




            </div>
        </aside>
    );
}

export default Sidebar;
