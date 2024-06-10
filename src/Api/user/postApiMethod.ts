import { apiCall } from "./userApiCall";

import postRoutes from "../../Service/Endpoints/postEndpoints";
import { toast } from "react-toastify";


interface BookingDetails {
    _id: string,
    buyerId: string,
    propertyId: string,
    bookingDate: Date,
    endDate: Date,
    startDate: Date,
    paymentSuccess: false
} 
interface RegisterUserData {
    name: string;
    userName: string;
    email: string;
    mobile: string;
    password: string;
}
interface UserLoginData {
    email:string
    password:string
}


// @dec      get posts
// method    Get
export const getAllPosts = async (limit:number) => {
    try {
        console.log(" get all post :",limit)
        toast.info(limit) 
    const res = await apiCall('get',postRoutes.getAllPosts,{limit},false)
      console.log('get all posts ',res.data)
        return res.data
    } catch (error:any) {
        console.log('Error:', error);

    }
}

// @dec      get posts by postId
// method    Get
export const getPostById = async (postId:string) => {
    try {
        console.log("get post by i")
        const res = await apiCall('get',postRoutes.getPostById,{postId},false)
        console.log('get  post by id ',res.data)
        return res.data
    } catch (error:any) {
        console.log('Error:', error);

    }
}

 // @dec   save post
// method    POST
export const savePost = async ( userId: string,postId:string) => {
    try {
        console.log(' saved post')
        const res = await apiCall('patch',postRoutes.savePost,{userId,postId},false)
        return res.data

    } catch (error) {
        console.log(error)
    }
}

 // @dec   Edit post
// method    Patch
export const EditUserPost = async ( userData: any) => {
    try {
        console.log(' Edit  post',userData)
        const res = await apiCall('patch',postRoutes.editUserPost,{...userData},false)
        return res.data

    } catch (error) {
        console.log(error)
    }
}

 // @dec   Like post
// method    POST
export const likePost = async ( postId:string) => {
    try {
        const res = await apiCall('post',postRoutes.likePost,{postId},false)
        return res.data
    } catch (error) {
        console.log(error)
    }
}


 // @dec   unlike post
// method    POST
export const unlikePost = async ( postId:string) => {
    try {
        const res = await apiCall('delete',postRoutes.unlikePost,{postId},false)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

 // @dec   comment on post
// method    POST
export const commentOnPost = async ( postId:string,comment:string) => {
    try {
        const res = await apiCall('post',postRoutes.commentOnPost,{postId,comment},false)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

 // @dec    Report post
// method    POST
export const ReportPost = async ( postId:string,reason:string) => {
    try {
        const res = await apiCall('post',postRoutes.reportPost,{postId,reason},false)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

 // @dec    Block post
// method    POST
export const BlockPost = async ( postId:string) => {
    try {
        const res = await apiCall('patch',postRoutes.blockPost,{postId},false)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

// @dec      get a particular users posts
// method    Get
export const GetUserPosts = async (userId : string) => {
    try {
        console.log(" get user post :",userId) 
    const res = await apiCall('get',postRoutes.getUserPosts,{userId},false)
      console.log('get  user posts ',res.data)
        return res.data
    } catch (error:any) {
        console.log('Error:', error);

    }
}

//  @dec      get a reply of comments
// method    Get
export const GetCommentsReply = async (postId:string,commentId : string) => {
    try {
    const res = await apiCall('get',postRoutes.getCommentReplys,{postId,commentId},false)
      console.log('get  reply comment ',res.data)
        return res.data
    } catch (error:any) {
        console.log('Error:', error);

    }
}

//  @dec      get a reply of comments
// method    Get
export const ReplyToComment = async (postId:string,commentId : string , reply:string) => {
    try {
    const res = await apiCall('post',postRoutes.replyToComment,{postId,commentId,reply},false)
      console.log('get  reply comment ',res.data)
        return res.data
    } catch (error:any) {
        console.log('Error:', error);

    }
}

