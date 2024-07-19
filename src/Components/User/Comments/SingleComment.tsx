import { Comment } from '../../../Types/User/Comment';
import { useEffect, useState } from 'react';
import { getUser } from '../../../Api/user/authApiMethod'; // You need to implement these API methods
import { toast } from 'react-toastify';
import { getTimeDifference } from '../../../utils/helpers/dateUtil';
import { DeleteComment, GetCommentsReply, ReplyToComment } from '../../../Api/user/postApiMethod';
import ListReplyComment from './ListReplyComment';
import { PostI } from '../../../Types/User/Post';

interface SingleCommentPropsInterface {
  setPostData:React.Dispatch<React.SetStateAction<PostI>>;
  isLoading: Boolean;
  comment: Comment;
  postId: string;
  index: number;
}

const SingleComment = ({setPostData, postId, isLoading, comment, index }: SingleCommentPropsInterface) => {
  const [loading, setLoading] = useState<Boolean>(isLoading);
  const [userDetails, setUserDetails] = useState<{ name: string; profileImageUrl: string }>();
  const [reply, setReply] = useState<string>('');
  const [replies, setReplies] = useState<any[]>([]);
  const [showReplies, setShowReplies] = useState<boolean>(false);
  const [showReplyInput, setShowReplyInput] = useState<boolean>(false);
  const [showDelete,setShowDelete] = useState<boolean>(false)
  useEffect(() => {
    setLoading(true);
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const userDetails = await getUser(comment.userId);
    if (!userDetails.success) {
      setLoading(false);
      return toast.info("User not exist");
    }
    setUserDetails(userDetails.user);
    setLoading(false);
  };

  const handleReplyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReply(e.target.value);
  };

  const handleReplySubmit = async () => {
    const response = await ReplyToComment(postId, comment._id, reply); // Implement this API method
    if (response.success) {
      setReplies([...replies, response.reply]); // Adjust based on your API response
      setReply('');
      toast.success("Reply added successfully");
    } else {
      toast.error("Failed to add reply");
    }
  };
  const deleteCommentClick = async()=>{
    try {
      const response = await DeleteComment(postId,comment._id)
      if(response.success){
        toast.success("Comment deleted successfully")
        setPostData(prevState  => ({
          ...prevState,
          commentsDetails: {
            ...prevState.commentsDetails,
            comments:response?.postData?.comments
          }
        }));
      }else {
        toast.error(response.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const toggleReplies = async () => {
    if (!showReplies) {
      const fetchedReplies = await GetCommentsReply(postId, comment._id); // Implement this API method
      if (!fetchedReplies.success)
        return toast.error("Failed to get reply data");
      setReplies(fetchedReplies.reply);
    }
    setShowReplies(!showReplies);
  };

  const handleReplyClick = () => {
    setShowReplyInput(!showReplyInput);
  };

  if (loading) {
    return (
      <div key={index}  className="text-center h-12 w-full">
        <div role="status">
          <svg aria-hidden="true" className="inline justify-center items-center w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div key={index} > 
      
      <article className="p-6 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
        <footer className="flex justify-between items-center mb-2">
            <div className="flex items-center">
                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                  <img
                        className="mr-2 w-6 h-6 rounded-full"
                        src={userDetails?.profileImageUrl} alt={`${userDetails?.name}'s profile`} />{userDetails?.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400"><time  
                        title="June 23rd, 2022">{getTimeDifference(comment.createdAt.toString())}</time></p>
            </div>
            <button id="dropdownComment4Button" onClick={()=>setShowDelete(!showDelete)} data-dropdown-toggle="dropdownComment4"
                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-40 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                type="button">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                </svg>
            </button>
            {/* <!-- Dropdown menu --> */}
            <div id="dropdownComment4"
            
                className= {`${showDelete ? 'block' : 'hidden'}   z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}>
                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownMenuIconHorizontalButton">
                    <li>
                        <a href="#"
                        onClick={deleteCommentClick}
                            className="block py-2 px-4 mt-3 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
                    </li>
                 
                </ul>
            </div>
        </footer>
        <p className="text-gray-500 dark:text-gray-400">{comment.comment}</p>
        <div className="flex items-center mt-4 space-x-4">
            <button type="button"
            onClick={toggleReplies}
                className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
              
                {showReplies ? 'Hide Replies' : `Show Replies `}
            </button>
            <button type="button"
            onClick={handleReplyClick}
                className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
                <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
                </svg>
                Reply
            </button>
        </div>
    {showReplies && (
          <div>
            {replies.map((reply, index) => (
              <ListReplyComment reply={reply?.reply} userId={reply?.userId} index={index} key={index} />
            ))}
          </div>
        )}
    {showReplyInput && (
          <div className="mt-2">
            <input
              type="text"
              value={reply}
              onChange={handleReplyChange}
              placeholder="Write a reply..."
              className="border rounded-sm p-2 w-full dark:bg-gray-800 bg-white"
            />
            <button onClick={handleReplySubmit} className="mt-2 bg-blue-500 text-white rounded p-2">
              Reply
            </button>
          </div>
        )}
    
    </article>

    </div>
  );
};

export default SingleComment;
