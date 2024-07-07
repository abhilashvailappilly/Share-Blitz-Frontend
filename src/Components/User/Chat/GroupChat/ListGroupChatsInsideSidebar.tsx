import { FindMessageById, GetUnReadedMessages } from "@/Api/user/chatApiMethods";
import { useDarkMode } from "@/Context/DarkModeContext";
import { Message, Room } from "@/Types/User/ZustandStore";
import ProfileDataInterface from "@/Types/User/userProfile";
import { useChatStore } from "@/ZustandStore/chatStore";
import moment from "moment";
import { useEffect, useState } from "react";
import { FaImage, FaVideo } from "react-icons/fa";

interface ListUsersSidebarInterface {
    user: ProfileDataInterface;
    lastMessage?:string
    room:Room
    doFunction: (room: Room) => void;
}

const ListGroupChatsInSidebar = ({ user,room,lastMessage, doFunction }: ListUsersSidebarInterface) => {
    const { isDarkMode } = useDarkMode();
    const {selectedUser , onlineUsers} = useChatStore()
    const isOnline = onlineUsers.includes(user?._id);
    const isSelected = selectedUser?._id === user._id;
    const [lastMessageData,setLastMessage] = useState<Message | null>(null)
    const [unReadedMessages,setUnReadedMessages] = useState<number >(0)
    useEffect(()=>{
            fetchUserLastMessage()
        
    },[lastMessage])
    useEffect(()=>{
       fetchUnReadedMessages()
    },[lastMessage,selectedUser?._id])
    const fetchUnReadedMessages = async()=>{ 
        try {
            const response = await GetUnReadedMessages(room?._id as string)
            console.log('response ::',response)
            if(response.success){

                setUnReadedMessages(response?.data?.messages.length)
            }
        } catch (error) {
           console.log(error)
        }
    }
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
        <div
            key={user._id}
            onClick={() => doFunction(room)}
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
                    <img src={`https://cdn-icons-png.freepik.com/512/5677/5677749.png`} className="w-full h-full object-cover" alt="User Profile" />
                </div>
                <div className="flex flex-col w-3/4 ">
                    <span
                        className={`font-semibold flex gap-4 items-center justify-between w-full ${
                            isDarkMode ? 'text-white' : 'text-black'
                        }`}
                    >
                        {room?.name}
                      
                        
                    </span>
                  
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
                    
                </div>
                <div className="w-2/4  h-full flex justify-end gap-6 items-center">
                {isOnline && (
                            <div className="w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                       <div>
                        {unReadedMessages > 0 &&  <div className="rounded-full flex bg-white h-6 w-6 items-center justify-center">
                                <span className="text-black font-bold">{unReadedMessages || ""}</span>
                            </div>}
                        <span className=" text-sm">{moment(lastMessageData?.createdAt).format('hh:mm A')}</span>
                       </div>
                
                </div>
               
               
            </div>
        </div>
    );
};

export default ListGroupChatsInSidebar;
