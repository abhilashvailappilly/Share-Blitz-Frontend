import { useDispatch, useSelector } from "react-redux"
import IconBxEdit from "../../icons/EditIcon"
import EditProfileModal from "../Modal/EditProfileModal"
import { useState, useEffect } from "react"
import { RootState } from "../../../Store/store"
import ProfileDataInterface from "../../../Types/User/userProfile"
import { getUser } from "../../../Api/user/authApiMethod"
import { toast } from "react-toastify"
import { getUserPosts } from "../../../Api/user/profileApiMethod"
import { useParams } from "react-router-dom"
import { FollowUser, UnFollowUser, checkIsFriend } from "../../../Api/user/userApiMethod"
import Connections from "./Connections"

const FriendsProfileBackground = () => {
  const userInfo:ProfileDataInterface = useSelector((state:RootState) => state.auth.userInfo)
  const { userId } = useParams<{ userId: string }>();
  const [openEditProfile, setOpenEditProfile] = useState(false)
  const myPosts: any[] = useSelector((state: RootState) => state.post.myPosts)
  const [image, setImage] = useState<string>(userInfo.profileImageUrl);
  const [isAdmin ,setIsAdmin] = useState<Boolean>(false)
  const [isFriend,setIsFriend] = useState<Boolean>(false)
  const [isRequested,setIsRequested] = useState<Boolean>(false)
  const [bio, setBio] = useState(""); 
//   const [profileUserData,setProfileUserData] = useState<{_id:String,name:string,userName:string,profileImageUrl:string,bio:string}>() 
const [profileUserData, setProfileUserData] = useState<{
    _id: string;
    name: string;
    userName: string;
    profileImageUrl: string;
    bio: string;
    isPrivate:Boolean;
  } | null>(null);

  if (!userId) {
    return <div>User ID is missing</div>;
  }

  const toggleEditProfileModal = () => {
    setOpenEditProfile(!openEditProfile)
  }

  useEffect(()=>{
    checkFriend()
  },[profileUserData]) 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await getUser(userId)
        if (res) {
            setProfileUserData(res.user)
           res?.user?._id === userInfo._id ? setIsAdmin(true) : setIsAdmin(false)
          setImage(res.user.profileImageUrl);
          setBio(res.user.bio);
        }
      } catch (error) {
        console.log(error)
      }
    }
   
    fetchUserData()
   
  }, [userId,openEditProfile]);
 

  const checkFriend = async ()=>{
    if(!profileUserData?._id){
      return 
    }
    const friend = await checkIsFriend(profileUserData?._id)
    if(friend.success){
      setIsFriend(friend.isFriend)
    }
  }

  const handleClickFollowUser = async ()=>{
    try {
      if(!profileUserData?._id){
        return toast.error("User Id not available")
      }
      const follow = await FollowUser(profileUserData?._id)
      if(follow.success){
        toast.success("Followed user")
        setIsFriend(true)
      } else {
        toast.error(follow.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleClickUnFollowUser = async ()=>{
    try {
      if(!profileUserData?._id){
        return toast.error("User Id not available")
      }
      const follow = await UnFollowUser(profileUserData?._id)
      if(follow.success){
        toast.success("unfollowed user")
        setIsFriend(false)
      } else {
        toast.error(follow.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className="bg-white border-2 border-black w-full h-screen/2 rounded-tl-[30px] flex flex-col items-center transition-colors duration-300 relative">
        <div className="bg-white w-full h-40 mt-1 relative">
          <img src="https://www.landscapesuncovered.com/wp-content/uploads/2015/02/Snowclouds-and-shadows.jpg" alt="bgimage" className="w-full h-full rounded-lg object-cover" />
          <div className="rounded-full bg-green-500 w-40 h-40 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/5 border-black border-4 overflow-hidden">
            <img src={image || "Profile Image"} alt="Character" className="w-full h-full hover:scale-110 transition-transform duration-300 object-cover" />
          </div>
        </div>
        <div className="w-full bg-white h-full">
          <div className="bg-white-400 flex justify-end">
           { isAdmin && <div className="flex flex-col justify-center hover:cursor-pointer">
                            <IconBxEdit className="w-20 m-3 h-9 flex hover:scale-110  transition-transform" onClick={toggleEditProfileModal} />
                            <span className="font-semibold sm:block hover:scale-110 transition-transform hidden">Edit Profile</span>
                         </div>
            }
          </div>
          <div className={`w-full ${!isAdmin ? "mt-20" :""}`}>
            <div className="w-full flex mt-5 font-bold justify-center">
              <h3>{profileUserData?.name}</h3>
            </div>
            <div className="w-full flex mt-2 font-medium justify-center text-gray-600 px-4 text-center">
                <span className="font-bold">{profileUserData?.bio}</span>
            </div>
            
             {!isAdmin && <div className="w-full bg-white">
                <div className="w-full bg-white flex justify-center items-center ">
                  
               {profileUserData?.isPrivate && !isFriend ?    ( 
                  <>
                   {!isRequested ?( <div onClick={handleClickFollowUser} className=" hover:scale-110 hover:cursor-pointer transition-transform w-36 h-10 mt-3 bg-green-500 flex justify-center items-center font-bold border-2 border-gray-400 rounded-xl ">
                        <h2>Request</h2>
                    </div> ) :
                  ( <div className=" w-36 h-10 mt-3  hover:scale-110 hover:cursor-pointer transition-transform bg-red-500 flex justify-center items-center font-bold border-2 border-gray-400 rounded-xl ">
                        <h2>Cancel Request</h2>
                    </div> )
                    }
                  </>
                  )
                  :
                 (  <>
                 
                   
                {!isFriend ?(    <div onClick={handleClickFollowUser} className="w-36  h-10  hover:scale-110 hover:cursor-pointer transition-transform mt-3 bg-green-500 flex justify-center items-center font-bold border-2 border-gray-400 rounded-xl ">
                          <h2>Follow</h2>
                         </div>
                      ) :
                  (    <div onClick={handleClickUnFollowUser} className="w-36  h-10 mt-3  hover:scale-110 hover:cursor-pointer transition-transform bg-green-500 flex justify-center items-center font-bold border-2 border-gray-400 rounded-xl ">
                         <h2>UnFollow</h2>
                      </div> )
                    }
                      
                      <div className="w-36 h-10 mt-3 ml-3 hover:scale-110 hover:cursor-pointer transition-transform bg-gray-200 flex justify-center items-center font-bold border-2 border-gray-400 rounded-xl ">
                          <h2>Message</h2>
                      </div>
                   </>
                 )
                }
                    </div>
                </div>
                }
                </div>
                 <Connections isFriend={isFriend} isPrivate={profileUserData?.isPrivate|| false}/>
          </div>
        </div>
      <EditProfileModal isOpen={openEditProfile} onClose={toggleEditProfileModal} />
    </>
  )
}

export default FriendsProfileBackground
