import React, { memo, useEffect, useState } from "react";
import  {  useRef,  Dispatch, SetStateAction } from 'react';

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import { getUser } from "../../services/apiMethods";
import Dropdown from "../../options/Dropdown";
import CaptionWithShowMore from "../../options/Caption";
import Heart from "../../options/Heart";
import SaveIcn from "../../icons/SaveIcon";
import CommentIcn from "../../icons/CommentIcon";
import ConnectionBtn from "../../icons/ConnectionBtn";
import ProfilePic from "../Profile/ProfilePic";
import NameField from "../Profile/ProfileName";
import { RootState } from "../../../Store/store";
import { getUser } from "../../../Api/user/authApiMethod";
// import store from '../../../Store/store'

interface Post {
  _id: string;
  userId: string;
  image: string;
  description: string;
  // likes: string[]; 
}
interface Post2 {
  _id:string
  userId:string
  caption:string
  imageUrl:string
  tag:string[] 
}

interface User {
  _id: string;
  name: string;
  username: string;
  profileImageUrl: string;
}

interface Props {
  postData: Post;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
  openEditor: () => void;
  setLikePost: React.Dispatch<React.SetStateAction<Post | null>>;
  likeModal: React.RefObject<HTMLButtonElement>;
}

interface SinglePostProps {
  likeModal: React.RefObject<HTMLDivElement>;
  setLikePost: Dispatch<SetStateAction<Post2 | undefined>>;
  setSelectedPost: Dispatch<SetStateAction<Post2 | undefined>>;
  postData: Post2;
  openEditor: React.RefObject<HTMLDivElement>;
}
// const SinglePost: React.FC<SinglePostProps> = ({
//   likeModal,
//   setLikePost,
//   setSelectedPost,
//   postData,
//   openEditor
// }) => {
//   // Component logic
// };

const SinglePost: React.FC<SinglePostProps> = ({ postData, setSelectedPost, openEditor, setLikePost, likeModal })=> {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.userInfo);

  const [owner, setOwner] = useState<boolean>(false);
  const [post, setPost] = useState<Post2>(postData);
  const [likes, setLikes] = useState<string[]>([]);
  const [followers, setFollowers] = useState<string[]>([]);
  const [postUser, setPostUser] = useState<User | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
        // user?._id === postDat?._id ? setOwner(false) : setOwner(true); // change to true later
    console.log(post.caption)
    getUser(post?.userId)
      .then((response: User) => {
        setPostUser(response);
		console.log('response user details :',response)
    console.log(post.caption,response?.name)

        user?._id === response?._id ? setOwner(false) : setOwner(true); // change to true later
      })
      .catch((error: Error) => {
        setError(error.message);
      });

    setLikes(['10','12']);
    // setLikes(post?.likes);
  }, [post, user, postData, postUser?._id]);

  useEffect(() => { 
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setError('');
    }
  }, [error]);

 

  const seeProfile = () => {
    navigate(`/profile/${postUser?.username}`);
    toast.success('see profile worked')
  };

  const showLikes = () => {
  console.log('show like worked')
  };

  const handleClickOnUserName =()=>{
	console.log('handleClickOnUserName worked')
  }
  return (
    <>
      <div className="p-4 h-5/6 mt-5 bg-white w-full select-none">
        <div className= "h-full bg-white p-2 rounded-md relative lg:w-[40rem] flex flex-col bulgeBox2">
          <div className="w-full h-16 flex p-2 gap-3 self-center">
            <div className="bg-white ml-1 w-11 h-11 rounded-full self-center cursor-pointer" onClick={seeProfile}>
              <ProfilePic styleProp={"rounded-full"} image={postUser?.profileImageUrl as string || "https://png.pngtree.com/png-vector/20191103/ourmid/pngtree-handsome-young-guy-avatar-cartoon-style-png-image_1947775.jpg"} />
            </div>
            <div className="text-white font-semibold text-lg self-center cursor-pointer" onClick={seeProfile}>
              <NameField name={ postUser?.name as string} doFunction={handleClickOnUserName} styleProp={'font-bold text-black'} />
            </div>
            {owner ? (
              <div className="font-thin font-mono self-center rounded-lg w-16 h-5">
                <ConnectionBtn user={postUser as User} width={20} height={5} color={"white"} setFollowers={setFollowers}/>
              </div>
            ) : null}
            <div className="self-center ml-auto cursor-pointer">
              <Dropdown post={post} postUser={postUser} openEditor={openEditor} setSelectedPost={setSelectedPost} />
            </div>
          </div>
          <div className="max-w-full min-w-full mt-2 aspect-square custom-box p-1 rounded-lg overflow-hidden">
            <img src={post.imageUrl} alt="" className="object-cover w-full h-full " draggable={false} />
          </div>
          <div className="m-2">
            <CaptionWithShowMore text={post.caption} styleProps={'text-black text-base '} />
          </div>
          <div className="mt-1">
          <span onClick={showLikes} className="pl-2 text-black font-bold text-sm  select-none"> 
            100 likes
          </span>

           
            <div className="p-2 text-xl flex gap-5 mt-5 font-bold">
              <Heart size={{ width: 34, height: 36 }} color={'red'} post={post} setPost={setPost} />
              <CommentIcn size={{ width: 33, height: 31 }} post={post} />
              {user?._id !== post?.userId ? (
                <SaveIcn size={{ width: 36, height: 37 }} post={post} setError={setError} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(SinglePost);
