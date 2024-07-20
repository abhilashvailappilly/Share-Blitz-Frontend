import { GetAllPosts } from "@/Api/admin/adminApiMethod";
import { PostI } from "@/Types/User/Post";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TableData from "./Table";
import LoaderCircle from "@/Components/Common/Loader/LoaderCircle";
import { Search } from "@mui/icons-material"; 
import { debounce } from "@/utils/helpers/Debounce";

const PostContainer = () => {
  const [postData, setPostData] = useState<PostI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPosts, setTotalPosts] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>(""); // State for search term
  const postsPerPage: number = 5; // Define the number of posts per page

  useEffect(() => {
    fetchPostData();
  }, [currentPage]);

  // Debounced search function
  const fetchPostData = debounce(async () => {
    try {
      const response = await GetAllPosts(currentPage, searchTerm);
      if (response.success) {
        setPostData(response?.posts);
        setTotalPosts(response?.total as number);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch post data.");
      setLoading(false);
    }
  }, 300); // Adjust the debounce delay as needed

  useEffect(() => {
    fetchPostData(); // Trigger debounced fetch when searchTerm changes
  }, [searchTerm]);

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <LoaderCircle />
      </div>
    );
  }

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  return (
    <div className="h-screen w-full bg-white dark:bg-slate-800 flex flex-col items-center">
      <h1 className="font-bold mt-4 text-black dark:text-white">Post Management</h1>
      <section className="container px-4 mx-auto flex flex-col justify-center items-center min-h-screen">
        <div className="flex flex-col mt-6">
          <div className="flex justify-between items-center mb-4">
            {/* Search Bar */}
            <div className="relative w-full max-w-xs">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value); // Update search term
                  fetchPostData(); // Trigger debounced search
                }}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md w-full dark:bg-gray-800 dark:text-white"
              />
              <Search
                className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                fontSize="small"
              />
            </div>
          </div>
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border-gray-200 dark:border-gray-700 border-2 rounded-full shadow-2xl bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <thead className="bg-green-600 text-white font-bold dark:bg-gray-800">
                    <tr>
                      <th className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right dark:text-gray-400">Post</th>
                      <th className="px-12 py-3.5 text-sm font-bold text-left rtl:text-right dark:text-gray-400">User name</th>
                      <th className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right dark:text-gray-400">Likes</th>
                      <th className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right dark:text-gray-400">Comments</th>
                      <th className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right dark:text-gray-400">Reports</th>
                      <th className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right dark:text-gray-400">View Reports</th>
                      <th className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right dark:text-gray-400">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {postData.map((posts: PostI, index: number) => (
                      <TableData key={index} posts={posts} setLoading={setLoading} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="flex mt-5">
            <button
              className={`flex items-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md dark:bg-gray-900 dark:text-gray-200 hover:bg-green-600 dark:hover:bg-green-600 hover:text-white dark:hover:text-gray-200 ${currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={`items-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:flex dark:bg-gray-900 dark:text-gray-200 hover:bg-green-600 dark:hover:bg-green-600 hover:text-white dark:hover:text-gray-200 ${index + 1 === currentPage ? 'bg-green-600 text-white' : ''}`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className={`flex items-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md dark:bg-gray-900 dark:text-gray-200 hover:bg-green-600 dark:hover:bg-green-600 hover:text-white dark:hover:text-gray-200 ${currentPage === totalPages ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PostContainer;
