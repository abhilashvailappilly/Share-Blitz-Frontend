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
    return (
      <div className=" w-full h-96 bg-blue-700 overflow-auto ">
    <div className="w-full h-full grid  grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-3 bg-white overflow-auto no-scrollbar">

        { 
            posts && posts.length > 0 &&  posts?.map((post: Posts, index: number) => {
    //    {showPosts &&loadedPosts2?.map((post: Post, index: number) => {

        return (
        <div key={index} className="h-72 w-full bg-red-400 border-3 border-white border overflow-hidden">
            <img src={post.imageUrl}
            className="object-cover h-full w-full"
            alt="" />
        </div>
            )
       })
        }
      
        {/* <div className="h-72 w-full bg-red-400 border-3 border-white border overflow-hidden">
            <img src="https://images.unsplash.com/photo-1527692282582-538da08c9d00?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            className="object-cover h-full w-full"
            alt="" />
        </div>
         <div className="h-72 w-full bg-red-400 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1527692282582-538da08c9d00?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            className="object-cover h-full w-full"
            alt="" />
        </div>
        <div className="h-72 w-full bg-red-400 border-3 border-white border overflow-hidden">
            <img src="https://images.unsplash.com/photo-1527692282582-538da08c9d00?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            className="object-cover h-full w-full"
            alt="" />
        </div>
        <div className="h-72 w-full bg-red-400 border-3 border-white border overflow-hidden">
            <img src="https://images.unsplash.com/photo-1527692282582-538da08c9d00?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            className="object-cover h-full w-full"
            alt="" />
        </div>
         <div className="h-72 w-full bg-red-400 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1527692282582-538da08c9d00?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            className="object-cover h-full w-full"
            alt="" />
        </div>
         <div className="h-72 w-full bg-red-400 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1527692282582-538da08c9d00?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            className="object-cover h-full w-full"
            alt="" />
        </div>
  
        <div className="h-72 w-full bg-red-400 border-3 border-white border overflow-hidden">
            <img src="https://images.unsplash.com/photo-1527692282582-538da08c9d00?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            className="object-cover h-full w-full"
            alt="" />
        </div>
         <div className="h-72 w-full bg-red-400 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1527692282582-538da08c9d00?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            className="object-cover h-full w-full"
            alt="" />
        </div>
         <div className="h-72 w-full bg-red-400 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1527692282582-538da08c9d00?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            className="object-cover h-full w-full"
            alt="" />
        </div> */}
  
    </div>
  </div>
    )
  }
  
  export default ProfilePosts
  