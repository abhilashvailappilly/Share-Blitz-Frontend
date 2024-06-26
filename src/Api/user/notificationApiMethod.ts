
import notificationRoutes from "@/Service/Endpoints/notificationEndpoint";
import { apiCall } from "./userApiCall";

// @dec     Send notification  
// method    Post
export const SendNotification= async (type:string,messageId : string) => {

    try {
         const res = await apiCall('post',`${notificationRoutes.sendNotification}`,{messageId,type},false)
        return res.data
    } catch (error:any) {
        console.log('Error:', error);

    }
}
// @dec     Get notification  
// method    Get
export const GetAllNotifications= async () => {

    try {
         const res = await apiCall('get',`${notificationRoutes.getAllNotificationByUserId}`,{},false)
        return res.data
    } catch (error:any) {
        console.log('Error:', error);

    }
}
// @dec     Get notification  
// method    Get
export const ToogleSeenOfNotifications= async () => {

    try {
         const res = await apiCall('patch',`${notificationRoutes.toogleSeen}`,{},false)
        return res.data
    } catch (error:any) {
        console.log('Error:', error);

    }
}
