import { useState } from "react"
import SingleImageModal from "../Modal/SingleImageModal"
import { toast } from "react-toastify"
interface Post {
    _id:string
    userId:string
    caption:string
    imageUrl:string
    hashtags:string[]
    like : number
}
interface MyPostInterface{
    post:Post
}
const MyPost = ({post }:MyPostInterface) => {
    const [show ,setShow] = useState(false)
    const handleShow = ()=>{
      setShow(true)
    }
  return (
    <div

  
    className="h-72 w-full bg-red-400 border-3 border-white border overflow-hidden"
  >
    <img
      onClick={
        handleShow
      }
      src={post.imageUrl}
      className="object-cover h-full w-full"
      alt={'image'}
    />
<SingleImageModal  show={show} setShow={setShow} post={post}/> 
  </div>
  )
}

export default MyPost
