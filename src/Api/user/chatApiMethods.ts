


import chatRoutes from "@/Service/Endpoints/chatEndpoints";
import { apiCall } from "./userApiCall";
import { useChatStore } from "@/ZustandStore/chatStore";

// @dec      get recents chats of the user
// method    Get
export const GetRecentChats = async () => {
    try {
         const res = await apiCall('get',chatRoutes.recentChats,{},false)
        return res.data
    } catch (error:any) {
        console.log('Error:', error);

    }
}

// @dec      get recents chats of the user
// method    Get
export const SendMessage = async (selectedUserId : string,message:{text:string,imageUrl:string,videoUrl:string}) => {

    try {
        if(!selectedUserId)
            return {success:false,message:"Select a user to chat"}
         const res = await apiCall('post',`${chatRoutes.sendMessage}/${selectedUserId}`,{message},false)
        return res.data
    } catch (error:any) {
        console.log('Error:', error);

    }
}

// @dec     Get messages of  chats of a  user
// method    Get
export const GetMessages = async (selectedUserId : string) => {

    try {
        if(!selectedUserId)
            return {success:false,message:"Select a user to chat"}
         const res = await apiCall('get',`${chatRoutes.getMessages}/${selectedUserId}`,{},false)
        return res.data
    } catch (error:any) {
        console.log('Error:', error);

    }
}

// @dec     Delete messages 
// method    Delete
export const DeleteMessageFromEveryOne = async (messageId : string,selectedUserId : string) => {

    try {
        if(!selectedUserId)
            return {success:false,message:"Select a user to chat"}
         const res = await apiCall('delete',`${chatRoutes.deleteMessage}`,{messageId,selectedUserId},false)
        return res.data
    } catch (error:any) {
        console.log('Error:', error);

    }
}

// @dec     Edit messages 
// method    Patch
export const EditMessage= async (messageId : string,selectedUserId : string, text:string) => {

    try {
        if(!selectedUserId)
            return {success:false,message:"Select a user to chat"}
         const res = await apiCall('patch',`${chatRoutes.editMessage}`,{messageId,selectedUserId,text},false)
        return res.data
    } catch (error:any) {
        console.log('Error:', error);

    }
}
