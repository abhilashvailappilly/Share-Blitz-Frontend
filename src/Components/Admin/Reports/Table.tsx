import React, { SetStateAction, useEffect, useState } from 'react';
import UserBlockModal from '../../../Components/Admin/Modal/UserBlockModal';
import { ReportsInterface } from '../../../Types/Admin/Reports';
import { getUser } from '../../../Api/user/authApiMethod';
import { User } from '../../../Types/User/Comment';
import ProfileDataInterface from '../../../Types/User/userProfile';
import { toast } from 'react-toastify';
import { HashLoader } from 'react-spinners';
import { Dispatch } from '@reduxjs/toolkit';
import { PostI } from '../../../Types/User/Post';
import { getPostById, getUserById } from '../../../Api/admin/adminApiMethod';
import DeletePostModal from '../Modal/DeletePostModal';
 
 
interface Props {
    report: ReportsInterface;
    updatedUsers: (userId: string, newStatus: boolean) => void;
    setLoading?: (isLoading: boolean) => void;
}

function TableData({ report, updatedUsers,setLoading }: Props) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [userData , setUserData] = useState<ProfileDataInterface>()
    const [postData , setPostData] = useState<PostI>() 
    // const [loading,setLoading] = useState<Boolean>(true)
    const toggleModal = () => {
        setIsOpen(!isOpen);
    };
    useEffect(()=>{
        fetchUserData()
        fetchPostData()
    },[])
    const fetchUserData = async()=>{
        setLoading?.(true)
        const response = await getUserById(report.userId)
        if(response.success){
            setUserData(response.user)
        } else {
            // toast.error(response.message)
        }
        setLoading?.(false)
    }

    const fetchPostData = async()=>{
        setLoading?.(true)
        const response = await getPostById(report.postId)
        if(response.success){
            setPostData(response.postData)
        } else {
            // toast.error(response.message)
        }
        setLoading?.(false)
    }
    useEffect(()=>{
        console.log("postdat ..",postData)
    },[postData])
   
    return (
        // <tr className="border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
        <tr className="border-b border-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-green-200 dark:hover:text-white hover:text-green-900">


            <td className="py-4 px-4 whitespace-nowrap ">
                <div className="flex items-center">
                    <img src={postData?.imageUrl ||"https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D" } 
                    alt="Profile" className="h-10 w-10" /> 
                    <div className="ml-4">
                        {/* <div className="text-sm font-medium text-gray-900 dark:text-white">{userData?.name}</div> */}
                        {/* <div className="text-sm text-gray-500 dark:text-gray-400">{report.postId}</div> */}
                    </div>
                </div>
            </td>

            <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-400">{userData?.name}</td>
            <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-400">{report.reason}</td>
            <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{report.actionTaken ?"Taken" :  "not taken"}</td>

          



            <td className="py-4 px-4 whitespace-nowrap text-right text-sm font-medium">
                {report.actionTaken ? (
                    <button
                    onClick={toggleModal}
                    className="w-28 inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-transform duration-300 transform hover:scale-110"
                    >
                    Unblock 
                    </button>
                ) : (
                    <button
                    onClick={toggleModal}
                    className="w-28 inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-transform duration-300 transform hover:scale-110"
                    >
                    Block Post
                    </button>
                )}
            </td>
                <DeletePostModal isOpen={isOpen}  updatedUsers={updatedUsers} closeModal={toggleModal} isActionTaken = {report.actionTaken} postId={postData?._id as string} reportId={report._id}/>
            {/* <UserBlockModal isOpen={isOpen} closeModal={toggleModal} updatedUsers={updatedUsers} isActionTaken = {report.actionTaken} postId={postData?._id} userId={report._id} /> */}
        </tr>
    );
}

export default TableData;
