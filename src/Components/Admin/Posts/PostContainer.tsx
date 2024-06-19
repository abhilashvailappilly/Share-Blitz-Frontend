import { GetAllPosts } from "@/Api/admin/adminApiMethod"
import { PostI } from "@/Types/User/Post";
import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import TableData from "./Table";


const PostContainer = () => {
    const [postData ,setPostData] = useState<PostI[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(()=>{
        fetchPostData()
    },[])
    const fetchPostData = async()=>{
        try {
        const response = await GetAllPosts()
        if (response.success){
            setPostData(response.posts)
        }
            
        } catch (error) {
            console.log(error)
        }
    }
    const updateUserStatus = (userId: string, newStatus: boolean) => {
        toast.info("updated ")
    //    const updatedUsers = reports.map(user => {
    //         if (user.postId === userId) {
    //             return { ...user, actionTaken: true };
    //         }
    //         return user;
    //     });
    //     console.log(userId,newStatus)
    //     console.table(updatedUsers)
    //     toast.info("update d status")
    //     setReports(updatedUsers);
    };
  return (
    <div className="h-screen w-full bg-white flex flex-col items-center ">
      <h1 className="  font-bold mt-4">Post Management</h1>
      <section className="container px-4 mx-auto flex flex-col justify-center items-center min-h-screen ">
            <div className="flex items-center gap-x-3">
                <h2 className="text-lg font-bold text-green-700 dark:text-white">Report MANAGEMENT</h2>
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
                                                <span>Post</span>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-12 py-3.5 text-sm font-bold text-left rtl:text-right  dark:text-gray-400">
                                            <div className="flex items-center">
                                                <span>User name</span>
                                                <svg className="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right  dark:text-gray-400">
                                            <div className="flex items-center">
                                                <span>Likes</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4"></svg>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-4  py-3.5 text-sm font-bold text-left rtl:text-right  dark:text-gray-400">
                                            <div className="flex items-center">
                                                <span>Comments</span>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right  dark:text-gray-400"> Reports</th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right  dark:text-gray-400">View Reports</th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right  dark:text-gray-400">Reports</th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right  dark:text-gray-400">Action</th>

                                        {/* <th scope="col" className="relative py-3.5  px-4">
                                            <span className="sr-only">Edit</span>
                                        </th> */}
                                    </tr>
                                </thead>
                                {/* <tbody className="bg-dark divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900 border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"> */}
                                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                    {postData.map((posts: any, index: any) => (
                                        <TableData key={index} posts={posts} updatedUsers={updateUserStatus} setLoading={setLoading} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="flex mt-5">
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
                    disabled={currentPage === Math.ceil(total / usersPerPage)} 
                >
                    Next
                </button>
            </div> */}
        </section>
    </div>
  )
}

export default PostContainer
