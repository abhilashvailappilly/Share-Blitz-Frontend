import React from 'react';
import { PostInterface } from '@/Types/Admin/PostManagement';
import Modal from 'react-modal';

interface PostViewModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    postData: PostInterface;
}

const PostViewModal: React.FC<PostViewModalProps> = ({ isOpen, onRequestClose, postData }) => {
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal" overlayClassName="overlay">
            <div className="p-4">
                <div className="flex justify-end">
                    <button onClick={onRequestClose} className="text-red-500 font-bold">X</button>
                </div>
                <div className="flex flex-col items-center">
                    <img src={postData.imageUrl} alt="Post" className="max-h-80 max-w-full" />
                    <div className="mt-4 text-gray-800 dark:text-gray-200">
                        <p><strong>{postData.likesDetails.likes.length}</strong> likes</p>
                        <p>{postData.commentsDetails.comments.length} comments</p>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default PostViewModal;
