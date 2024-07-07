import  { useEffect, useState } from 'react';
import { getUserPosts } from '../../../Api/user/profileApiMethod';
import { useNavigate, useParams } from 'react-router-dom';
import { getConnections } from '../../../Api/user/userApiMethod';
import { toast } from 'react-toastify';
import FollowingsModal from '../Modal/FollowingsModal';

interface user {
  userId: string;
  _id: string;
}

interface connectionsInterface {
  followers: user[];
  followings: user[];
}

interface ConnectionsPropsInterface {
  isFriend: Boolean;
  isPrivate: Boolean;
}

const Connections = ({ isFriend, isPrivate }: ConnectionsPropsInterface) => {
  const { userId } = useParams<{ userId: string }>();
  const [userPosts, setUserPosts] = useState([]);
  const [userConnections, setUserConnections] = useState<connectionsInterface | undefined>();
  const [openFollowers, setOpenFollowers] = useState<boolean>(false);
  const [openFollowings, setOpenFollowings] = useState<boolean>(false);
  const navigate = useNavigate();

  if (!userId) {
    return <div>User ID is missing</div>;
  }

  useEffect(() => {
    fetchUserPosts();
    fetchConnections();
  }, [userId]);

  const fetchUserPosts = async () => {
    try {
      const res = await getUserPosts(userId);
      if (res.success) {
        setUserPosts(res.userPosts);
      } else {
        toast.error(res.message);
        navigate('/home');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchConnections = async () => {
    try {
      const res = await getConnections(userId);
      if (res.success) {
        setUserConnections(res.connections);
      } else {
        // toast.error(res.message)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-center mt-3 ">
        <div className="w-36 h-10 mt-3 bg-gray-200 dark:bg-gray-700 dark:text-white flex justify-center items-center font-bold border-2 border-gray-400 dark:border-gray-600 rounded-xl sm:hidden">
          <h1 className="m-2">{userPosts.length || 0}</h1>
          <h2>Post</h2>
        </div>
      </div>
      <div className="flex justify-evenly">
        <div
          onClick={() => setOpenFollowers(true)}
          className="w-36 h-10 mt-3 mb-2 bg-gray-200 dark:bg-gray-700 dark:text-white flex justify-center items-center font-bold border-2 border-gray-400 dark:border-gray-600 rounded-xl "
        >
          <h1 className="m-2">{userConnections?.followers.length || 0}</h1>
          <h2>Followers</h2>
        </div>
        <div className="w-36 h-10 mt-3 bg-gray-200 dark:bg-gray-700 dark:text-white justify-center items-center font-bold border-2 border-gray-400 dark:border-gray-600 rounded-xl hidden sm:flex">
          <h1 className="m-2">{userPosts.length || 0}</h1>
          <h2>Post</h2>
        </div>
        <div
          onClick={() => setOpenFollowings(true)}
          className="w-36 h-10 mt-3 mb-2 bg-gray-200 dark:bg-gray-700 dark:text-white flex justify-center items-center font-bold border-2 border-gray-400 dark:border-gray-600 rounded-xl "
        >
          <h1 className="m-2">{userConnections?.followings.length || 0}</h1>
          <h2>Followings</h2>
        </div>
      </div>
      {openFollowers && (
        <FollowingsModal
          isFriend={isFriend}
          isPrivate={isPrivate}
          setOpen={setOpenFollowers}
          title={"Followers"}
          followings={userConnections?.followers || []}
        />
      )}
      {openFollowings && (
        <FollowingsModal
          isFriend={isFriend}
          isPrivate={isPrivate}
          setOpen={setOpenFollowings}
          title={"Followings"}
          followings={userConnections?.followings || []}
        />
      )}
    </>
  );
};

export default Connections;
