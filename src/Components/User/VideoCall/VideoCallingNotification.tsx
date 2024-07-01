import { getUser } from "@/Api/user/authApiMethod";
import { useVideoCallContext } from "@/Context/VideoCallContext";
import ProfileDataInterface from "@/Types/User/userProfile";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface VideoCallingNotificationProps {
//   callerName: string;
//   onAccept: () => void;
//   onDecline: () => void;
}

const VideoCallingNotification: React.FC<VideoCallingNotificationProps> = ({  }) => {
    const {call,answerCall,callReceiving,callAccepted,leaveCall} = useVideoCallContext()
    const [userData,setUserData] = useState<ProfileDataInterface| null>(null)
   
    useEffect(()=>{
       fetchUserData()
    },[call?.from])
    const fetchUserData = async()=>{
        try {
            const response = await getUser(call?.from)
            if(response.success){
                setUserData(response?.user)
            }
        } catch (error) {
         console.log(error)   
        }
    }
   
    const onDecline =()=>{
      leaveCall()
      toast('call declined')
    }
    if(!callReceiving)
        return
  return (
   <>    {
    
    call.isReceivedCall && ! callAccepted &&
     (<div className="fixed  z-900 w-full h-full flex items-top justify-center md:justify-end sm:justify-end bg-gray-800 bg-opacity-50">
      <div className="bg-white dark:bg-slate-950 w-2/3 md:w-1/3 sm:w-1/3 p-6 h-1/4 mr-7 mt-2 rounded-lg shadow-lg text-center">
        <p className="mb-4">Incoming call</p>
      <div className="flex gap-2">
      <div className="w-fit ">
             <div className="w-16 h-16 rounded-full bg-red-950 overflow-hidden ">
            <img src={userData?.profileImageUrl} alt="user profile" className="w-full h-full " />
            </div>

       </div>
       <div className=" w-2/3">
       
           
        <h2 className="text-xl  font-bold mb-4">{userData?.name}</h2>
        
        <div className="flex justify-center space-x-4">
          <button 
            onClick={()=>answerCall()} 
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
    </div>)}
   
    </>
  );
}

export default VideoCallingNotification;
