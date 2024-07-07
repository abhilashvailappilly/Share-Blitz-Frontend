import { useDarkMode } from '@/Context/DarkModeContext';
import { useChatStore } from '@/ZustandStore/chatStore';
import useAppSelector from '@/hooks/UseSelector';

import React, { useCallback, useEffect, useState } from 'react'
import { toast, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MessagesContainer from './MessagesContainer';
import NoChatSelected from './NoChatSelected';
import { SendMessage } from '@/Api/user/chatApiMethods';
import ChatHeader from './ChatHeader';
import ChatFooter from './ChatFooter';
import useListenMessages from '@/hooks/UseListenMessages';
import GroupChatHeader from './GroupChat/GroupChatHeader';
import GroupChatMessagesContainer from './GroupChat/GroupChatMessagesContainer';
import GroupChatFooter from './GroupChat/GroupChatFooter';

const MessageSection = () => {
    const { isDarkMode } = useDarkMode();
    useListenMessages();

    const isSidebarVisible = useChatStore((state) => state.isSidebarVisible);
    const setSelectedUser = useChatStore((state) => state.setSelectedUser);
    const setIsSidebarVisible = useChatStore((state) => state.setSidebarVisible);
    const selectedUser = useChatStore((state) => state.selectedUser);
    const {selectedRoom,setSelectedRoom} =  useChatStore()
    const socket = useChatStore((state) => state.socket)
    const {setMessages} = useChatStore()
   


    useEffect(()=>{
        if(socket && selectedUser) {
            socket.emit('message-page',selectedUser._id)
        }
        return ()=>{
          setMessages([])
        }
    },[])



   
    const handleBackClick = useCallback(() => {
        setIsSidebarVisible(true);
        setSelectedUser(null);
        setSelectedRoom(null)
      }, [setIsSidebarVisible, setSelectedUser]);
    
  return (
    <>
    {(!isSidebarVisible || window.innerWidth >= 768) && (selectedUser || selectedRoom)? (
        <div className={`w-full md:w-3/4 h-full flex flex-col ${isSidebarVisible &&  (selectedUser || selectedRoom)? 'hidden md:flex' : 'flex'} ${isDarkMode ? 'bg-gray-800' : 'bg-emerald-200'}`}>
         
      {   selectedUser && 
       <>
        <ChatHeader handleBackClick={handleBackClick} />
        <MessagesContainer />
        <ChatFooter />

       </>
       }
       { selectedRoom &&  
       <>
         <GroupChatHeader handleBackClick={handleBackClick} />
         <GroupChatMessagesContainer />
         <GroupChatFooter />
       </>
        }
           

        </div>
      ) : ( 
        <NoChatSelected />
    )}
    </>
  )
}

export default MessageSection
