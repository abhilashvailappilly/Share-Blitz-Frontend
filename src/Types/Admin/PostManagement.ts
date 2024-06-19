import { CommentDetails } from "../User/Comment";

export interface PostInterface {
    _id: string;
    userId: string;
    caption: string;
    imageUrl: string;
    tag: string[];
    taggedUsers:[taggedUsers]
    likesDetails: LikesDetails;
    commentsDetails:CommentDetails
    isBlocked:boolean
}

export interface Like {
    userId: string;
    likedAt: string; // Include a timestamp or any additional fields if needed
  }

  export interface taggedUsers {
    userName: string
    userId: string
  }
  
  export interface LikesDetails {
      _id:string
      postId:string
      likes: Like[];
    }