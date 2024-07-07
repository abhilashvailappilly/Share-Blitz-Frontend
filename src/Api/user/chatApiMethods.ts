


import chatRoutes from "@/Service/Endpoints/chatEndpoints";
import { apiCall } from "./userApiCall";


// @dec      get recents chats of the user
// method    Get
export const GetRecentChats = async () => {
    try {
         const res = await apiCall('get',chatRoutes.recentChats,{},false)
         console.log('recent chat ',res.data)
         
        return res.data
    } catch (error:any) {
        console.log('Error:', error);

    }
}

// @dec      get recents chats of the user
// method    Get
export const SendMessage = async (selectedUserId : string,message:{text:string,imageUrl:string,videoUrl:string}) => {
console.log('api send meessage "',message)
    try {
        if(!selectedUserId)
            return {success:false,message:"Select a user to chat"}
         const res = await apiCall('post',`${chatRoutes.sendMessage}/${selectedUserId}`,{message},false)
        return res.data
    } catch (error:any) {
        console.log('Error:', error);

    }
}

// @dec      get recents chats of the user
// method    Get
export const SendGroupChatMessage = async (roomId : string,message:{text:string,imageUrl:string,videoUrl:string}) => {
    console.log('api send group chat meessage "',message)
        try {
            if(!roomId)
                return {success:false,message:"Select a room to chat"}
             const res = await apiCall('post',`${chatRoutes.sendGroupMessage}/${roomId}`,{message},false)
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
         console.log('messages ',res.data)
        return res.data
    } catch (error:any) {
        console.log('Error:', error);

    }
}

// @dec     Get messages of  chats of a  user
// method    Get
export const GetMessagesByRoom = async (roomId : string) => {
    try {
        if(!roomId)
            return {success:false,message:"Select a room to chat"}
         const res = await apiCall('get',`${chatRoutes.getMessagesByRoom}/${roomId}`,{},false)
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

// @dec     Find messages by id 
// method    Get
export const FindMessageById= async (messageId : string,) => {

    try {
        
         const res = await apiCall('get',`${chatRoutes.getMessageById}/${messageId}`,{},false)
        return res.data
    } catch (error:any) {
        console.log('Error:', error);

    }
}

// @dec     Get unreaded messages 
// method    Get
export const GetUnReadedMessages= async (roomId : string,) => {

    try {
        if(!roomId  )
            return  
         const res = await apiCall('get',`${chatRoutes.unreadedMessages}/${roomId}`,{},false)
        return res.data
    } catch (error:any) {
        console.log('Error:', error);

    }
}

// @dec     Edit messages 
// method    Patch
export const UpdateMessagesAsSeen= async (selectedUserId : string,) => {

    try {
        
         const res = await apiCall('patch',`${chatRoutes.markAsRead}/${selectedUserId}`,{},false)
        return res.data
    } catch (error:any) {
        console.log('Error:', error);

    }
}

// @dec     Create group chat  
// method    Post
export const CreateGroupChat = async (groupName : string,participants : string[]) => {
    try {
        const res = await apiCall('post',chatRoutes.createGroupChat ,{groupName,participants},false)
        return res.data

    } catch (error) {
        console.log(error)
    }
}

// @dec     remove group chat  
// method    patch
export const RemoveParticipantFromGroupChat = async (participantId : string ,roomId:string) => {
    try {
        const res = await apiCall('patch',chatRoutes.removeParticipants ,{participantId,roomId},false)
        return res.data

    } catch (error) {
        console.log(error)
    }
}
