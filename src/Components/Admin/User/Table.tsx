import React, { useState } from 'react';
import UserBlockModal from '../../../Components/Admin/Modal/UserBlockModal';

interface User {
    _id: string;
    profileImageUrl: string;
    userName: string;
    email: string;
    isBlocked: boolean;
    name: string;
    mobile: string;
}

interface Props {
    user: User;
    updatedUsers: (userId: string, newStatus: boolean) => void;
}

function TableData({ user, updatedUsers }: Props) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        // <tr className="border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
        <tr className="border-b border-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-green-200 dark:hover:text-white hover:text-green-900">


            <td className="py-4 px-4 whitespace-nowrap ">
                <div className="flex items-center">
                    <img src={user?.profileImageUrl ||"https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D" } 
                    alt="Profile" className="h-10 w-10 rounded-full" /> {/* Profile picture */}
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{user.userName}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                    </div>
                </div>
            </td>

            <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-400">{user.name}</td>
            <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{user.mobile || "not updated"}</td>

            {user.isBlocked ? (
                <td className="py-4 px-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex items-center text-xs font-semibold rounded-full bg-red-200 text-red-800 dark:bg-red-600 dark:text-red-100 hover:bg-red-300 dark:hover:bg-red-700">
                    Inactive
                    </span>
                </td>
                ) : (
                <td className="py-4 px-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex items-center text-xs font-semibold rounded-full bg-green-200 text-green-800 dark:bg-green-600 dark:text-green-100 hover:bg-green-300 dark:hover:bg-green-700">
                    Active
                    </span>
                </td>
                )}



            <td className="py-4 px-4 whitespace-nowrap text-right text-sm font-medium">
                {user.isBlocked ? (
                    <button
                    onClick={toggleModal}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-transform duration-300 transform hover:scale-110"
                    >
                    UnBlock
                    </button>
                ) : (
                    <button
                    onClick={toggleModal}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-transform duration-300 transform hover:scale-110"
                    >
                    Block
                    </button>
                )}
            </td>

            <UserBlockModal isOpen={isOpen} closeModal={toggleModal} updatedUsers={updatedUsers} userId={user._id} />
        </tr>
    );
}

export default TableData;
