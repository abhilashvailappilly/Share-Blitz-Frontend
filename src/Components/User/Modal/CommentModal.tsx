"use client";

import { useEffect, useRef, useState } from "react";
import { FaPaperPlane, FaComment } from "react-icons/fa";
import Heart from "../../options/Heart";
import { toast } from "react-toastify";
import { commentOnPost } from "../../../Api/user/postApiMethod";

import {
  CommentModalPropsInterface,
  Comment,
} from "../../../Types/User/Comment";
import { Like, PostI } from "../../../Types/User/Post";
import SingleComment from "../Comments/SingleComment";

const CommentModal = ({
  show,
  setShow,
  post,
  user,
  setComment,
}: CommentModalPropsInterface) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userComment, setUserComment] = useState("");
  const [postData, setPostData] = useState<PostI>(post);

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
      if (!addComment.success)
        return toast.error(addComment.commentData?.message);
      toast.success("Commented successfully");
      setPostData((prevState) => ({
        ...prevState,
        commentsDetails: {
          ...prevState.commentsDetails,
          comments: addComment.commentData.comments,
        },
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
    setPostData((prevState) => ({
      ...prevState,
      likesDetails: {
        ...prevState.likesDetails,
        likes: newLike,
      },
    }));
  };

  return (
    <>
      <div
        className={`${
          show ? "block" : "hidden"
        } fixed top-0 left-0 right-0 h-full flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50`}
      >
        <div className="bg-white dark:bg-gray-800 rounded-lg fixed h-screen w-full md:h-[500px] md:w-3/4 lg:w-1/2 flex flex-col">
          <div className="flex w-full justify-between items-center border-b border-gray-300 dark:border-gray-600 p-4">
            <div className="flex space-x-3">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-green-300">
                <img
                  src={user?.profileImageUrl}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {user?.name}
              </h3>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-400 text-2xl font-bold"
            >
              X
            </button>
          </div>
          <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
            <div className="md:w-1/2 flex flex-col">
              <div className="flex-grow bg-white dark:bg-gray-800">
                <img
                  src={postData.imageUrl}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="md:w-1/2 flex flex-col overflow-y-auto no-scrollbar">
              <div className="w-full bg-white dark:bg-gray-800 p-4 flex-grow">
                {postData?.commentsDetails?.comments?.length > 0 ? (
                  postData?.commentsDetails?.comments.map(
                    (comment: Comment, index) => {
                      return (
                        <SingleComment
                          key={index}
                          setPostData={setPostData}
                          postId={postData._id}
                          isLoading={isLoading}
                          comment={comment}
                          index={index}
                        />
                      );
                    }
                  )
                ) : (
                  <div className="w-full border-black border-2 dark:border-gray-600 rounded-xl flex items-start mb-4 p-3">
                    <h1 className="text-gray-800 dark:text-gray-200">
                      No comments available
                    </h1>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 w-full flex items-center p-4 space-x-2">
            <div className="flex items-center space-x-4">
              <span className="text-red-500">
                {postData.likesDetails.likes.length}
              </span>
              <Heart
                size={{ width: 34, height: 36 }}
                color={"red"}
                post={post}
                addLike={addLike}
              />
              <span className="text-blue-500">
                {postData.commentsDetails?.comments.length}
              </span>
              <FaComment
                size={24}
                className="text-blue-500 hover:cursor-pointer"
              />
            </div>
            <div className="flex-grow flex items-center space-x-2">
              <input
                type="text"
                value={userComment}
                ref={commentInputRef}
                onChange={(e) => {
                  setUserComment(e.target.value);
                }}
                className="flex-grow p-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg"
                placeholder="Write a comment"
              />
              <FaPaperPlane
                size={25}
                onClick={handleClickComment}
                className="text-black dark:text-gray-200 hover:cursor-pointer hover:scale-110 transition-transform"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentModal;
