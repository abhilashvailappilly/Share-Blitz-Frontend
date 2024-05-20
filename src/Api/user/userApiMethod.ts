import { apiCall } from "./userApiCall";
import userEndpoint from "../../Service/Endpoints/userEndpoints";
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
        console.log(' create post')
        const res = await apiCall('patch',userRoutes.userEditProfile,{userData},false)
        console.log('edit user profile response ',res)
        return res.data
    } catch (error) {
        console.log(error)
    }
}