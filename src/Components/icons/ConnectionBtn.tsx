import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { followUser, getConnections, unfollowUser  } from '../../Api/user/userApiMethod';
import { showError } from '../../hooks/errorManagement';

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
  const currentUser = useSelector((state: any) => state?.user?.userData);
  const [following, setFollowing] = useState<string[]>([]);
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

//   useEffect(() => {
//     getConnections(currentUser?._id)
//       .then((connection: { following: React.SetStateAction<string[]>; }) => {
//         setFollowing(connection.following);
//       })
//       .catch((error: { message: any; }) => {
//         setError(error?.message || 'An error occurred while fetching connections.');
//       });
//   }, [currentUser]);

  const follow = () => {
    console.log('follow worked')
    followUser(currentUser?._id, user?._id)
      .then((response : ApiResponse) => {
        setFollowing(response.userConnection.following);
        setFollowers(response.followeeConnection.followers);
      })
      .catch((error:Error) => {
        console.log('err follow ;',error)
        if (error) {
          if (typeof error === 'string') {
              setError({ message: error });
          } else {
              setError(error);
          }
      }
        // setError(error?.message || 'An error occurred while following the user.');
      });
  };

  const unfollow = () => {
    console.log('un follow worked')
    unfollowUser(currentUser?._id, user?._id)
      .then((response:any) => {
        setFollowing(response.userConnection.following);
        setFollowers(response.followeeConnection.followers);
      })
      .catch((error:Error) => {
        if (error) {
          if (typeof error === 'string') {
              setError({ message: error });
          } else {
              setError(error);
          }
      }
        // setError(error?.message || 'An error occurred while unfollowing the user.');
      });
  };

  return (
    <>
      {!following?.includes(user?._id) ? (
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
