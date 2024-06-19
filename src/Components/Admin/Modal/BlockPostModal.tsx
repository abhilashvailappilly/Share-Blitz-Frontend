import React from 'react';

interface BlockPostModalProps {
    isOpen: boolean;
    closeModal: () => void;
    onConfirm: () => void;
    isBlocking: boolean;
}

const BlockPostModal: React.FC<BlockPostModalProps> = ({ isOpen, closeModal, onConfirm, isBlocking }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md w-96 max-h-full overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">{isBlocking ? 'Block Post' : 'Unblock Post'}</h2>
                <p className="mb-4">Are you sure you want to {isBlocking ? 'block' : 'unblock'} this post?</p>
                <div className="flex justify-end">
                    <button
                        onClick={closeModal}
                        className="mr-2 py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                        {isBlocking ? 'Block' : 'Unblock'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlockPostModal;
