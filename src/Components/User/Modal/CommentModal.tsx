
"use client";

import { Button, Modal, Select } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaShare,FaHeart,FaSave, FaPaperPlane, } from "react-icons/fa";
import { getUser } from "../../../Api/user/authApiMethod";
import ProfileDataInterface from "../../../Types/User/userProfile";
import SaveIcn from "../../icons/SaveIcon";
import Heart from "../../options/Heart";
import CommentIcn from "../../icons/CommentIcon";
import { toast } from "react-toastify";
import { commentOnPost } from "../../../Api/user/postApiMethod";

import { CommentModalPropsInterface,Comment } from "../../../Types/User/Comment";
import { PostI } from "../../../Types/User/Post";
import SingleComment from "../Comments/SingleComment";
import Loader from "../../icons/Loader";


const CommentModal =({show,setShow,post,user } : CommentModalPropsInterface ) => {
  const [openModal, setOpenModal] = useState(true);
  const [modalSize, setModalSize] = useState<string>('md');
  const [isLoading,setIsLoading] = useState<Boolean>(false)
  const [userData,setUserData] = useState<ProfileDataInterface>()
  const [userComment,setUserComment] = useState('')
  const [postData,setPostData] = useState<PostI>(post)
  const [err,setError] = useState('')
  
const handleClickComment = async()=>{
  try {
    if(userComment.trim().length <= 0){
      return toast.info("Comment cannot be empty !!")
    }
    const addComment = await commentOnPost(post._id,userComment)
    if(!addComment.success) 
       return  toast.error(addComment.commentData?.message)
    toast.success("Commented successfully")
    setPostData(prevState  => ({
      ...prevState,
      commentsDetails: {
        ...prevState.commentsDetails,
        comments:addComment.commentData.comments
      }
    }));
    setIsLoading(true)
    setUserComment("")
    setTimeout(()=>{
      setIsLoading(false)
    },3000)

  } catch (error) {
    console.log(error)
  }
}
  const handleClose = ()=>{
    setShow(false)
  }



  return (
    <>
       <div className={`${
                show ? 'block' : 'hidden'}
       fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm  z-50`}>
      <div className="bg-white rounded-lg overflow-hidden   h-[500px]  w-11/12 md:w-3/4 lg:w-1/2">
        <div className="flex w-full h-1/6 justify-between items-center  border-black">

          <div className="flex space-x-3">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-green-300">
            <img src={user?.profileImageUrl} className="w-full h-full object-cover" alt="" />
          </div>
          <h3 className="text-lg font-semibold">{user?.name}</h3>
          </div>
          <button onClick={handleClose} className="text-gray-500 mr-5 hover:text-gray-700 w-3 h-3 text-2xl font-bold">
            X
          </button>
        </div> 
        <div className=" w-full h-5/6 md:flex  flex bg-red-200 ">
          <div className=" w-full md:w-1/2 sm:flex sm:w-1/2  h-full bg-white">
            <img src={postData.imageUrl} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="w-full md:w-1/2  sm:w-1/2 h-full bg-white ">
          <div className="w-full h-4/5 bg-white overflow-y-scroll no-scrollbar p-4">
            {
              postData?.commentsDetails?.comments?.length > 0 ? (
                 postData?.commentsDetails?.comments.map((comment :Comment, index) => {
                  return (
                   <SingleComment isLoading ={isLoading} comment={comment} index={index}/>
                  );
                }) 
              ) :(
                <div  className="w-full border-black border-2 rounded-xl flex items-start mb-4 p-3">
                 <h1>No comments available</h1>
                </div>
              ) 
      }
  
           </div>
           <div className="w-full flex h-1/5  bg-white">
           <input type="text" value={userComment} onChange={(e)=>{setUserComment(e.target.value)}} className="w-4/5 h-3/5 my-auto rounded-lg ml-2 p-2" placeholder="Write comment" />
          
            <FaPaperPlane size={37} onClick={handleClickComment} className="text-black hover:cursor-pointer hover:scale-110 transiction-transform my-auto mx-auto" />
        
           </div>
          </div>
         
        </div>
        
      </div>
    </div>
    </>
  );
}
export default CommentModal



