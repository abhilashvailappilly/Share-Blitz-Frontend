import { useSelector } from "react-redux";
import { RootState } from "../../../Store/store";
import ProfilePosts from "./ProfilePosts";
import ProfileDataInterface from "../../../Types/User/userProfile";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../../../Api/user/authApiMethod";
import { checkIsFriend } from "../../../Api/user/userApiMethod";
import { PostI } from "../../../Types/User/Post";
import { GetTaggedPosts, GetUserPosts, getPostById, getSavedPosts } from "../../../Api/user/postApiMethod";
import PrivateAccount from "../AnotherUserProfile/PrivateText";
import LockIcon from "../../icons/LockIcon";
import { toast } from "react-toastify";

type ActiveKeys = 'myPosts' | 'taggedPosts' | 'savedPosts';

const ProfilePostsContainer = () => {
  const userInfo: ProfileDataInterface = useSelector((state: RootState) => state.auth.userInfo);
  const { userId } = useParams<{ userId: string }>();
  const [profileUserData, setProfileUserData] = useState<ProfileDataInterface>();
  const [isAdmin, setIsAdmin] = useState<Boolean>(false);
  const [isFriend, setIsFriend] = useState<Boolean>(false);
  const [isPrivate, setIsPrivate] = useState<Boolean>(false);
  const [userPosts, setUserPosts] = useState<PostI[]>([]);
  const [taggedPosts, setTaggedPosts] = useState<PostI[]>([]);
  const [savedPosts, setSavedPosts] = useState<PostI[]>([]);
  const [active, setActive] = useState<{ [key in ActiveKeys]: boolean }>({
    myPosts: true,
    taggedPosts: false,
    savedPosts: false,
  });

  if (!userId) {
    return <div>User ID is missing</div>;
  }

  const handleClick = (field: ActiveKeys) => {
    setActive({
      myPosts: field === 'myPosts',
      taggedPosts: field === 'taggedPosts',
      savedPosts: field === 'savedPosts',
    });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await getUser(userId);
        if (res) {
          setProfileUserData(res.user);
          res?.user?._id === userInfo._id ? setIsAdmin(true) : setIsAdmin(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
    getUserPosts();
    fetchSavedPosts();
    getTaggedPosts();
  }, [userId]);

  const fetchSavedPosts = async () => {
    try {
      const response = await getSavedPosts();
      if (!response.success) return;
      const savedPostsData: PostI[] = [];
      for (const savedPost of response.savedPosts.savedPosts) {
        const postResponse = await getPostById(savedPost.postId.toString());
        if (postResponse.success && postResponse.postData) {
          savedPostsData.push(postResponse.postData);
        }
      }
      setSavedPosts(savedPostsData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (profileUserData) {
      checkFriend();
      setIsPrivate(profileUserData.isPrivate ?? false);
    }
  }, [profileUserData]);

  const checkFriend = async () => {
    if (!profileUserData?._id) {
      return;
    }
    const friend = await checkIsFriend(profileUserData?._id);
    if (friend.success) {
      setIsFriend(friend.isFriend);
    }
  };

  const getUserPosts = async () => {
    try {
      const res = await GetUserPosts(userId);
      if (res.success) {
        setUserPosts(res.userPosts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTaggedPosts = async () => {
    try {
      const res = await GetTaggedPosts(userId);
      if (res.success) {
        setTaggedPosts(res.postData);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>          
      <div className="w-full mt-3 m-2 h-11 flex justify-center bg-white dark:bg-gray-800 border-black dark:border-white rounded-md shadow-md">
        <div 
          onClick={() => handleClick('myPosts')} 
          className={`w-1/3 h-full flex justify-center items-center cursor-pointer ${
            active.myPosts ? 'border-b-4 rounded-lg  bg-gray-200 dark:bg-gray-700' : 'hover:border-b-4 '
          }`}
        >
          <h2 className={`font-bold underline transition-transform duration-100 ${
            active.myPosts ? 'scale-110 ' : 'hover:scale-110 text-black dark:text-white '
          }`}>
            My Posts
          </h2>
        </div>

        <div 
          onClick={() => handleClick('taggedPosts')}
          className={`w-1/3 h-full flex justify-center items-center cursor-pointer ${
            active.taggedPosts ? 'border-b-4  bg-gray-200 dark:bg-gray-700 rounded-lg' : 'hover:border-b-4 '
          }`}
        >
          <h2 className={`font-bold underline transition-transform duration-100 ${
            active.taggedPosts ? 'scale-110 ' : 'hover:scale-110 text-black dark:text-white '
          }`}>
            Tagged Posts
          </h2>
        </div>

        {isAdmin && (
          <div 
            onClick={() => handleClick('savedPosts')}
            className={`w-1/3 h-full flex justify-center items-center cursor-pointer ${
              active.savedPosts ? 'border-b-4 rounded-lg bg-gray-200 dark:bg-gray-700' : 'hover:border-b-4 '
            }`}
          >
            <h2 className={`font-bold underline transition-transform duration-100 ${
              active.savedPosts ? 'scale-110 ' : 'hover:scale-110 text-black dark:text-white '
            }`}>
              Saved Posts
            </h2>
          </div>
        )}
      </div>

      {active.myPosts && (
        (isPrivate && isFriend) || !isPrivate || isAdmin ? (
          <ProfilePosts field={"myPost"} posts={userPosts} />
        ) : (
          <PrivateAccount>
            <LockIcon />
          </PrivateAccount>
        )
      )}
      
      {active.savedPosts && isAdmin && (
        <ProfilePosts field={"savedPosts"} posts={savedPosts} />
      )}
      
      {active.taggedPosts && (
        (isPrivate && isFriend) || !isPrivate || isAdmin ? (
          <ProfilePosts field={"taggedPost"} posts={taggedPosts} />
        ) : (
          <PrivateAccount>
            <LockIcon />
          </PrivateAccount>
        )
      )}
    </>
  )
}

export default ProfilePostsContainer;
