import {  GetMessagesByRoom } from "@/Api/user/chatApiMethods"
import { Message } from "@/Types/User/ZustandStore"
import { useChatStore } from "@/ZustandStore/chatStore"
import { useEffect, useState } from "react"

const UseGetMessagesByRoom = () => {
 const [loading,setLoading] = useState(false)
 const { messages, setMessages,  } = useChatStore((state) => ({
    messages: state.messages as Message[],
    setMessages: state.setMessages,
    selectedUser: state.selectedUser,
    socket :state.socket
  }));
  const {selectedRoom} = useChatStore()
 useEffect(()=>{
   const fetchChatMessages = async() =>{
    if (!selectedRoom?._id) return;
    setLoading(true)
        try {
            const response = await GetMessagesByRoom(selectedRoom._id)
            if(response.success){
                if(response.data?.chat?.messages?.length > 0){
                    setMessages(response.data.chat.messages)
                } else {
                    setMessages([])
                }
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
   }
   if(selectedRoom?._id) fetchChatMessages()
 
 },[selectedRoom?._id,setMessages])
 
 return {messages,loading}
}

export default UseGetMessagesByRoom
