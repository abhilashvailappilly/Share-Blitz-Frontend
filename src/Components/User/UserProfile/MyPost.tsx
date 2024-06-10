import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import SingleImageModal from "../Modal/SingleImageModal";
import { toast } from "react-toastify";
import { PostI } from "../../../Types/User/Post";
import { getUser } from "../../../Api/user/authApiMethod";
import { User } from "../../../Types/User/Comment";
import CommentModal from "../Modal/CommentModal";
import { useNavigate } from "react-router-dom";

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
    const [postUser, setPostUser] = useState<User | null>(null);
    const navigte = useNavigate()
    const handleShow = () => {
        setShow(true);
    };

    useEffect(() => {
        getUser(post?.userId)
            .then((response: { success: Boolean, user: User }) => {
                setPostUser(response?.user);
            })
            .catch((error: Error) => {
                // handle error
            });
    }, [post, post.userId]);
    const navigteToEditProfile =()=>{
        navigte(`/post/editPost/${post._id}`)
    }
    return (
        <div className="relative h-72 w-full bg-red-400 border-3 border-white overflow-hidden">
            <img
                onClick={handleShow}
                src={post.imageUrl}
                className="object-cover h-full w-full"
                alt="image"
            />
            {postUser && (
                <CommentModal user={postUser} post={post} show={show} setShow={setShow} />
            )}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="flex space-x-4">
                    <div
                        className="bg-black bg-opacity-75 rounded-full p-3"
                        onClick={() => console.log('Edit clicked')}
                    >
                        <FontAwesomeIcon
                            icon={faEdit}
                            onClick={navigteToEditProfile}
                            className="text-white text-xl cursor-pointer"
                        />
                    </div>
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
