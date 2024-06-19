import { useDarkMode } from '@/Context/DarkModeContext';
import { useChatStore } from '@/ZustandStore/chatStore';
import useAppSelector from '@/hooks/UseSelector';
import { faPlus, faSmile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useState } from 'react'
import { toast, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MessagesContainer from './MessagesContainer';
import NoChatSelected from './NoChatSelected';
import { SendMessage } from '@/Api/user/chatApiMethods';

const MessageSection = () => {
    const { isDarkMode } = useDarkMode();
    const userInfo = useAppSelector(state => state.auth.userInfo);
    const isSidebarVisible = useChatStore((state) => state.isSidebarVisible);
    const onlineUsers = useChatStore((state) => state.onlineUsers)
    const setSelectedUser = useChatStore((state) => state.setSelectedUser);
    const setIsSidebarVisible = useChatStore((state) => state.setSidebarVisible);
    const selectedUser = useChatStore((state) => state.selectedUser);
    const messagesFromStore = useChatStore((state) => state.messages);
    const setMessageToStore = useChatStore((state) => state.setMessages);
    const socket = useChatStore((state) => state.socket)


    const [message,setMessage] = useState({
        text:"", imageUrl:"",videoUrl:""
    })

    useEffect(()=>{
        if(socket && selectedUser) {
            socket.emit('message-page',selectedUser._id)
        }
    },[])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value} = e.target

        setMessage(prev => {
            return{...prev,text:value}
        })
    }

    const handleSendMessage =  async()=>{
        // e.preventDefault()
        toast.info('send')
       try {
		if (!message.text?.trim() && !message.imageUrl && !message.videoUrl) {
            return toast.error("Provide a message");
          }
		  
          const response = await SendMessage(selectedUser?._id as string,{text:message.text,
             imageUrl:message.imageUrl,
             videoUrl:message.videoUrl,})
             if(response.success) {
				toast.success("Message sent successfully!", {
					position: "top-left",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: true,
					progress: undefined,
				
				  });
			    // if(socket){
       	  		//    socket.emit('newMessage',selectedUser?._id)
       			// 	 }
              setMessageToStore([...messagesFromStore,response.data.message])
            //   console.log('response send message',response.data)
             } else {
              toast.error(response.data.message)
             }
	   } catch (error) {
		console.log(error)
	   } finally {
		setMessage(   {text:"", imageUrl:"",videoUrl:""})
	   }

        // if(socket){
        //     socket.emit('new message',{
        //         sender : userInfo?._id,
        //         receiver:selectedUser?._id,
        //         text:message.text,
        //         imageUrl:message.imageUrl,
        //         videoUrl:message.videoUrl,
        //     })
        // }
    }
    const handleBackClick = useCallback(() => {
        setIsSidebarVisible(true);
        setSelectedUser(null);
      }, [setIsSidebarVisible, setSelectedUser]);
    
  return (
    <>
    {(!isSidebarVisible || window.innerWidth >= 768) && selectedUser? (
        <div className={`w-full md:w-3/4 h-full flex flex-col ${isSidebarVisible && selectedUser ? 'hidden md:flex' : 'flex'} ${isDarkMode ? 'bg-gray-800' : 'bg-emerald-200'}`}>
          <div className={`p-4 ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'} border-b flex justify-between items-center`}>
            <div className="flex items-center">
              {window.innerWidth < 768 && (
                <button onClick={handleBackClick} className={`mr-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  Back
                </button>
              )}
              <div className={`text-xl ${isDarkMode ? 'text-white' : 'text-black'} flex gap-2 justify-center items-center`}>
                <div className="rounded-full bg-red-300 overflow-hidden w-10 h-10">
                  <img src={selectedUser?.profileImageUrl} alt="" className='h-full w-full image-cover '/>
                </div>
                <div>
                     <span>{selectedUser.name}</span>
                    <div className='flex items-center gap-3'>
                        <span className='text-sm mt-0'>{onlineUsers.includes(selectedUser._id)?"online" : "offline"}</span>
                        {onlineUsers.includes(selectedUser._id) &&<div className="w-2 h-2 rounded-full bg-green-500"></div>}
                    </div>
                </div>
                </div>
               
            </div>
          </div>

          <MessagesContainer />

          <div className={`flex gap-1 items-center p-4 ${isDarkMode ? 'bg-gray-900 border-gray-700' :  'bg-white border-gray-300'} border-t `}>
            <input
              type='text'
              placeholder='Type a message'
              value={message.text}
              onChange={handleInputChange}
              className={`w-3/4 p-1 border rounded ${isDarkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
            />
            <div className='flex w-1/4 gap-1'>
              <button type='button' className='bg-transparent p-2'>
                <FontAwesomeIcon icon={faPlus} className={`${isDarkMode ? 'text-white' : 'text-black'}`} />
              </button>
              <button type='button' className='bg-transparent p-2'>
                <FontAwesomeIcon icon={faSmile} className={`${isDarkMode ? 'text-white' : 'text-black'}`} />
              </button>
              <button type='button' onClick={handleSendMessage} className='bg-white rounded w-1/2 h-8'>
                Send m
              </button>
            </div>
          </div>
        </div>
      ) : ( 
        <NoChatSelected />
    )}
    </>
  )
}

export default MessageSection
