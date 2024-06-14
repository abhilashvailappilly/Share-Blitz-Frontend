import { CommentDetails } from "./Comment";
export interface PostI {
    _id: string;
    userId: string;
    caption: string;
    imageUrl: string;
    tag: string[];
    taggedUsers:[taggedUsers]
    likesDetails: LikesDetails;
    commentsDetails:CommentDetails
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