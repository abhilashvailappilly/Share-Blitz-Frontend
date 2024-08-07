import MyPost from "./MyPost"
import { PostI } from "../../../Types/User/Post"


interface ProfilePostsProps {
    posts:PostI[];
    field:string
  }
  
  const ProfilePosts: React.FC<ProfilePostsProps> = ({field, posts }) => {
    return (
      <div className=" w-full h-96 bg-white-700 dark:bg-slate-800 overflow-auto ">
    <div className="w-full h-full grid  grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-3 bg-white dark:bg-slate-800 overflow-auto no-scrollbar">

    {posts && posts.length > 0 ? (
          posts.map((post: PostI, index: number) => {
            return (
                <div key={index}>
            <MyPost field={field}  post={post}/>
              </div>
            );
          })
        ) : (
          <div className="col-span-4 flex justify-center text-center items-center text-gray-500">
            <h1 className="font-extrabold text-black">No posts available</h1>
          </div>
        )}

       
       
  
    </div>
  </div>
    )
  }
  
  export default ProfilePosts
  