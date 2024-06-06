import  { FC, useEffect, useState } from "react";
import UserList from "../Card/Userlist"; 
import { getUser } from "../../../Api/user/authApiMethod";
import { useNavigate } from 'react-router-dom';
import ProfileDataInterface from "../../../Types/User/userProfile";
import { toast } from "react-toastify";

type Users = {
  _id: string;
  userId:string
};

interface FollowingsModalProps {
  title:string
  setOpen: (open: boolean) => void;
  followings: Users[];
  isPrivate:Boolean
  isFriend:Boolean
}

// Define the functional component
export const FollowingsModal: FC<FollowingsModalProps> = ({title, setOpen, followings,isPrivate,isFriend }) => {
  const [usersData, setUsersData] = useState<ProfileDataInterface[]>([]);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate()

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await Promise.all(followings.map(async (following) => {
          const data = await getUser(following.userId);
          return data.user;
        }));

        setUsersData(users);
      } catch (err) {
      }
    };

    fetchData();
  }, [followings]);

  const seeProfile = (userId : string ,name:string) => {
    // toast.info(name)
    navigate(`/profile/${userId}`)
    handleClose()
  };
  return (
    <>
      <div
        id="default-modal"
        tabIndex={-1}
        aria-hidden="false"
        className=" flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={handleClose}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5 space-y-4">
            {isPrivate && !isFriend 
              ? <h2>User is Private</h2> 
              : <UserList seeProfile={seeProfile} users={usersData} onFollow={(id) => console.log(`Follow user with id: ${id}`)} />
            }

            </div>
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FollowingsModal;
