import { DeleteMessageFromEveryOne, EditMessage } from '@/Api/user/chatApiMethods';
import { useDarkMode } from '@/Context/DarkModeContext';
import { Message } from '@/Types/User/ZustandStore';
import { useChatStore } from '@/ZustandStore/chatStore';
import useAppSelector from '@/hooks/UseSelector';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface SingleMessagesInterface {
    key: number;
    message: Message;
}

const SingleMessages: React.FC<SingleMessagesInterface> = ({ key, message }) => {
    const { isDarkMode } = useDarkMode();
    const userInfo = useAppSelector(state => state.auth.userInfo);
    const selectedUser = useChatStore((state) => state.selectedUser);
    const fromMe = userInfo?._id === message.senderId;
    const profilePic = fromMe ? userInfo.profileImageUrl : selectedUser?.profileImageUrl;
    const userName = fromMe ? userInfo.name : selectedUser?.name;
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const [editText, setEditText] = useState<string>(message.text); // State for edit text
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false); // State for edit modal visibility
    const formattedTime = moment(message.updatedAt).format('hh:mm A');
    const { messages, setMessages } = useChatStore();
    const [isShake,setIsShake] = useState<boolean>(false)

    const createdTime = moment(message.createdAt);
    const currentTime = moment();
    const minutesDiff = currentTime.diff(createdTime, 'minutes');

    useEffect(() => {
        setShowOptions(false);
        if(message && message?.isShake){
            setIsShake(true)
        }
        setTimeout(()=>{
            setIsShake(false)
            
        },200)
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(message.text)
            .then(() => {
                toast.success("Message copied to clipboard");
            })
            .catch(() => {
                toast.error("Failed to copy message");
            });
        setShowOptions(false);

    }

    const handleEdit = async () => {
        const response = await EditMessage(message._id, selectedUser?._id as string, editText); // Use editText state
        if (response.success) {
            toast.success("Message edited");
            message.isEdited=true
            setMessages(messages.map(msg => msg._id === message._id ? { ...msg, text: editText } : msg)); // Update message in local state
        } else {
            toast.error("Failed to edit message");
        }
        setEditModalOpen(false);
        setShowOptions(false);

    }

    const handleDelete = async () => {
        const response = await DeleteMessageFromEveryOne(message._id, selectedUser?._id as string);
        if (response.success) {
            toast.success("Message deleted");
            const updatedUsers = messages.filter((user: Message) => user._id !== message._id);
            setMessages([...updatedUsers]);
        } else {
            toast.error("Failed to delete message");
        }
        setShowOptions(false);
    }

    return (
        <div key={key} className={`flex ${isShake ? "animate-shake" :""} items-start gap-2.5 ${fromMe ? 'justify-end' : ''}`}>
            <div className={`flex flex-col gap-1 max-w-[320px] ${fromMe ? 'items-end' : ''}`}>
                <div className="flex items-center b space-x-2.5">
                   
                </div>
                <div className='flex'>
                    <div className={`flex flex-col leading-1.5 p-4 border-gray-200 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} ${!fromMe ? 'rounded-r-xl rounded-es-xl' : 'rounded-tl-xl rounded-bl-xl rounded-br-xl'}`}>
                        {/* Render message text */}
                       {
                        message.videoUrl &&
                        <video src={message?.videoUrl} autoPlay={true} className='h-[100px]'></video>
                     ||
                        message.imageUrl &&
                        <img src={message?.imageUrl} className='h- max-h-48 max-w-44' alt="" />
                       } 
                        <p className={`text-sm font-normal mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{message.text}</p>

                    </div>

                    <button
                        id="dropdownMenuIconButton"
                        data-dropdown-toggle="dropdownDots"
                        data-dropdown-placement="bottom-start"
                        className={`inline-flex m-1 self-center items-center p-1 text-sm font-medium text-center ${isDarkMode ? 'text-white bg-gray-900 hover:bg-gray-800 focus:ring-gray-600' : 'text-gray-900 bg-white hover:bg-gray-100 focus:ring-gray-50'} rounded-lg focus:ring-4 focus:outline-none ${fromMe ? 'order-first' : ''}`}
                        type="button"
                      
                        onClick={() => { setShowOptions(!showOptions) }}
                    >
                        <svg className={`w-3 h-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                            <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                        </svg>
                    </button>
                </div>
                <div className='flex gap-3'>
                <span className={`text-[10px] inline-flex ${!fromMe ? 'justify-start' : 'justify-end'} font-normal ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{formattedTime}</span>
               {message?.isEdited && <span className='font text-white' style={{ fontSize: '10px' }}>Edited</span>}
                </div>
            </div>

            <div  id="dropdownDots" className={` ${fromMe ? "order-first" :""}  z-10 ${showOptions ? 'block' : 'hidden'} text-white dark:bg-gray-700 divide-y divide-gray-100 dark:divide-gray-600 rounded-lg shadow w-40 ${fromMe ? 'ml-2' : 'mr-2'}`}>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
                    <li>
                        <a href="#" onClick={handleCopy} className={`block px-4 py-2 ${isDarkMode ? 'dark:hover:bg-gray-600 dark:hover:text-white  text-white' : 'hover:bg-gray-100'}`}>Copy</a>
                    </li>
                   
                    {minutesDiff < 7 && (
                        <>
                            <li>
                                {fromMe && <a href="#" onClick={() => { setEditModalOpen(true); }} className={`block px-4 py-2 ${isDarkMode ? 'dark:hover:bg-gray-600 dark:hover:text-white  text-white' : 'hover:bg-gray-100'}`}>Edit</a>}
                            </li>
                            <li>
                                {fromMe && <a href="#" onClick={handleDelete} className={`block px-4 py-2 ${isDarkMode ? 'dark:hover:bg-gray-600 dark:hover:text-white  text-white' : 'hover:bg-gray-100'}`}>Delete from every one </a>}
                                
                            </li>

                        </>
                    )}
                     <li>
                                {fromMe && <a href="#" onClick={handleDelete} className={`block px-4 py-2 ${isDarkMode ? 'dark:hover:bg-gray-600 dark:hover:text-white  text-white' : 'hover:bg-gray-100'}`}>Delete </a>}
                                
                     </li>
                </ul>
            </div>

            

            {/* Edit Modal */}
            {editModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex bg-gray-800 items-center justify-center bg-opacity-50 z-50">
                    <div className="bg-gray-700 dark:bg-gray-900 rounded-lg p-8 w-80">
                        <textarea
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="w-full h-20 resize-none border rounded p-2 focus:outline-none focus:ring focus:border-blue-300 bg-gray-800 dark:bg-gray-900 text-white"
                        />
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={handleEdit}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => { setEditModalOpen(false); }}
                                className="ml-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
};

export default SingleMessages;
