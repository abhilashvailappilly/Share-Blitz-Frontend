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

export const FollowUser = async ( targetId: string) => {
    try {
        console.log(' Follow user')
        const res = await apiCall('post',userRoutes.followUser,{targetId},false)
        return res.data
        return {success:true}

    } catch (error) {
        console.log(error)
    }
}
export const UnFollowUser = async ( targetUserId:string) => {
    try {
        console.log(' unfollow usser')
        const res = await apiCall('delete',userRoutes.unFollowUser ,{targetUserId},false)
        return res.data

    } catch (error) {
        console.log(error)
    }
}

export const getConnections = async ( userId: string) => {
    try {
        console.log(' get connections')
        const res = await apiCall('get',userRoutes.getConnections,{userId},false)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const checkIsFriend = async ( targetUserId : string) => {
    try {
        console.log(' get connections')
        const res = await apiCall('get',userRoutes.checkIsFriend,{targetUserId},false)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const SearchUser = async ( searchInput : string) => {
    try {
        const res = await apiCall('get',userRoutes.searchUser,{searchInput},false)
        return res.data
    } catch (error) {
        console.log(error)
    }
}