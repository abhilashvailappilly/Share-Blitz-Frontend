import React, {  useEffect, useState } from 'react';
import { ReportsInterface } from '../../../Types/Admin/Reports';
import ProfileDataInterface from '../../../Types/User/userProfile';
import { toast } from 'react-toastify';
import { HashLoader } from 'react-spinners';

import { GetReportsByPostId, TooglePostIsBlocked, getUserById } from '../../../Api/admin/adminApiMethod';
import { PostInterface } from '@/Types/Admin/PostManagement';
import ReportModal from './ReportsModal';
import BlockPostModal from '../Modal/BlockPostModal';
 

//  interface PostsInterface {
//     _id:string
//     userId:string
//     imageUrl:string
//  }
interface Props {
    posts: PostInterface;
    updatedUsers: (userId: string, newStatus: boolean) => void;
    setLoading?: (isLoading: boolean) => void;
}

function TableData({ posts, updatedUsers,setLoading }: Props) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [userData , setUserData] = useState<ProfileDataInterface>()
    const [postData , setPostData] = useState<PostInterface>(posts) 
    const [reportData , setReportData] = useState<ReportsInterface[]>([]) 
    const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
    const [isBlockModalOpen, setIsBlockModalOpen] = useState<boolean>(false);
    const [isBlocking, setIsBlocking] = useState<boolean>(true);
    // const [loading,setLoading] = useState<Boolean>(true)
  
    useEffect(()=>{
        setPostData(posts)
        fetchUserData()
        fetchReportData()
    },[])
    useEffect(()=>{
        fetchReportData()
    //    posts ? fetchReportData() :""
    },[postData])
    const fetchUserData = async()=>{
         setLoading?.(true)
        const response = await getUserById(posts.userId)
        if(response.success){
            setUserData(response.user)
        } else {
            // toast.error(response.message)
        } 
        setLoading?.(false)
    }

    const fetchReportData = async()=>{
        setLoading?.(true)
      
        const response = await GetReportsByPostId(posts?._id as string)
        if(response.success){
            setReportData(response.reports)
        } else {
            // toast.error(response.message)
        }
        setLoading?.(false)
    }
 
   
    const toggleReportModal = () => {
        setIsReportModalOpen(!isReportModalOpen);
    };
    const toggleBlockModal = (blocking: boolean) => {
        setIsBlocking(blocking);
        setIsBlockModalOpen(!isBlockModalOpen);
    };
    const handleBlockUnblockPost = async () => {
        setLoading?.(true);
        toggleBlockModal(false)
        try {
            const response = await TooglePostIsBlocked(posts._id);
            if (response.success) {
                setPostData((prev) => {
                    if (prev) {
                        return {
                            ...prev,
                            isBlocked: !postData.isBlocked
                        };
                    }
                    return prev;
                });
                toast.success(`Post ${response.updatedStatus ? 'blocked' : 'unblocked'} successfully`);
            } else {
                toast.error("Failed to update post status");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setLoading?.(false);
        }
    };
    return (
        // <tr className="border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
        <tr className="border-b border-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-green-200 dark:hover:text-white hover:text-green-900">


            <td className="py-4 px-4 whitespace-nowrap ">
                <div className="flex items-center">
                    <img src={posts?.imageUrl ||"https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D" } 
                    alt="Profile" className="h-10 w-10" /> 
                    <div className="ml-4">
                        {/* <div className="text-sm font-medium text-gray-900 dark:text-white">{userData?.name}</div> */}
                        {/* <div className="text-sm text-gray-500 dark:text-gray-400">{report.postId}</div> */}
                    </div>
                </div>
            </td>

            <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-400">{userData?.name}</td>
            <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-400">{postData?.likesDetails.likes.length}</td>
            <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{postData?.commentsDetails.comments.length}</td>
            <td className="py-4 px-4 whitespace-nowrap text-sm text-red-500 font-bold dark:text-gray-400">{reportData?.length}</td>
            
            <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <button className="w-36 h-8 rounded bg-gray-300 font-bold hover:scale-105" onClick={toggleReportModal}>
                        View Reports
                    </button>
                </td>
            {/* <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                <button className="w-36 h-8 rounded bg-gray-300 font-bold hover:scale-105">
                    View post
                </button>
            </td> */}

          



            <td className="py-4 px-4 whitespace-nowrap text-right text-sm font-medium">
                {postData?.isBlocked ? (
                    <button
                    onClick={() => toggleBlockModal(false)}
                    className="w-28 inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-transform duration-300 transform hover:scale-110"
                    >
                    Unblock 
                    </button>
                ) : (
                    <button
                    onClick={() => toggleBlockModal(true) }
                    className="w-28 inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-transform duration-300 transform hover:scale-110"
                    >
                    Block Post
                    </button>
                )}
            </td>
            <ReportModal isOpen={isReportModalOpen} closeModal={toggleReportModal} reportData={reportData} />
            <BlockPostModal isOpen={isBlockModalOpen} closeModal={() => setIsBlockModalOpen(false)} onConfirm={handleBlockUnblockPost} isBlocking={isBlocking} />

             </tr>
    );
}

export default TableData;
