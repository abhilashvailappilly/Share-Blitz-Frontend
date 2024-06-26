"use client";

import { useEffect, useRef, useState } from "react";
import { FaShare, FaPaperPlane, FaComment } from "react-icons/fa";
import Heart from "../../options/Heart";
import { toast } from "react-toastify";
import { commentOnPost } from "../../../Api/user/postApiMethod";

import { CommentModalPropsInterface, Comment } from "../../../Types/User/Comment";
import { Like, PostI } from "../../../Types/User/Post";
import SingleComment from "../Comments/SingleComment";

const CommentModal = ({ show, setShow, post, user, setComment }: CommentModalPropsInterface) => {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [userComment, setUserComment] = useState('');
  const [postData, setPostData] = useState<PostI>(post);
  const [err, setError] = useState('');

  const commentInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (show && commentInputRef.current) {
      commentInputRef.current.focus();
    }
  }, [show]);

  const handleClickComment = async () => {
    try {
      if (userComment.trim().length <= 0) {
        return toast.info("Comment cannot be empty !!");
      }
      const addComment = await commentOnPost(post._id, userComment);
      if (!addComment.success) return toast.error(addComment.commentData?.message);
      toast.success("Commented successfully");
      setPostData(prevState => ({
        ...prevState,
        commentsDetails: {
          ...prevState.commentsDetails,
          comments: addComment.commentData.comments
        }
      }));
      setIsLoading(true);
      setUserComment("");
      setComment && setComment(addComment?.commentData.comments);
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  const addLike = (newLike: Like[] | []) => {
    setPostData(prevState => ({
      ...prevState,
      likesDetails: {
        ...prevState.likesDetails,
        likes: newLike
      }
    }));
  };

  const handleShareClick = async () => {
    const postUrl = `http://localhost:5173/post/${post._id}`; // Construct the post URL
    try {
      const response = await fetch(postData.imageUrl);
      const blob = await response.blob();
      const file = new File([blob], "image.jpg", { type: blob.type });

      if (navigator.share) {
        try {
          await navigator.share({
            title: 'Check out this post!',
            text: 'Hey, look at this post I found!',
            url: postUrl,
            files: [file],
          });
          toast.success("Link and image shared successfully!");
        } catch (error) {
          toast.error("Failed to share the link and image.");
        }
      } else {
        toast.error("Web Share API is not supported in your browser.");
      }
    } catch (error) {
      toast.error("Failed to fetch the image.");
    }
  };

  return (
    <>
      <div className={`${show ? 'block' : 'hidden'} fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50`}>
        <div className="bg-white dark:bg-gray-800 rounded-lg h-[700px] md:h-[500px] w-11/12 md:w-3/4 lg:w-1/2">
          <div className="flex w-full h-1/6 justify-between items-center border-b border-gray-300 dark:border-gray-600">
            <div className="flex space-x-3">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-green-300">
                <img src={user?.profileImageUrl} className="w-full h-full object-cover" alt="" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{user?.name}</h3>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{user?.userName}</h3>
            </div>
            <button onClick={handleClose} className="text-gray-500 mr-5 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-400 w-3 h-3 text-2xl font-bold">
              X
            </button>
          </div>
          <div className="w-full h-5/6 md:flex-row flex flex-col bg-white dark:bg-gray-800 overflow-hidden">
            <div className="w-full md:w-1/2 h-full flex flex-col">
              <div className="flex-grow md:h-full bg-white dark:bg-gray-800">
                <img src={postData.imageUrl} alt="" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="w-full md:w-1/2 h-full bg-white dark:bg-gray-800">
              <div className="w-full h-full bg-white dark:bg-gray-800 overflow-y-auto p-0">
                {postData?.commentsDetails?.comments?.length > 0 ? (
                  postData?.commentsDetails?.comments.map((comment: Comment, index) => {
                    return (
                      <SingleComment key={index} setPostData={setPostData} postId={postData._id} isLoading={isLoading} comment={comment} index={index} />
                    );
                  })
                ) : (
                  <div className="w-full border-black border-2 dark:border-gray-600 rounded-xl flex items-start mb-4 p-3">
                    <h1 className="text-gray-800 dark:text-gray-200">No comments available</h1>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 w-full flex h-[50px] rounded-lg mt-1">
            <div className="flex justify-around items-center p-1 w-1/2">
              <span className="text-red-500">{postData.likesDetails.likes.length}</span>
              <Heart size={{ width: 34, height: 36 }} color={'red'} post={post} addLike={addLike} />
              <span className="text-blue-500">{postData.commentsDetails?.comments.length}</span>
              <FaComment size={24} className="text-blue-500 hover:cursor-pointer" />
              <FaShare size={24} onClick={handleShareClick} className="text-green-500 hover:cursor-pointer" />
            </div>
            <div className="w-1/2 flex h-full bg-white dark:bg-gray-800 rounded-lg">
              <input type="text" value={userComment} ref={commentInputRef} onChange={(e) => { setUserComment(e.target.value) }} className="my-auto rounded-lg ml-2 p-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200" placeholder="Write comment" />
              <FaPaperPlane size={25} onClick={handleClickComment} className="text-black dark:text-gray-200 hover:cursor-pointer hover:scale-110 transition-transform my-auto mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CommentModal;
