import { apiCall } from "./adminApiCall";
import adminRoutes from "../../Service/Endpoints/adminEndpoints";
import { toast } from "react-toastify";






// @dec      Register user
// method    POST
export const getAllUsers = async () => {
    try {
        console.log('get all users api call')
        const res = await apiCall('get',adminRoutes.getAllUsers,false,false)
        console.log('reg res',res)
       
        return res.data
    } catch (error:any) {
        console.log('Error:', error);

    }
}

// @dec      Change status of user
// method    Patch
export const toogleUserStatus = async (userId:string) => {
    try {
        console.log('toogle user status')
        const res = await apiCall('patch',adminRoutes.toogleUserStatus,{userId},false)
        console.log('reg res',res)
       
        return res.data
    } catch (error:any) {
        console.log('Error:', error);

    }
}


// @dec      Change status of user
// method    Patch
export const getAllReportedPosts = async () => {
    try {
      
        const res = await apiCall('get',adminRoutes.getAllReportedPosts,{},false)
        console.log('reg res',res)
       
        return res.data
    } catch (error:any) {
        console.log('Error:', error);

    }
}
// @dec    Get Reports By PostId
// method    Get
export const GetReportsByPostId = async (postId:string) => {
    try {
        const res = await apiCall('get',adminRoutes.getReportsByPostId,{postId},false)
        console.log('reg res',res)
       
        return res.data
    } catch (error:any) {
        console.log('Error:', error);

    }
}

// @dec      Change status of user
// method    Get
export const getUserById = async (userId : string) => {
    try {
      
        const res = await apiCall('get',adminRoutes.getUserById,{userId},false)
        console.log('reg res',res)
       
        return res.data
    } catch (error:any) {
        console.log('Error:', error);

    }
}
// @dec      get posts
// method    Get
export const getPostById = async (postId:string) => {
    try {
        const res = await apiCall('get',adminRoutes.getPostById,{postId},false)
        console.log('get  post by id ',res.data)
        return res.data
    } catch (error:any) {
        console.log('Error:', error);

    }
}

// @dec      Change action status 
// method    Patch
export const ChangeActionStatus = async (reportId:string) => {
    try {
        console.log('toogle user status')
        const res = await apiCall('patch',adminRoutes.changeActionStatus,{reportId},false)
        console.log('reg res',res)
       
        return res.data
    } catch (error:any) {
        console.log('Error:', error);

    }
}

export const DeletePostById = async ( postId:string) => {
    try {
        console.log(' delete post')
        const res = await apiCall('delete',adminRoutes.deletePost ,{postId},false)
        return res.data

    } catch (error) {
        console.log(error)
    }
}

export const GetVerificationData = async ( ) => {
    try {
        const res = await apiCall('get',adminRoutes.getVerificationData ,{},false)
        return res.data

    } catch (error) {
        console.log(error)
    }
}


export const ApproveVerificationRequest = async (id:string ) => {
    try {
        const res = await apiCall('patch',adminRoutes.approveVerificationRequest ,{id},false)
        return res.data

    } catch (error) {
        console.log(error)
    }
}


export const DeletePost = async (postId:string ) => {
    try {
        const res = await apiCall('delete',adminRoutes.deletePost ,{postId},false)
        return res.data

    } catch (error) {
        console.log(error)
    }
}

export const TooglePostIsBlocked = async (postId:string ) => {
    try {
        const res = await apiCall('patch',adminRoutes.tooglePostIsBlocked ,{postId},false)
        return res.data

    } catch (error) {
        console.log(error)
    }
}

export const GetAllPosts = async ( ) => {
    try {
        const res = await apiCall('get',adminRoutes.getAllPosts ,{},false)
        return res.data

    } catch (error) {
        console.log(error)
    }
}