import { useSelector } from "react-redux"
import { RootState } from "../../../Store/store"
import ProfilePosts from "./ProfilePosts"
import ProfileDataInterface from "../../../Types/User/userProfile"
import { useState } from "react"

type ActiveKeys = 'myPosts' | 'taggedPosts' | 'savedPosts';

const ProfilePostsContainer = () => {

  const myPosts:any  = useSelector((state:RootState) => state.post.myPosts)
  const userInfo:ProfileDataInterface  = useSelector((state:RootState) => state.auth.userInfo)

  const [active, setActive] = useState<{ [key in ActiveKeys]: boolean }>({
    myPosts: true,
    taggedPosts: false,
    savedPosts: false,
  });


  const handleClick = (field:ActiveKeys) => {
    setActive({
      myPosts: field === 'myPosts',
      taggedPosts: field === 'taggedPosts',
      savedPosts: field === 'savedPosts',
    });
  };

  return (
    <>          

    <div className="w-full mt-3 m-2 h-11 flex justify-center bg-white  border-black dark-mode:bg-yellow-400">
    <div onClick={()=>handleClick('myPosts')} className={`w-1/3 h-full  ${active.myPosts ? 'border-b-4': 'hover:border-b-4'}  bg-white  flex rounded-md border-green-500 justify-center items-center `} >
      <h2 className={`font-bold underline ${active.myPosts ? ' scale-110 text-green-700': 'hover:scale-110'} text-black transition-transform hover:text-red-700 duration-100`}>My Posts</h2>
    </div>

     <div 
     onClick={() => handleClick('taggedPosts')}
     className={`w-1/3 h-full  ${active.taggedPosts ? 'border-b-4': 'hover:border-b-4'}  bg-white  flex rounded-md border-green-500 justify-center items-center `} >
      <h2 className={`font-bold underline ${active.taggedPosts ? ' scale-110 text-green-700': 'hover:scale-110'} text-black transition-transform hover:text-red-700 duration-100`}>Tagged Posts</h2>
    </div>

     <div
     onClick={() => handleClick('savedPosts')}
      className={`w-1/3 h-full  ${active.savedPosts ? 'border-b-4': 'hover:border-b-4'}  bg-white  flex rounded-md border-green-500 justify-center items-center `}>
      <h2 className={`font-bold underline ${active.savedPosts ? ' scale-110 text-green-700': 'hover:scale-110'} text-black transition-transform hover:text-red-700 duration-100`}>Saved Post</h2>
    </div>
    
    </div>
    {
      active.myPosts &&     <ProfilePosts posts = {myPosts}/>
    }
     {
      active.savedPosts &&     <ProfilePosts posts = {[]}/>
    }
     {
      active.taggedPosts &&     <ProfilePosts posts = {[]}/>
    }
    </>
  )
}

export default ProfilePostsContainer
     