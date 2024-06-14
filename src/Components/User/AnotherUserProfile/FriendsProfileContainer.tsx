import { useDispatch, useSelector } from "react-redux"
import ProfilePostsContainer from "../UserProfile/ProfilePostsContainer"
import FriendsProfileBackground from "./FriendsProfileBackground"
import {useEffect} from 'react'
import ProfileDataInterface from "../../../Types/User/userProfile"
import { RootState } from "../../../Store/store"
import { getUserPosts } from "../../../Api/user/profileApiMethod"
import { setUserPosts } from "../../../Store/user/postSlice"
import { toast } from "react-toastify"
const FriendsProfileContainer = () => {
  const userInfo:ProfileDataInterface  = useSelector((state:RootState) => state.auth.userInfo)

  const dispatch = useDispatch()
  useEffect(()=>{
    try {
      const fetchUserData = async()=>{
      const postData = await getUserPosts(userInfo._id as string)
      if(postData.success){
        dispatch(setUserPosts(postData?.userPosts))
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
       
        
        {/* <ProfileBackground/> */}
        <FriendsProfileBackground />
        <ProfilePostsContainer />
     
    </div>
  )
}

export default FriendsProfileContainer
