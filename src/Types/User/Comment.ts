import { PostI } from "./Post";
import { IFollow } from "./userProfile";

export interface Comment{
        _id:string
        userId:string
        comment:string
        createdAt:Date
      }
  export interface CommentDetails {
    _id:string
    postId:string
    comments:Comment[]
  }
export interface ListReplyCommentPropsInteface{
  index:number
  userId:string
  reply:string
}
  
  export interface User {
    _id:string
    name: string
    userName:string
    email :string
    mobile:string
    bio :string
    dob :string
    profileImageUrl:string
    // backgroundImageUrl:string
    role:String
    location:string
    loginType:String
    isVerified:Boolean
    isPrivate:Boolean
    isBlocked:Boolean
    isDeleted:Boolean 
    creationTime:Date
    followings:IFollow[] |[]
    followers:IFollow[] |[]
  }
  
  export interface CommentModalPropsInterface {
      show : boolean
      setShow:(value:boolean)=>void
      setComment?: React.Dispatch<React.SetStateAction<any>>; 
      post:PostI
      user:User
  }