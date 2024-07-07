import React, { useState } from 'react';
import { EditMessage } from '@/Api/user/chatApiMethods';
import { toast } from 'react-toastify';

interface EditMessageModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialMessageText: string;
    messageId: string;
    selectedUserId: string;
}

const EditMessageModal: React.FC<EditMessageModalProps> = ({ isOpen, onClose, initialMessageText, messageId, selectedUserId }) => {
    const [editedText, setEditedText] = useState(initialMessageText);

    const handleEdit = async () => {
        const response = await EditMessage(messageId, selectedUserId, editedText);
        if (response.success) {
            toast.success("Message edited");
            onClose(); // Close modal after successful edit
        } else {
            toast.error("Failed to edit message");
        }
    };

    return (
        <div className={`fixed inset-0 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
            <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="relative bg-white rounded-lg shadow-lg w-80 p-6">
                <textarea
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    className="w-full h-32 resize-none border rounded p-2"
                />
                <div className="mt-4 flex justify-end">
                    <button onClick={onClose} className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md focus:outline-none">Cancel</button>
                    <button onClick={handleEdit} className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md focus:outline-none">Save</button>
                </div>
            </div>
        </div>
    );
};

export default EditMessageModal;
