export interface Notification {
    type:string,
    message:string,
    senderId?:string
    userId?:string
    isSeen:boolean
    createdAt:Date
    updatedAt:Date
}