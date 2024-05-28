import { apiCall } from "./userApiCall";
import userEndpoint from "../../Service/Endpoints/authEndpoints";
import userRoutes from "../../Service/Endpoints/userEndpoints";







interface userDataI  {
    name: string,
    userName: string,
    profileImageUrl:string,
    bio: string,
    mobile:string
    email:string
    dob:string
  };

  // @dec      Edit user profile
// method    Patch

export const EditUserProfile = async ( userData:userDataI) => {
    try {
        console.log(' edit profile',userData)
        const res = await apiCall('patch',userEndpoint.userEditProfile,{userData},false)
        console.log('edit user profile response ',res)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const followUser = async ( targetId: string) => {
    try {
        console.log(' Follow user')
        const res = await apiCall('post',userRoutes.followUser,{targetId},false)
        return res.data
        return {success:true}

    } catch (error) {
        console.log(error)
    }
}
export const unfollowUser = async ( userId: string,unFollowUserId:string) => {
    try {
        console.log(' unfollow usser')
        const res = await apiCall('delete',userRoutes.unFollowUser ,{userId,unFollowUserId},false)
        // return res
        return {success:true}

    } catch (error) {
        console.log(error)
    }
}