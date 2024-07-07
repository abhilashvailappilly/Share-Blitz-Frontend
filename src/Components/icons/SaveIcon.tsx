import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { savePost, unSavePost } from '../../Api/user/postApiMethod';
import { PostI } from '../../Types/User/Post';
import { toast } from 'react-toastify';
import useAppSelector from '../../hooks/UseSelector';
import { savedPost } from '../../Types/User/SavedPosts';

interface SaveIcnProps {
  size: { width: number; height: number };
  post: PostI; 
}

const SaveIcn: React.FC<SaveIcnProps> = ({ size, post,  }) => {
  const user = useSelector((state: any) => state?.user?.userData); 
  const savedPosts = useAppSelector((state) => state.post.savedPosts);

  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    if (savedPosts?.some((savedPost :savedPost) => savedPost.postId === post._id)) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  }, [user, post]);

  const saveOrUnsave = async() => {
    try {
      if (isSaved) {
        const response = await unSavePost(post?._id)
        if(!response.success){
        return  toast.error(response?.message)
        } 
      setIsSaved(false);
      toast.success("Un saved successfuly")

      } else {
        const response = await savePost(post?._id)
        if(!response.success){
        return  toast.error(response?.message)
        } 
      setIsSaved(true);
      toast.success("Post saved successfuly")
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
      <svg
        onClick={saveOrUnsave}
        className="cursor-pointer ml-auto mr-2"
        width={size?.width}
        height={size?.height}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="#050505"
          strokeWidth="1.056"
        >
          <path
            fill={"#efebeb"}
            fillRule="evenodd"
            d="M4 5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v15.138a1.5 1.5 0 0 1-2.244 1.303l-5.26-3.006a1 1 0 0 0-.992 0l-5.26 3.006A1.5 1.5 0 0 1 4 20.138V5zm11 4a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2h6z"
            clipRule="evenodd"
          ></path>
        </g>
        <g id="SVGRepo_iconCarrier">
          <path
            fill={!isSaved ? "#efebeb" : "#3F5D75"}
            fillRule="evenodd"
            d="M4 5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v15.138a1.5 1.5 0 0 1-2.244 1.303l-5.26-3.006a1 1 0 0 0-.992 0l-5.26 3.006A1.5 1.5 0 0 1 4 20.138V5zm11 4a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2h6z"
            clipRule="evenodd"
          ></path>
        </g>
      </svg>
    </>
  );
};

export default SaveIcn;
