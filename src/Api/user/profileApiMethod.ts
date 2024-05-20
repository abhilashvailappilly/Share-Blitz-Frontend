import profileRoutes from "../../Service/Endpoints/profileEndpoints"
import { apiCall } from "./userApiCall"

// @dec      get posts
// method    Get
export const getUserPosts = async (userId : string) => {
    try {
        console.log(" get all post :",userId) 
const res = await apiCall('get',profileRoutes.getUserPosts,{userId},false)
      console.log('get all user posts ',res.data)
        return res.data
    } catch (error:any) {
        console.log('Error:', error);

    }
}