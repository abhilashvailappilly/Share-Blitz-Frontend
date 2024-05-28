import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import { likePost, unlikePost } from '../../Api/user/authApiMethod';
import { likePost,unlikePost } from '../../Api/user/postApiMethod';
import { showError } from '../../hooks/errorManagement';
import { RootState } from '../../Store/store';
import { toast } from 'react-toastify';

interface ErrorObject {
  message?: string;
}
interface Like {
  userId: string;
  likedAt: string; // Include a timestamp or any additional fields if needed
}
interface HeartProps {
  size: { width: number; height: number };
  color: string;
  post: any; // Adjust type as per your post structure
  setPost: React.Dispatch<React.SetStateAction<any>>; 
  addLike: (newLike: Like[] | []) => void;
}
interface User {
    _id:string
}

const Heart: React.FC<HeartProps> = ({ size, color, post, setPost ,addLike}) => {
  const [isRed, setIsRed] = useState<boolean>(false);
  // const user : User = useSelector((state: RootState) => state.auth.userInfo as User);
  const {userInfo} = useSelector((state: RootState)=>state.auth)
  // const loadedPosts2 : Post[] =  useSelector((state : RootState) => state?.post?.loadedPosts);

  const [error, setError] = useState<ErrorObject | null>(null);

  useEffect(() => {
    // console.log('worked show error in heart',error)
    showError(error, setError);
  }, [error]);

  useEffect(() => {
    if(color==='red'){
      setIsRed(true)
    }

    setIsRed(post?.likesDetails?.likes?.some((user :{userId:string} )=> user.userId == userInfo?._id));
  }, [userInfo, post]);

  const likeOrUnlike = async () => {
    try {
      if (isRed) {
        const response = await unlikePost( post?._id);
        if(response.success){
          toast.success('UnLiked the post !!')
          addLike(response?.postData?.likes)
        } else {
          toast.error(response?.message)
        }
        
      } else {
        const response = await likePost( post?._id);
        if(response.success){
          toast.success('Liked the post !!')
          addLike(response?.postData?.likes)
        } else {
          toast.error(response?.message)
        }
      }
    } catch (error : any) {
      setError(error)
    }
  };

  return (
    <>
      <svg
        className={`cursor-pointer ml-1 `}
        onClick={likeOrUnlike}
        width={size.width}
        height={size.height}
        
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="#030303"
          strokeWidth="2.592"
        >
          <path
            d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
            fill={!isRed ? '#d4d4d8' : '#d62929'}
          ></path>
        </g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
            fill={!isRed ? '#d4d4d8' : '##eb0c31'}
          ></path>
        </g>
      </svg>
    </>
  );
};

export default Heart;
