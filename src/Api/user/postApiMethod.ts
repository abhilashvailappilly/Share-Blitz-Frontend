import { apiCall } from "./userApiCall";

import postRoutes from "../../Service/Endpoints/postEndpoints";


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
const res = await apiCall('get',postRoutes.getAllPosts,{limit},false)
      console.log('get all posts ',res.data)
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

 // @dec   comment on post
// method    POST
export const ReportPost = async ( postId:string,reason:string) => {
    try {
        const res = await apiCall('post',postRoutes.reportPost,{postId,reason},false)
        return res.data
    } catch (error) {
        console.log(error)
    }
}