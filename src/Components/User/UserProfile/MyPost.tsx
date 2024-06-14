import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import SingleImageModal from "../Modal/SingleImageModal";
import { toast } from "react-toastify";
import { PostI } from "../../../Types/User/Post";
import { getUser } from "../../../Api/user/authApiMethod";
import { User } from "../../../Types/User/Comment";
import CommentModal from "../Modal/CommentModal";
import { useNavigate } from "react-router-dom";
import useAppSelector from "../../../hooks/UseSelector";
import ProfileDataInterface from "../../../Types/User/userProfile";
import { DeletePostById } from "../../../Api/admin/adminApiMethod";
import { DeletePost } from "../../../Api/user/postApiMethod";

interface Post {
    _id: string;
    userId: string;
    caption: string;
    imageUrl: string;
    hashtags: string[];
    like: number;
}

interface MyPostInterface {
    post: PostI;
}

const MyPost = ({ post }: MyPostInterface) => {
    const [show, setShow] = useState(false);
    const [owner, setOwner] = useState(false);
    const [postData,setPostData] = useState<PostI|null>()
    const [postUser, setPostUser] = useState<User | null>(null);
  const userInfo :ProfileDataInterface= useAppSelector((state)=>state.auth.userInfo)
    const navigte = useNavigate()
    const handleShow = () => {
        setShow(true);
    };

    useEffect(() => {
        setOwner(post.userId === userInfo?._id)
        setPostData(post)
        getUser(post?.userId)
            .then((response: { success: Boolean, user: User }) => {
                setPostUser(response?.user);
            })
            .catch((error: Error) => {
                // handle error
            });
    }, [post, post.userId]);
    if(!postData)
        return (
    <div className="w-full h-full flex justify-center items-center">
        <h2 className="font-bold">Post deleted</h2>
    </div>
    )

    const deletePost = async()=>{
        try {
            const deletPost = await DeletePost(post._id)
            if(deletPost.success) {
                toast.success('Post deleted ')
                setPostData(null)

                return
            }
            toast.error(deletPost?.message)
        } catch (error) {
            
        }
    }
    const navigteToEditPost =()=>{
        navigte(`/post/editPost/${post._id}`)
    }
    return (
        <div className="relative h-72 w-full bg-red-400 border-3 border-white overflow-hidden">
            <img
                onClick={handleShow}
                src={postData?.imageUrl}
                className="object-cover h-full w-full"
                alt="image"
            />
            {postUser && (
                <CommentModal user={postUser} post={post} show={show} setShow={setShow} />
            )}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="flex space-x-4">
            {owner &&
                <>
                    <div
                        className="bg-black bg-opacity-75 rounded-full p-3"
                        onClick={() => console.log('Edit clicked')}
                    >
                        <FontAwesomeIcon
                            icon={faEdit}
                            onClick={navigteToEditPost}
                            className="text-white text-xl cursor-pointer"
                        />
                    </div>
                    <div
                    className="bg-black bg-opacity-75 rounded-full p-3"
                    onClick={() => console.log('Edit clicked')}
                >
                    <FontAwesomeIcon
                        icon={faTrash}
                        onClick={deletePost}
                        className="text-white text-xl cursor-pointer"
                    />
                </div>
                </>
                }
                    <div
                        className="bg-black bg-opacity-75 rounded-full p-3"
                        onClick={handleShow}
                    >
                        <FontAwesomeIcon
                            icon={faEye}
                            className="text-white text-xl cursor-pointer"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyPost;
