import { Message } from "@/Types/User/ZustandStore"
import { useChatStore } from "@/ZustandStore/chatStore"
import { useEffect } from "react"
import { toast } from "react-toastify"
import messageSendSound from '../../public/Sounds/mixkit-message-pop-alert-2354.mp3'
import { GetRecentChats } from "@/Api/user/chatApiMethods"
// import CustomMessageToast from "@/Components/icons/ToastMessage"
import { useNotificationStore } from "@/ZustandStore/notificationStore"
import { Notification } from "@/Types/User/Notifications"

const useListenMessages = ()=>{

 const {messages,setMessages,selectedUser,typing,setTypingUsers,socket,setRecentChats} = useChatStore()
 const {notifications,setNotifications} = useNotificationStore()

 useEffect(() => {
    const handleTyping = (newUser: string) => {
        setTypingUsers([...typing,newUser])
    };
    const handleStoppedTyping = (user: string) => {
        const users = typing.filter((userId)=>{userId !== user})
        setTypingUsers([...users])

       
    };
    const handleNewMessage =async (newMessage: any) => {
        newMessage.isShake =true
        // socket?.emit('fetchRecentChats')
        fetchRecentChats()
        const sound = new Audio(messageSendSound)
        sound.play()
        if(newMessage?.senderId === selectedUser?._id){
            setMessages([...messages, newMessage]);
        } 

        if(newMessage.senderId != selectedUser?._id) {
            if(socket)
                socket.emit('createNotification',{type:'NEWMESSAGE',senderId:newMessage.senderId})
        } 

    };
    const handleEditMessage = (editedMessage: Message) => {
        const updatedUsers = messages.filter((user :Message) => user._id !== editedMessage?._id);
        setMessages([...updatedUsers,editedMessage]);
    };
    const handleDeletedMessage = (deletedMessage: string) => {
        toast.warning("Message deleted");

        const updatedUsers = messages.filter((user :Message) => user._id !== deletedMessage);
        setMessages([...updatedUsers]);

    };
    const handleNewNotification = (newNotification:Notification ) => {
        // toast(
        //   "new notification received"
        // );
        setNotifications([...notifications,newNotification])
    };
    const handleMessagesMarkedAsRead=()=>{
        fetchRecentChats()
    }
    const fetchRecentChats = async ()=>{
        const response = await GetRecentChats();
        if (response.success) {
          setRecentChats(response.data.users);
        }
    }
    const handleMessageSended=()=>{
        fetchRecentChats()
    }
  

    socket?.on("typing", handleTyping);
    socket?.on("stoppedTyping", handleStoppedTyping);
    socket?.on("newMessage", handleNewMessage);
    socket?.on("messageSended",handleMessageSended );
    socket?.on("editedMessage", handleEditMessage);
    socket?.on("deletedMessage", handleDeletedMessage);
    socket?.on("newNotification", handleNewNotification);
    socket?.on("messagesMarkedAsRead", handleMessagesMarkedAsRead);
    

    return () => {
        socket?.off("typing", handleTyping);
        socket?.off("stoppedTyping", handleStoppedTyping);
        socket?.off("messageSended", handleMessageSended);
        socket?.off("newMessage", handleNewMessage);
        socket?.off("deletedMessage", handleDeletedMessage);
        socket?.off("editedMessage", handleEditMessage);
        socket?.off("newNotification", handleNewNotification);
        socket?.on("messagesMarkedAsRead", handleMessagesMarkedAsRead);

    };
 },[socket,setMessages,messages])
}
export default useListenMessages