import { Message } from "@/Types/User/ZustandStore"
import { useChatStore } from "@/ZustandStore/chatStore"
import { useEffect } from "react"
import { toast } from "react-toastify"

const useListenMessages = ()=>{
//  const socket = useSocketContext()
 const {messages,setMessages,socket} = useChatStore()

 useEffect(() => {
    const handleNewMessage = (newMessage: any) => {
        console.log("new message", newMessage);
        setMessages([...messages, newMessage]);
    };
    const handleEditMessage = (editedMessage: Message) => {
        console.log("edit message", editedMessage);
        const updatedUsers = messages.filter((user :Message) => user._id !== editedMessage?._id);
        setMessages([...updatedUsers,editedMessage]);
    };
    const handleDeletedMessage = (deletedMessage: string) => {
        console.log("deleted message", deletedMessage);
        toast.warning("Message deleted");
        // Handle deletion logic
        // setMessages([...messages, deletedMessage]);
        const updatedUsers = messages.filter((user :Message) => user._id !== deletedMessage);
        setMessages([...updatedUsers]);

        // setMessages((prevMessages: Message[]) =>
        //     prevMessages.filter((msg: Message) => msg._id !== deletedMessage)
        //   );
    };

    socket?.on("newMessage", handleNewMessage);
    socket?.on("editedMessage", handleEditMessage);
    socket?.on("deletedMessage", handleDeletedMessage);

    return () => {
        socket?.off("newMessage", handleNewMessage);
        socket?.off("deletedMessage", handleDeletedMessage);
        socket?.off("editedMessage", handleEditMessage);
    };
 },[socket,setMessages,messages])
}
export default useListenMessages