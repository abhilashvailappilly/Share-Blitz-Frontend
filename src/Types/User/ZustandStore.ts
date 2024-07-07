import ProfileDataInterface from "./userProfile"

export interface Message {
    _id:string
    text:string
    videoUrl:string
    imageUrl:string
    senderId:string
    receiverId:string
    isShake?: boolean
    isEdited:boolean
    isDeleted:boolean
    isDeletedFromMe:boolean
    createdAt:Date
    updatedAt:Date
}


export interface Room {
    _id: string;
    createdAt: string;
    isGroupChat: boolean;
    messages: string[]; 
    name: string;
    lastMessage:string
    participants: string[]; 
    updatedAt: string;
    __v: number;
  }
  
  export interface RecentChatInteface {
    room: Room;
    participantsDetails: ProfileDataInterface[];
  }