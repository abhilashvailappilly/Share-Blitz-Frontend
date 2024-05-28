import { PostI } from "./Post";

export interface Comment{
        userId:string
        comment:string
        createdAt:Date
      }
  export interface CommentDetails {
    _id:string
    postId:string
    comments:Comment[]
  }

  
  export interface User {
    _id: string;
    name: string;
    username: string;
    profileImageUrl: string;
  }
  
  export interface CommentModalPropsInterface {
      show : boolean
      setShow:(value:boolean)=>void
      post:PostI
      user:User
  }