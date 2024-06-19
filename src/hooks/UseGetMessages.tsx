import { GetMessages } from "@/Api/user/chatApiMethods"
import { Message } from "@/Types/User/ZustandStore"
import { useChatStore } from "@/ZustandStore/chatStore"
import { useEffect, useState } from "react"
import { flushSync } from "react-dom"
import { toast } from "react-toastify"

const UseGetMessages = () => {
 const [loading,setLoading] = useState(false)
 const { messages, setMessages, selectedUser,socket } = useChatStore((state) => ({
    messages: state.messages as Message[],
    setMessages: state.setMessages,
    selectedUser: state.selectedUser,
    socket :state.socket
  }));
 useEffect(()=>{
   const fetchChatMessages = async() =>{
    if (!selectedUser?._id) return;
    setLoading(true)
        try {
            const response = await GetMessages(selectedUser._id)
            if(response.success){
                // toast.success('fetched get message')
                setMessages(response.data.chat.messages)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
   }
   if(selectedUser?._id) fetchChatMessages()
    // if(socket){

    // socket.on("retry", (newMessage) => {
    //     // if (newMessage.senderId === selectedUser._id || newMessage.receiverId === selectedUser._id) {
    //       fetchChatMessages();
    //     // }
    //   });
    // }
 },[selectedUser?._id,setMessages])
 return {messages,loading}
}

export default UseGetMessages
