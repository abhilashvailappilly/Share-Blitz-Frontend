import { getUser } from "@/Api/user/authApiMethod";
import { useVideoCallContext } from "@/Context/VideoCallContext";
import ProfileDataInterface from "@/Types/User/userProfile";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const VideoCallingNotification: React.FC = () => {
  const { call, answerCall, callReceiving, callAccepted, leaveCall } = useVideoCallContext();
  const [userData, setUserData] = useState<ProfileDataInterface | null>(null);

  useEffect(() => {
    fetchUserData();
  }, [call?.from]);

  const fetchUserData = async () => {
    try {
      const response = await getUser(call?.from);
      if (response.success) {
        setUserData(response?.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onDecline = () => {
    leaveCall();
    toast("Call declined");
  };

  if (!callReceiving) return null;

  return (
    <>
      {call.isReceivedCall && !callAccepted && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-opacity-50 bg-black">
          <div className="bg-white fixed top-10 right-10 dark:bg-gray-950 w-2/3 md:w-1/3 sm:w-1/3 p-6 rounded-lg shadow-lg text-center z-60">
            <p className="mb-4">Incoming call</p>
            <div className="flex gap-2">
              <div className="w-fit">
                <div className="w-16 h-16 rounded-full bg-gray-950 overflow-hidden">
                  <img src={userData?.profileImageUrl} alt="user profile" className="w-full h-full" />
                </div>
              </div>
              <div className="w-2/3">
                <h2 className="text-xl font-bold mb-4">{userData?.name}</h2>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => answerCall()}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Accept
                  </button>
                  <button
                    onClick={onDecline}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoCallingNotification;
