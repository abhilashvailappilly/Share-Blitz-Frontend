import { useEffect, useState } from 'react';
import CommentModal from '../Modal/CommentModal';
import { PostI } from '../../../Types/User/Post';
import { User } from '../../../Types/User/Comment';
import { getUser } from '../../../Api/user/authApiMethod';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

interface InterfaceProps {
    index: number;
    post: PostI;
}

const SinglePost = ({ index, post }: InterfaceProps) => {
  const [postUser, setPostUser] = useState<User | null>(null);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    getUser(post?.userId)
      .then((response: { success: Boolean; user: User }) => {
        setPostUser(response?.user);
      })
      .catch((error: Error) => {
        console.log(error.message);
      });
  }, [post]);

  const handleShow = () => {
    setShow(true);
  };

  return (
    <>
      <div key={index} className="grid gap-4 border-2 border-black group relative">
        <div>
          <img className="h-full w-full object-cover rounded-lg" src={post.imageUrl} alt={post._id} />
          <div
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300"
            onClick={handleShow}
          >
            <FontAwesomeIcon
              icon={faEye}
              className="text-white text-2xl cursor-pointer"
            />
          </div>
        </div>
      </div>
      {postUser && <CommentModal user={postUser} post={post} show={show} setShow={setShow} />}
    </>
  );
};

export default SinglePost;
