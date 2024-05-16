import { apiCall } from "./adminApiCall";
import adminRoutes from "../../Service/Endpoints/adminEndpoints";






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