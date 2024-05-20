import { useSelector } from "react-redux"
import IconBxEdit from "../../icons/EditIcon"
import EditProfileModal from "../Modal/EditProfileModal"
import { useState,useEffect } from "react"
import { RootState } from "../../../Store/store"
import ProfileDataInterface from "../../../Types/User/userProfile"
const ProfileBackground = () => {
  const [openEditProfile,setOpenEditProfile] = useState(false)
  const toggleEditProfileModal = ()=>{
    setOpenEditProfile(!openEditProfile)
  }

  const updatedUsers = () =>{

  }

  const user:ProfileDataInterface  = useSelector((state:RootState) => state.auth.userInfo)
  const myPosts:any[]  = useSelector((state:RootState) => state.post.myPosts)
  console.log(user)
  const [image, setImage] = useState<string | null>(user.profileImageUrl || "https://e0.pxfuel.com/wallpapers/105/23/desktop-wallpaper-compromised-character-gaming-profile-dark-cute-cartoon-boys-thumbnail.jpg");
  const [name,setName]=useState(user?.name);
  


  useEffect(()=>{
    // const fetchUserData=async()=>{
    //   try{
    //     const res=await getP()
    //     console.log('res',res?.data.buyerProfile)
    //     if(res?.data?.buyerProfile){
    //       setEmail(res.data.buyerProfile.email);
    //       setName(res.data.buyerProfile.name);
    //       setImage(res.data.buyerProfile.image || user);
    //     }
    //   }catch(error){
    //     console.log(error)
    //   }
    // }
    // fetchUserData()
  },[]);


  return (
   <>
		
<div className="bg-white border-2 border-black w-full h-screen/2 rounded-tl-[30px] flex flex-col items-center transition-colors duration-300 relative">
  <div className="bg-white w-full h-40 mt-1 relative">
    <img src="https://www.landscapesuncovered.com/wp-content/uploads/2015/02/Snowclouds-and-shadows.jpg" alt="bgimage" className="w-full h-full rounded-lg object-cover" />
    
    <div className="rounded-full bg-green-500 w-40 h-40 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/5  border-black border-4 overflow-hidden">
      <img src={image ||' https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4eMoz7DH8l_Q-iCzSc1xyu_C2iryWh2O9_FcDBpY04w&s'} alt="Character"
           className="w-full h-full hover:scale-110 transition-transform duration-300 object-cover" />
    </div>
   
  </div>
  <div className="w-full bg-white  h-full ">
  <div className="bg-white-400 flex justify-end">
     <div className="flex flex-col justify-center">
        <IconBxEdit className="w-20 m-3 h-9 flex hover:scale-110 transition-transform" onClick={toggleEditProfileModal}/>
        <span className="font-semibold sm:block hover:scale-110 transition-transform hidden">Edit Profile</span>
     </div>
  </div>
    <div className="w-full">
<div className="w-full flex mt-5 font-bold  justify-center">
<h3>{name}</h3>
</div>
       <div className="flex justify-center  mt-3 ">
                   <div className="w-36 h-10 mt-3 bg-gray-200 flex  justify-center items-center font-bold border-2 border-gray-400 rounded-xl sm:hidden">

                    <h1 className="m-2">{myPosts.length}</h1>
                    <h2>Posts</h2>
                  </div>
        </div>

        <div className="flex justify-evenly">
          <div className="w-36 h-10 mt-3 mb-2 bg-gray-200 flex justify-center items-center font-bold border-2 border-gray-400 rounded-xl ">
            <h1 className="m-2">{user.followings.length}</h1>
                  <h2>Followings</h2>
          </div>
          <div className="w-36 h-10 mt-3 bg-gray-200  justify-center items-center font-bold border-2 border-gray-400 rounded-xl hidden sm:flex">

                    <h1 className="m-2">{myPosts.length}</h1>
                    <h2>Posts</h2>
          </div>
           <div className="w-36 h-10 mt-3 mb-2 bg-gray-200 flex justify-center items-center font-bold border-2 border-gray-400 rounded-xl ">
                   <h1 className="m-2">{user.followings.length}</h1>
                    <h2>Followings</h2>
           </div>
        </div>

           
    </div>
  </div>
</div>
<EditProfileModal isOpen={openEditProfile} onClose={toggleEditProfileModal} />

   </>

  )
}

export default ProfileBackground
