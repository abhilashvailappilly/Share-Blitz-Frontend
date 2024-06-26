import IconReturnUpBack from "@/Components/icons/BackIcon"
import { useDarkMode } from "@/Context/DarkModeContext"
import { useChatStore } from "@/ZustandStore/chatStore"
import { FaMobile, FaPhone, FaPhoneAlt, FaVideo } from "react-icons/fa"

 interface ChatHeader {
    handleBackClick :()=>void
 }
const ChatHeader = ({handleBackClick} :ChatHeader) => {
    const {isDarkMode} = useDarkMode()
    const {selectedUser,onlineUsers,typing} = useChatStore()
    if(!selectedUser)
        return 
    const isTyping = typing.includes(selectedUser._id)
  
  return (
    <div className={`p-4 ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'} border-b flex justify-between items-center`}>
            <div className="flex items-center w-full">
              {window.innerWidth < 768 && (
                <button onClick={handleBackClick} className={`mr-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                <IconReturnUpBack />
                </button>
              )}
              <div className={`text-xl ${isDarkMode ? 'text-white' : 'text-black'} flex gap-2 justify-center items-center`}>
                <div className="rounded-full bg-red-300 overflow-hidden w-10 h-10">
                  <img src={selectedUser?.profileImageUrl} alt="" className='h-full w-full image-cover '/>
                </div>
                <div>
                       <div className="flex items-center gap-4">
                        <span>{selectedUser.name}</span>
                        {onlineUsers.includes(selectedUser._id) &&<div className="w-2 h-2 rounded-full bg-green-500"></div>}
                       </div>
                    <div className='flex items-center gap-3'>
                        {/* <span className='text-sm mt-0'>{onlineUsers.includes(selectedUser._id)?"online" : "offline"}</span> */}
                        <span className={`text-sm mt-0 ${isTyping ? 'text-green-400 font-bold' : ""} `}>{isTyping?"typing..." :onlineUsers.includes(selectedUser._id)?"online" : "offline" }</span>
                    </div>
                </div>
                </div>
               
            </div>
            <div className="flex items-center justify-between gap-2  w-1/6">
             <FaVideo className="w-8 h-8" />
             <FaPhoneAlt className="w-6 h-6"/>
            </div>
          </div>
  )
}

export default ChatHeader
