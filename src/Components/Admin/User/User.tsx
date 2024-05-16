import  { useEffect, useState } from 'react';
import { getAllUsers } from '../../../Api/admin/adminApiMethod';
import TableData from './Table';
import { useDispatch } from 'react-redux';
import {HashLoader} from 'react-spinners'


interface User {
    _id: string;
    profileImageUrl: string;
    userName: string;
    email: string;
    isBlocked: boolean;
    name: string;
    mobile: string;
}

function UserManagement() {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState<boolean>(true);
    const [users, setUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [usersPerPage] = useState<number>(10); 
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        getAllUsers()
            .then(async (response) => {
                setUsers([...users,...response.usersData]);
                setTotal(response.usersData.length);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
            });
    }, [dispatch, currentPage, usersPerPage]);

    const updateUserStatus = (userId: string, newStatus: boolean) => {
        const updatedUsers = users.map(user => {
            if (user._id === userId) {
                return { ...user, isBlocked: newStatus };
            }
            return user;
        });
        console.log(updatedUsers)
        console.table(updatedUsers)
        setUsers(updatedUsers);
    };

    // Pagination logic
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
              {loading && <HashLoader color="#36d7b7" />}
            </div>
          );
    }

    return (
        <section className="container px-4 mx-auto flex flex-col justify-center items-center min-h-screen ">
            <div className="flex items-center gap-x-3">
                <h2 className="text-lg font-bold text-green-700 dark:text-white">USER MANAGEMENT</h2>
            </div>

            <div className="flex flex-col mt-6">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                            <table className="  min-w-full divide-y divide-gray-200 dark:divide-gray-700border border-gray-200 dark:border-gray-700 border-2 rounded-full  shadow-2xl bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                <thead className="bg-green-600 text-white font-bold dark:bg-gray-800">
                                    <tr>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right dark:text-gray-400">
                                            <div className="flex items-center">
                                                <span>Profile</span>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-12 py-3.5 text-sm font-bold text-left rtl:text-right  dark:text-gray-400">
                                            <div className="flex items-center">
                                                <span>Name</span>
                                                <svg className="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right  dark:text-gray-400">
                                            <div className="flex items-center">
                                                <span>Contact</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4"></svg>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-4  py-3.5 text-sm font-bold text-left rtl:text-right  dark:text-gray-400">
                                            <div className="flex items-center">
                                                <span>Status</span>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right  dark:text-gray-400">Action</th>

                                        <th scope="col" className="relative py-3.5  px-4">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                {/* <tbody className="bg-dark divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900 border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"> */}
                                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                    {currentUsers.map((user, index) => (
                                        <TableData key={index} user={user} updatedUsers={updateUserStatus} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex mt-5">
                <button
                    className={`flex items-center px-4 py-2 mx-1 text-gray-500 bg-white rounded-md cursor-pointer dark:bg-gray-800 dark:text-gray-600 ${currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>

                {Array.from({ length: Math.ceil(total / usersPerPage) }).map((_, index) => (
                    <button
                        key={index}
                        className={`items-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:flex dark:bg-gray-800 dark:text-gray-200 hover:bg-green-600 dark:hover:bg-green-600 hover:text-white dark:hover:text-gray-200 ${index + 1 === currentPage ? '' : 'hidden'}`}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}

                <button
                    className="flex items-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md dark:bg-gray-800 dark:text-gray-200 hover:bg-green-600 dark:hover:bg-green-600 hover:text-white dark:hover:text-gray-200"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === Math.ceil(total / usersPerPage)} // Disable the button if currentPage is the last page
                >
                    Next
                </button>
            </div>
        </section>
    );
}

export default UserManagement;
