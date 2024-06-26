import { FindMessageById } from "@/Api/user/chatApiMethods";
import { useDarkMode } from "@/Context/DarkModeContext";
import { Message } from "@/Types/User/ZustandStore";
import ProfileDataInterface from "@/Types/User/userProfile";
import { useChatStore } from "@/ZustandStore/chatStore";
import { useEffect, useState } from "react";
import { FaImage, FaImages, FaVideo } from "react-icons/fa";
import { toast } from "react-toastify";

interface ListUsersSidebarInterface {
    user: ProfileDataInterface;
    isSearching: boolean;
    lastMessage?:string
    doFunction: (user: ProfileDataInterface) => void;
}

const ListUsersSidebar = ({ user, isSearching,lastMessage, doFunction }: ListUsersSidebarInterface) => {
    const { isDarkMode } = useDarkMode();
    const selectedUser = useChatStore((state) => state.selectedUser);
    const onlineUsers = useChatStore((state) => state.onlineUsers);
    const isOnline = onlineUsers.includes(user?._id);
    const isSelected = selectedUser?._id === user._id;
    const [lastMessageData,setLastMessage] = useState<Message | null>(null)

    useEffect(()=>{
            fetchUserLastMessage()
        
    },[lastMessage])
    const fetchUserLastMessage = async()=>{
        if(!lastMessage)
            return 
        try {
            const response = await FindMessageById(lastMessage)
            if(response.success){
                setLastMessage(response.data.message)
            }
        } catch (error) {
            
        }
        finally{

        }
    }

    return (
        <li
            key={user._id}
            onClick={() => doFunction(user)}
            className={`p-2 cursor-pointer mt-1 ${
                isDarkMode
                    ? isSelected
                        ? 'bg-gray-800 text-white'
                        : 'hover:bg-gray-800 text-white'
                    : isSelected
                    ? 'bg-gray-200 text-black'
                    : 'hover:bg-gray-200 text-black'
            } hover:rounded-xl relative rounded-xl`}
        >
            <div className={`w-full h-15 flex p-2 items-center gap-3 transition duration-200`}>
                <div className="rounded-full w-12 h-10 overflow-hidden border-2 border-white shadow-md relative">
                    <img src={user?.profileImageUrl} className="w-full h-full object-cover" alt="User Profile" />
                </div>
                <div className="flex flex-col w-3/4 ">
                    <span
                        className={`font-semibold flex gap-4 items-center justify-between w-full ${
                            isDarkMode ? 'text-white' : 'text-black'
                        }`}
                    >
                        {user.name}
                      
                        
                    </span>
                    
                    {isSearching && (
                        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            @{user.userName}
                        </span>
                    )}
                    {
                        lastMessageData && 
                        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                       {
                         lastMessageData.videoUrl ?
                             <div className="flex items-center gap-2">
                                <FaVideo/> Video
                            </div>
                            : lastMessageData.imageUrl ?
                            <div className="flex items-center gap-2">
                            <FaImage/> photo
                            </div>
                            :
                         lastMessageData?.text

                       }  
                       
                        </span>
                    }
                    
                    {/* Add your additional content here */}
                </div>
                <div className="w-1/4 flex justify-end gap-6 items-center">
                {isOnline && (
                            <div className="w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                         <div className="rounded-full flex bg-white h-8 w-8 items-center justify-center">
                             <span className="text-black font-bold">43</span>
                         </div>
                </div>
               
               
            </div>
        </li>
    );
};

export default ListUsersSidebar;
