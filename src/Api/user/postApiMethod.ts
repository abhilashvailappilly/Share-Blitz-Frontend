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