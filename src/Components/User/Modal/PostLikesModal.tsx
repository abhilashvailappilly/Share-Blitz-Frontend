import Modal from 'react-modal';
import LikedUserList from '../Home/LikedUserList';

interface PostLikesModalInterface {
  likesData: any;
  closeModal: (state: boolean) => void;
}

const PostLikesModal = ({ likesData, closeModal }: PostLikesModalInterface) => {
  const handleClose = () => {
    closeModal(false);
  };

  return (
    <Modal 
      isOpen={!!likesData} 
      onRequestClose={handleClose} 
      contentLabel="Post Likes"
      className="relative  bg-white dark:bg-gray-900 p-5 max-w-lg w-11/12 max-h-[90vh] overflow-hidden rounded-lg shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center"
    >
      <button 
        onClick={handleClose} 
        className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-800"
      >
        &times;
      </button>
      <div className=" no-scrollbar text-center overflow-y-auto max-h-[80vh]">
        <h1 className="mb-5 text-2xl  dark:text-white font-semibold text-gray-800">Likes</h1>
        <ul className="list-none p-0">
          {likesData?.likes.map((like: any, index: number) => (
            <LikedUserList key={index} userId={like.userId} index={index} />
          ))}
        </ul>
      </div>
    </Modal> 
  );
};

export default PostLikesModal;
