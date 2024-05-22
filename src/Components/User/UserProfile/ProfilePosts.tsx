import { useState } from "react"
import SingleImageModal from "../Modal/SingleImageModal"
import MyPost from "./MyPost"

interface Posts {
    _id:string
    userId:string
    caption:string
    imageUrl:string
    hashtags:string[]
    like : number
}
interface ProfilePostsProps {
    posts:Posts[];
  }
  
  const ProfilePosts: React.FC<ProfilePostsProps> = ({ posts }) => {
    console.log(posts)
    const [show ,setShow] = useState(false)
    return (
      <div className=" w-full h-96 bg-blue-700 overflow-auto ">
    <div className="w-full h-full grid  grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-3 bg-white overflow-auto no-scrollbar">

    {posts && posts.length > 0 ? (
          posts.map((post: Posts, index: number) => {
            return (
                <div key={index}>
            <MyPost  post={post}/>
              </div>
            );
          })
        ) : (
          <div className="col-span-4 flex justify-center text-center items-center text-gray-500">
            <h1 className="font-extrabold text-black">No posts available</h1>
          </div>
        )}

        {/* { 
            posts && posts.length > 0 &&  posts?.map((post: Posts, index: number) => {

        return (
        <div key={index} className="h-72 w-full bg-red-400 border-3 border-white border overflow-hidden">
            <img src={post.imageUrl}
            className="object-cover h-full w-full"
            alt="" />
        </div>
            )
       })
        } */}
      
       
  
    </div>
  </div>
    )
  }
  
  export default ProfilePosts
  