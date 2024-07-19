import React, { useEffect, useState } from "react";
import { useDarkMode } from '@/Context/DarkModeContext';
import ProfileDataInterface from "@/Types/User/userProfile";
import { checkIsFriend, FollowUser, UnFollowUser } from "@/Api/user/userApiMethod";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


interface SuggestionProps {
  user: ProfileDataInterface;
}

const Suggestion: React.FC<SuggestionProps> = ({ user }) => {
  const { isDarkMode } = useDarkMode();
  const [isFriend, setIsFriend] = useState<Boolean>(false);
  const [isRequested, _setIsRequested] = useState<Boolean>(false);
  const navigate = useNavigate()
  useEffect(() => {
    checkFriend();
  }, [user]);

  const checkFriend = async () => {
    if (!user?._id) {
      return;
    }
    const friend = await checkIsFriend(user._id);
    if (friend.success) {
      setIsFriend(friend.isFriend);
    }
  };

  const handleClickFollowUser = async () => {
    try {
      if (!user?._id) {
        return toast.error("User Id not available");
      }
      const follow = await FollowUser(user?._id);
      if (follow.success) {
        toast.success("Followed user");
        setIsFriend(true);
      } else {
        toast.error(follow.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickUnFollowUser = async () => {
    try {
      if (!user?._id) {
        return toast.error("User Id not available");
      }
      const follow = await UnFollowUser(user?._id);
      if (follow.success) {
        toast.success("unfollowed user");
        setIsFriend(false);
      } else {
        toast.error(follow.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={`w-full h-14 flex mt-4 rounded-3xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} p-2`}>
      <img
        className="w-11 h-11 ml-1 self-center rounded-full"
        src={user?.profileImageUrl}
        alt={`${user?.name}'s profile`}
        onClick={()=>{ navigate(`/profile/${user._id}`)}}
      />
      <div className="w-56 ml-3 flex self-center">
        <div className={`text-lg font-normal font-['Inika'] ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {user?.name}
        </div>
        <div className="w-20 h-7 self-center ml-auto mr-2 bg-blue-600 rounded-2xl flex justify-center items-center hover:bg-blue-700">
      
           {user?.isPrivate && !isFriend ? (
                    <>
                      {!isRequested ? (
                        <div onClick={handleClickFollowUser} className="hover:scale-110 hover:cursor-pointer transition-transform w-36 h-10 mt-3 bg-green-500 flex justify-center items-center font-bold border-2 border-gray-400 dark:border-gray-600 rounded-xl ">
                          <h2>Request</h2>
                        </div>
                      ) : (
                        <div className="w-36 h-10 mt-3 hover:scale-110 hover:cursor-pointer transition-transform bg-red-500 flex justify-center items-center font-bold border-2 border-gray-400 dark:border-gray-600 rounded-xl ">
                          <h2>Cancel Request</h2>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {!isFriend ? (
                        <div onClick={handleClickFollowUser} className="w-36 h-10 hover:scale-110 hover:cursor-pointer transition-transform mt-3 bg-green-500 flex justify-center items-center font-bold border-2 border-gray-400 dark:border-gray-600 rounded-xl ">
                          <h2>Follow</h2>
                        </div>
                      ) : (
                        <div onClick={handleClickUnFollowUser} className="w-36 h-10 mt-3 hover:scale-110 hover:cursor-pointer transition-transform bg-green-500 flex justify-center items-center font-bold border-2 border-gray-400 dark:border-gray-600 rounded-xl ">
                          <h2>UnFollow</h2>
                        </div>
                      )}

                     
                    </>
                  )}
        </div>
      </div>
    </div>
  );
};

export default Suggestion;
