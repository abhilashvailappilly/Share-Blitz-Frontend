
"use client";

import { Button, Modal, Select } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaShare,FaHeart,FaSave } from "react-icons/fa";
import { getUser } from "../../../Api/user/authApiMethod";
import ProfileDataInterface from "../../../Types/User/userProfile";
import SaveIcn from "../../icons/SaveIcon";
import Heart from "../../options/Heart";
import CommentIcn from "../../icons/CommentIcon";
import { toast } from "react-toastify";
interface PostI {
    _id:string
    imageUrl:string 
    caption :string
    userId:string
    like:number
    hashtags:string[]
}
interface SingleImageModalPropsInterface {
    show : boolean
    setShow:(value:boolean)=>void
    post:PostI
}

const comments = ['hello ','hai']

const SingleImageModal =({show,setShow ,post} : SingleImageModalPropsInterface ) => {
  const [openModal, setOpenModal] = useState(true);
  const [modalSize, setModalSize] = useState<string>('md');
  const [isLoading,setIsLoading] = useState<Boolean>(false)
  const [userData,setUserData] = useState<ProfileDataInterface>()
  const [postt ,setPost] = useState<PostI>(post)
  const [err,setError] = useState('')
  useEffect(()=>{
    const fetchUserData=async()=>{
      try{
        const res=await getUser(post.userId)
        if(res){
         
          setUserData(res);
        
        }
      }catch(error){
        console.log(error)
      }
    } 
    fetchUserData()
  },[postt.userId]);
 
  const handleClose = ()=>{
    setShow(false)
  }

  return (
    <>
       <div className={`${
                show ? 'block' : 'hidden'}
       fixed inset-0 flex items-center justify-center bg-black bg-opacity-110 backdrop-blur-sm z-50`}>
      <div className="bg-white rounded-lg overflow-hidden w-11/12 md:w-3/4 lg:w-1/2">
        <div className="flex justify-between items-center p-4 border-b">

          <div className="flex space-x-3">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-green-300">
            <img src={userData?.profileImageUrl} className="w-full h-full object-cover" alt="" />
          </div>
          <h3 className="text-lg font-semibold">{userData?.name}</h3>
          </div>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700 w-3 h-3 text-2xl font-bold">
            X
          </button>
        </div>
        <div className="p-4">
          <img src={post.imageUrl} alt={post.caption} className="w-full h-96 object-cover" />
          <div className="mt-4">
            {/* <h4 className="text-lg font-semibold mb-2 underline">view all comments</h4>
            <div className="space-y-2">
              
            </div> */}
            <div className="w-full flex bg-white h-10">
               <div className="w-1/3 h-full bg-green-100 flex justify-between">
              <div className="w-full mr-3">
              <Heart size={{ width: 34, height: 36 }} color={'red'} post={post} setPost={setPost}  />
              <span className="font-bold">{post?.like}</span> likes
              </div>
              <div className="w-full">
              <CommentIcn size={{ width: 33, height: 31 }} post={post} />
              </div>
              <FaShare className="text-black text-2xl"/>
               </div>
               <SaveIcn size={{ width: 36, height: 37 }} setError={setError}  post={post} />
            </div>
            
          </div>
          <div className="mt-4">
            <h4 className="text-lg font-semibold mb-2 underline">view all comments</h4>
            <div className="space-y-2">
              {/* {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <div key={index} className="p-2 border rounded">
                    {comment}
                  </div>
                ))
              ) : (
                <div className="text-gray-500">No comments available</div>
              )} */}
            </div>
            
          </div>
        </div>

        
      </div>
    </div>
    </>
  );
}
export default SingleImageModal



