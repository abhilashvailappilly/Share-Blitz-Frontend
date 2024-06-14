import { apiCall } from "./userApiCall";
import userRoutes from "../../Service/Endpoints/authEndpoints";
import postRoutes from "../../Service/Endpoints/postEndpoints";
import { toast } from "react-toastify";



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



// @dec      Register user
// method    POST
export const Register = async (userData :RegisterUserData) => {
    try {
        const res = await apiCall('post',userRoutes.userSignup,userData,false)
        console.log('reg res',res)
        const token  = res?.data?.token
        localStorage.setItem('userOtp',token)
        localStorage.setItem('userOtpEmail',userData.email)

        console.log("post register :",userData)
        return res
    } catch (error:any) {
        console.log('Error:', error);

    }
}

// @dec      Register user
// method    POST
export const VerifyOtp = async (otp :number) => {
    try {
        const token = localStorage.getItem('userOtp')
        const res = await apiCall('post',userRoutes.userVerifyOtp,{otp},
            
                 {
                    Authorization:`Bearer ${token}`
                   }
                
            
        )
        console.log('verify otp ;',res)

        if (res.data.success) {
            localStorage.removeItem('userOtp')
            localStorage.removeItem('userOtpEmail')
        }
        return res
       
    } catch (error) {
        console.log(error)
    }
}
 

// @dec      Resend otp 
// method    POST
export const ResendOtp = async () => {
    try {
        const token = localStorage.getItem('userOtp')
        const res = await apiCall('post',userRoutes.userResendOtp,{},
            
                 {
                    Authorization:`Bearer ${token}`
                   }
                
            
        )
        console.log('send otp ;',res)


        if (res.data.success) {
            localStorage.removeItem('userOtp')
            const token  = res?.data?.token
            localStorage.setItem('userOtp',token)
        }
        return res.data
       
    } catch (error) {
        console.log(error)
    }
}


// @dec     Login user
// method    POST
export const LoginUser = async (loginData :UserLoginData) => {
    try {
        const res = await apiCall('post',userRoutes.userLogin,loginData,false)
        console.log('reg res',res)
        if(res.data.success) {
            toast.success(res.data.message)
        } 
        // toast.error(res.data.message)
        // const token  = res?.data?.token
        // localStorage.setItem('userOtp',token)
        // console.log("post register :",userData)
        return res
    } catch (error:any) {
        console.log('Error:', error);

    }
}

// @dec     Google register user
// method    POST
 export const Gsignup = async (name: string,userName:string, email: string, picture: string) => {
                try {
                    const res = await apiCall('post',userRoutes.userGsignup,{name,userName,email,picture},false)
                    return res
                } catch (error) {
                    console.log(error)
                }
 }

 // @dec     Google login user
// method    POST
export const Glogin = async ( email: string) => {
    try {
        const res = await apiCall('post',userRoutes.userGlogin,{email},false)
        return res
    } catch (error) {
        console.log(error)
    }
}

 // @dec     Get User by id
// method    get
export const getUser = async ( userId: string) => {
    try {
        const res = await apiCall('get',postRoutes.getUser,{userId},false)
        console.log('get usr ;',res.data)
        return res?.data
    } catch (error) {
        console.log(error)
    }
}



 // @dec   unLike post
// method    POST
export const unlikePost = async ( postId:string) => {
    try {
        const res = await apiCall('post',userRoutes.userGlogin,{postId},false)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

//  // @dec   remove saved post
// // method    POST
// export const removeSavedPost = async ( userId: string,postId:string) => {
//     try {
//         console.log('remove saved post')
//         // const res = await apiCall('post',userRoutes.userGlogin,{userId,postId},false)
//         // return res
//         return {success:true}

//     } catch (error) {
//         console.log(error)
//     }
// }


 

export const followUser = async ( userId: string,followUserId:string) => {
    try {
        console.log(' Follow user')
        // const res = await apiCall('post',userRoutes.userGlogin,{userId,followUserId},false)
        // return res
        return {success:true}

    } catch (error) {
        console.log(error)
    }
}
export const unfollowUser = async ( userId: string,unFollowUserId:string) => {
    try {
        console.log(' unfollow usser')
        // const res = await apiCall('post',userRoutes.userGlogin,{userId,unFollowUserId},false)
        // return res
        return {success:true}

    } catch (error) {
        console.log(error)
    }
}

interface postDataI  {
    userId: string,
    imageUrl:string,
    caption: string,
    hashtags:string[]
  };
export const createPost = async ( postData:postDataI) => {
    try {
        console.log(' create post')
        const res = await apiCall('post',postRoutes.createPost,{postData},false)
        console.log('post response ',res)
        return res.data
    } catch (error) {
        console.log(error)
    }
}



