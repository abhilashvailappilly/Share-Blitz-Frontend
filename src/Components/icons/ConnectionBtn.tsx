import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {   unfollowUser  } from '../../Api/user/authApiMethod';
// import { getConnection/ } from '../../Api/user/userApiMethod';
import { showError } from '../../hooks/errorManagement';
import { FollowUser, checkIsFriend } from '../../Api/user/userApiMethod';
import { FollowingsInterface } from '../../Types/User/Connections';
import { toast } from 'react-toastify';
import ProfileDataInterface from '../../Types/User/userProfile';
import { RootState } from '../../Store/store';

interface User {
  _id: string;
  // Add more properties as needed
}
interface ErrorObject {
    message?: string;
  }
interface ConnectionBtnProps {
  user: User;
  color?: string;
  width?: number;
  height?: number;
  setFollowers: React.Dispatch<React.SetStateAction<any>>; // Adjust type as per your state structure
}

interface ApiResponse {
    userConnection: {
      following: string[]; // Adjust type if necessary
    };
    followeeConnection: {
      followers: any[]; // Adjust type if necessary
    };
  }
  

const ConnectionBtn: React.FC<ConnectionBtnProps> = ({ user, color, width, height, setFollowers }) => {
  const userInfo: ProfileDataInterface = useSelector((state: RootState) => state.auth.userInfo)
  const followersData: FollowingsInterface[] = useSelector((state: RootState) => state.connections.followings)

  const [following, setFollowing] = useState<FollowingsInterface[]>([]);
  const [isFriend,setIsFriend] = useState<Boolean>(false)
//   const [error, setError] = useState<string>('');
  const [error, setError] = useState<ErrorObject|null>(null); // Change type to string | ErrorObject


  // useEffect(() => {
  //   console.log(error)
  //   console.log('worked show error in connection btn')
  //   if (typeof error === 'string') {
  //     showError({ message: error }, setError as React.Dispatch<React.SetStateAction<ErrorObject | null>>);
  //   } else {
  //     showError(error, setError as React.Dispatch<React.SetStateAction<ErrorObject | null>>);
  //   }
  // }, [error]);

  useEffect(() => {
    if(error){
      console.log(error)
    console.log('use effect error worked in connection',error)
    showError(error, setError);
    }
  }, [error]);

  useEffect(()=>{
    checkFriend()
  })

  const checkFriend = async ()=>{
    const friend = await checkIsFriend(user._id)
    if(friend.success){
      setIsFriend(friend.isFriend)
    }
  }


  const follow = async () => {

    const followUserResponse = await FollowUser(user._id)
   if(followUserResponse.success){
    toast.success("Followed user")
   } else {
    toast.error(followUserResponse.message)
   }
  };

  const unfollow = () => {
    console.log('un follow worked')
    // unfollowUser(currentUser?._id, user?._id)
    //   .then((response:any) => {
    //     setFollowing(response.userConnection.following);
    //     setFollowers(response.followeeConnection.followers);
    //   })
    //   .catch((error:Error) => {
    //     if (error) {
    //       if (typeof error === 'string') {
    //           setError({ message: error });
    //       } else {
    //           setError(error);
    //       }
    //   }
    //     // setError(error?.message || 'An error occurred while unfollowing the user.');
    //   });
  };console.log("Followers data :",followersData)
  return (
    <>
      {!isFriend? (
        <button
          className={`w-${width || 36} h-${height || 9} rounded-lg bg-${color || 'black'} font-medium hover:bg-${
            color !== 'white' ? 'slate-800' : 'stone-700'
          } items-center`}
          onClick={follow}
        >
          Follow
        </button>
      ) : (
        <button
          className={`w-${width || 36} h-${height || 9} rounded-lg bg-${color || 'black'} font-medium hover:bg-${
            color !== 'white' ? 'slate-800' : 'stone-700'
          } items-center text-sm`}
          onClick={unfollow}
        >
          Unfollow
        </button>
      )}
    </>
  );
};

export default ConnectionBtn;
