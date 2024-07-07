import React, { useState } from 'react';
import IconReturnUpBack from "@/Components/icons/BackIcon";
import { useDarkMode } from "@/Context/DarkModeContext";
import { useChatStore } from "@/ZustandStore/chatStore";
import { FaInfoCircle} from "react-icons/fa";

import GroupChatDetailsModal from './GroupChatDetailsModal';


interface ChatHeaderProps {
  handleBackClick: () => void;
}

const GroupChatHeader: React.FC<ChatHeaderProps> = ({ handleBackClick }) => {
  const { isDarkMode } = useDarkMode();
  const { selectedRoom } = useChatStore();
  const [showGroupDetails,setShowGroupDetails] = useState<boolean>(false)
  // const [isCalling, setIsCalling] = useState(false);
  if (!selectedRoom ) return null;


  return ( 
    <>
      <div className={`p-4 ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'} border-b flex justify-between items-center`}>
        <div className="flex items-center w-full">
          {window.innerWidth < 768 && (
            <button onClick={handleBackClick} className={`mr-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
              <IconReturnUpBack />
            </button>
          )}
          <div className={`text-xl ${isDarkMode ? 'text-white' : 'text-black'} flex gap-2 justify-center items-center`}>
            <div className="rounded-full bg-red-300 overflow-hidden w-10 h-10">
              <img src={`https://cdn-icons-png.freepik.com/512/5677/5677749.png`} alt="" className='h-full w-full object-cover' />
            </div>
            <div>
              <div className="flex items-center gap-4">
                <span>{selectedRoom?.name}</span>
                {/* {onlineUsers.includes(selectedUser._id) && <div className="w-2 h-2 rounded-full bg-green-500"></div>} */}
              </div>
              <div className='flex items-center gap-3'>
                {/* <span className={`text-sm mt-0 ${isTyping ? 'text-green-400 font-bold' : ""}`}>{isTyping ? "typing..." : isOnline ? "online" : "offline"}</span> */}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 w-1/6">
          {/* <FaVideo className="w-8 h-8 cursor-pointer" onClick={handleVideoCallClick} />
          <FaPhoneAlt className="w-6 h-6" /> */}
          {/* <FaUserEdit className="w-6 h-6 cursor-pointer"  /> */}
          <FaInfoCircle  className="w-6 h-6 cursor-pointer" onClick={()=>setShowGroupDetails(!showGroupDetails)}/>
        </div>
      </div>
      <GroupChatDetailsModal
        open={showGroupDetails}
        onClose={() => setShowGroupDetails(false)}
        participants={selectedRoom.participants}
      />
    </>
  );
};

export default GroupChatHeader;
