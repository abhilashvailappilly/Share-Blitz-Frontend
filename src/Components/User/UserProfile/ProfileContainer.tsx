import { useDispatch, useSelector } from "react-redux"
import ProfileBackground from "./ProfileBackground"
import ProfilePostsContainer from "./ProfilePostsContainer"
import {useState,useEffect} from 'react'
import ProfileDataInterface from "../../../Types/User/userProfile"
import { RootState } from "../../../Store/store"
import { getUserPosts } from "../../../Api/user/profileApiMethod"
import { setUserPosts } from "../../../Store/user/postSlice"
import { toast } from "react-toastify"
const ProfileContainer = () => {
  const user:ProfileDataInterface  = useSelector((state:RootState) => state.auth.userInfo)

  // const [myPosts,setMyPosts] = useState([])

  const dispatch = useDispatch()
  useEffect(()=>{
    try {
      const fetchUserData = async()=>{
      const postData = await getUserPosts(user._id as string)
      if(postData.success){

        dispatch(setUserPosts(postData?.userPosts))
        console.log('user post data :',postData)
      } else {
        toast.error(postData.message)
      }

      }
      fetchUserData()
    } catch (error) {
      console.log(error)
    }
  },[])
  return (
    <div className="  w-full flex flex-col justify-center items-center  bg-white">
       
        
        <ProfileBackground/>
        <ProfilePostsContainer />
     
    </div>
  )
}

export default ProfileContainer
