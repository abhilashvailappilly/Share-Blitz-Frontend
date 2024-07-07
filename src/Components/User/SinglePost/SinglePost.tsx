import React, { memo, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
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
import CommentModal from "../Modal/CommentModal";
import { PostI } from "../../../Types/User/Post";
import { Like } from "../../../Types/User/Post";
import PostLikesModal from "../Modal/PostLikesModal";
import { Comment, User } from "../../../Types/User/Comment";
import useNavigateToProfile from "../../../hooks/UseNavigateToProfile";

interface SinglePostProps {
  setSelectedPost: React.Dispatch<React.SetStateAction<PostI | undefined>>;
  postData: PostI;
  openEditor: React.RefObject<HTMLDivElement>;
}

const SinglePost: React.FC<SinglePostProps> = ({ postData, setSelectedPost, openEditor }) => {

  console.log("postdatta >......>", postData)
  const cardClasses = "max-w-md mx-auto bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden";
  const textClasses = "text-zinc-900 dark:text-zinc-100";
  const buttonClasses = "text-zinc-500 dark:text-zinc-300";
  const iconClasses = "w-6 h-6";

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.userInfo);

  const [owner, setOwner] = useState<boolean>(false);
  const [commentModal, setCommentModal] = useState(false);
  const [post, setPost] = useState<PostI>(postData);
  const [showLikeModal, setShowLikeModal] = useState<boolean>(false);
  const [followers, setFollowers] = useState<string[]>([]);
  const [postUser, setPostUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");
  const [hover, setHover] = useState<boolean>(false);
  const navigateToProfile = useNavigateToProfile();

  const addLike = useCallback((newLike: Like[] | []) => {
    setPost((prevState) => ({
      ...prevState,
      likesDetails: {
        ...prevState.likesDetails,
        likes: newLike,
      },
    }));
  }, []);

  const viewProfile = (userId: string) => {
    navigateToProfile(userId);
  };

  const setComment = useCallback((newComment: Comment[] | []) => {
    setPost((prevState) => ({
      ...prevState,
      commentsDetails: {
        ...prevState.commentsDetails,
        comments: newComment,
      },
    }));
  }, []);

  useEffect(() => {
    console.log("useeffect post id ............................................")
    console.log(post.userId)
    getUser(post?.userId)
      .then((response: { success: Boolean; user: User }) => {
        setPostUser(response?.user);
        user?._id === response?.user?._id ? setOwner(false) : setOwner(true); // change to true later
      })
      .catch((error: Error) => {
        setError(error.message);
      });
  }, [post, user]);

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
      setError("");
    }
  }, [error]);

  const seeProfile = useCallback(() => {
    navigate(`/profile/${postUser?._id}`);
  }, [navigate, postUser]);

  const showLikes = useCallback(() => {
    setShowLikeModal(true);
  }, []);

  const handleClickOnUserName = useCallback(() => {
    console.log("handleClickOnUserName worked");
  }, []);

  return (
    <>
      <div className={`overflow-y-auto p-4 h-5/6 mt-5 bg-white w-full select-none border shadow-xl border-white dark:bg-gray-900`}>
        <div className={`h-full sm:h-[600px] bg-white dark:bg-gray-900 p-2 rounded-md relative lg:w-[40rem] flex flex-col ${cardClasses}`}>
          <div className="w-full h-16 flex bg-gray-900 p-2 gap-3 self-center">
            <div className="bg-white ml-1 w-11 h-11 rounded-full self-center cursor-pointer" onClick={seeProfile}>
              <ProfilePic
                styleProp={"rounded-full"}
                image={
                  (postUser?.profileImageUrl as string) ||
                  "https://png.pngtree.com/png-vector/20191103/ourmid/pngtree-handsome-young-guy-avatar-cartoon-style-png-image_1947775.jpg"
                }
              />
            </div>
            <div className="text-white font-semibold text-lg self-center cursor-pointer" onClick={seeProfile}>
              <NameField
                name={postUser?.name as string}
                doFunction={handleClickOnUserName}
                styleProp={"font-bold text-black dark:text-white"}
              />
            </div>
            {/* {owner ? (
              <div className="font-thin font-mono self-center rounded-lg w-16 h-5">
                <ConnectionBtn
                  user={postUser as User}
                  width={20}
                  height={5}
                  color={"white"}
                  setFollowers={setFollowers}
                />
              </div>
            ) : null} */}
            <div className="self-center ml-auto cursor-pointer">
              <Dropdown post={post} postUser={postUser} openEditor={openEditor} setSelectedPost={setSelectedPost} />
            </div>
          </div>
          <div 
            className="max-w-full h-3/4 min-w-full mt-2 custom-box p-1 rounded-lg overflow-hidden"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <img src={post.imageUrl} alt="" className="object-cover w-full h-full" draggable={false} />
            {hover && post.taggedUsers.length > 0 && (
              <div className="absolute inset-20  h-3/4  bg-black bg-opacity-5 flex flex-wrap justify-center items-center">
                {post.taggedUsers.map(user => (
                  <div key={user.userId.toString()} onClick={() => viewProfile(user.userId as string)} className="text-white m-1  bg-black bg-opacity-70 p-1 rounded-lg">
                    {user.userName}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="m-2">
            <CaptionWithShowMore text={post.caption} styleProps={"text-black dark:text-white text-base "} />
          </div>
          <div className="mt-1 flex flex-col bg-gray-900">
            <div className="p-2 text-xl flex gap-5 mt-0 font-bold">
              <Heart size={{ width: 34, height: 36 }} color={"red"} post={post} addLike={addLike} />
              <CommentIcn size={{ width: 33, height: 31 }} post={post} setShow={setCommentModal} />
              {user?._id !== post?.userId ? (
                <SaveIcn size={{ width: 36, height: 37 }} post={post} setError={setError} />
              ) : null}
            </div>
            <span
              onClick={showLikes}
              className="pl-2 hover:cursor-pointer hover:scale-95 hover:font-bold text-black dark:text-white font-bold text-sm select-none"
            >
              {post?.likesDetails?.likes.length || 0} Likes
            </span>
            <span
              className="hover:cursor-pointer hover:scale-100 hover:font-bold text-black dark:text-white"
              onClick={() => setCommentModal(true)}
            >
              View all {post?.commentsDetails?.comments.length} comments
            </span>
          </div>
        </div>
      </div>
      {commentModal && postUser && (
        <CommentModal user={postUser} post={post} show={commentModal} setShow={setCommentModal} setComment={setComment} />
      )}
      {showLikeModal && <PostLikesModal likesData={post?.likesDetails} closeModal={setShowLikeModal} />}
    </>
  );
};

export default memo(SinglePost);

