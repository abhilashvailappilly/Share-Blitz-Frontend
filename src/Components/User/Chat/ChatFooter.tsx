import { SendMessage } from '@/Api/user/chatApiMethods';
import IconSendCircle from '@/Components/icons/SendIcon';
import { useDarkMode } from '@/Context/DarkModeContext';
import { useChatStore } from '@/ZustandStore/chatStore';
import upload from '@/hooks/Cloudinary';
import { faPlus, faSmile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'; 
import { BarLoader } from 'react-spinners';
const ChatFooter = () => {
  const { isDarkMode } = useDarkMode();
  const { selectedUser, socket } = useChatStore((state) => state);
  const setMessageToStore = useChatStore((state) => state.setMessages);
  const messagesFromStore = useChatStore((state) => state.messages);
  const [showFileModal, setFileModal] = useState<boolean>(false);
  const [isLoadingUploading, setIsLoadingUploading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>();
  const [message, setMessage] = useState({
    text: '', imageUrl: '', videoUrl: ''
  });
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleInputFocus = () => {
    if (socket) {
      socket.emit('typing', selectedUser?._id);
    }
  };

  const handleInputBlur = () => {
    if (socket) {
      socket.emit('stoppedTyping', selectedUser?._id);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMessage(prev => ({ ...prev, text: value }));
  };


  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setMessage(prev => ({ ...prev, text: prev.text + emojiData.emoji }));
    setShowEmojiPicker(false);
  };
  useEffect(() => {
    console.log("changed", message);
  }, [message]);

  const uploadFileToCloud = async () => {
    setIsLoadingUploading(true);
    try {
      if (!selectedFile) {
        toast.error("Please select a file");
        return { success: false };
      }

      const uploadResponse = await upload(filePreview as string, (error: string) => {
        if (error !== "upload_success") {
          toast.error(`Image upload failed: ${error}`);
        }
      }, selectedFile);

      if (uploadResponse) {
        return { success: true, url: uploadResponse.secure_url };
      }
      return { success: false };

    } catch (error) {
      console.error('File upload failed:', error);
      toast.error('File upload failed. Please try again.');
    } finally {
      setIsLoadingUploading(false);
    }
  };

  const handleSendMessage = async () => {
    setIsLoading(true)
    let imageUrl = "";
    let videoUrl = "";
    if (filePreview) {
      const uploadFiles = await uploadFileToCloud();

      if (uploadFiles?.success) {
        selectedFile === 'image' ? imageUrl = uploadFiles.url : videoUrl = uploadFiles.url;
      }
    }

    try {
      if (!message.text?.trim() && !imageUrl && !videoUrl) {
        return toast.error("Provide a message");
      }

      const response = await SendMessage(selectedUser?._id as string,
        { text: message.text, imageUrl, videoUrl }
      );

      if (response.success) {
        toast.success("Message sent successfully!", {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });

        setMessageToStore([...messagesFromStore, response.data.message]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
    setIsLoading(false)
      setMessage({ text: "", imageUrl: "", videoUrl: "" });
      clearFile();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    const file = e.target.files?.[0];
    if (file) {
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const validVideoTypes = ['video/mp4', 'video/avi', 'video/mov'];
      const maxVideoSize = 40 * 1024 * 1024; // 40 MB in bytes

      if (type === 'image' && !validImageTypes.includes(file.type)) {
        toast.error('Invalid image type. Please select a JPEG, PNG, or GIF file.');
        return;
      }

      if (type === 'video') {
        if (!validVideoTypes.includes(file.type)) {
          toast.error('Invalid video type. Please select an MP4, AVI, or MOV file.');
          return;
        }

        if (file.size > maxVideoSize) {
          toast.error('Video file is too large. Please select a file less than 40 MB.');
          return;
        }
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'image') {
          setSelectedFile('image');
        } else {
          setSelectedFile('video');
        }
        setFileModal(false);
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearFile = () => {
    setFilePreview(null);
    setSelectedFile(null);
  };

  return (
    <div className={`flex flex-col gap-1 items-center p-4 ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'} border-t relative`}>
      {filePreview && (
         isLoadingUploading ? (
          <div className='w-full h-24 flex flex-col justify-center items-center'><BarLoader color="#36d7b7" />uploading</div>
        ) : (
          <div className="w-full mb-2">
            <button className='absolute cursor-pointer w-24 h-7 text-white font-bold right-0 mr-6 bg-black z-10' onClick={clearFile}>
              Cancel
            </button>
            {selectedFile === 'image' ? (
              <img src={filePreview} alt="Preview" className="w-full h-[500px] object-cover rounded" />
            ) : selectedFile === 'video' ? (
              <video src={filePreview} autoPlay={true}></video>
            ) : ""}
          </div>)
      )}
      <div className="flex  w-full">
        <input
          type='text'
          placeholder='Type a message'
          value={message.text}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          className={`w-2/3 p-3 border rounded ${isDarkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
        />
        <div className='flex w-1/4 gap-1 relative'>
          <button type='button' className='bg-transparent p-2' onClick={() => setFileModal(!showFileModal)}>
            <FontAwesomeIcon size='2x' icon={faPlus} className={`${isDarkMode ? 'text-white' : 'text-black'}`} />
          </button>
          <button type='button' className='bg-transparent p-2' onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
            <FontAwesomeIcon size='2x' icon={faSmile} className={`${isDarkMode ? 'text-white' : 'text-black'}`} />
          </button>
        {!isLoading ?  <button type='button' onClick={handleSendMessage} className=' rounded-full  p-0 m-0'>
            <IconSendCircle />
          </button> :
        
        <div role="status" className='flex items-center justify-center '>
            <svg aria-hidden="true" className="w-8 flex  h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
        </div>

          }
          {showFileModal && (
            <div className={`absolute bottom-14 left-0 bg-white border rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
              <div
                onClick={() => imageInputRef.current?.click()}
                className={`p-2 cursor-pointer hover:bg-gray-600 hover:rounded-md hover:text-white ${isDarkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}>
                Image
              </div>
              <div
                onClick={() => videoInputRef.current?.click()}
                className={`p-2 cursor-pointer hover:bg-gray-600 hover:rounded-md hover:text-white ${isDarkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}>
                Video
              </div>
            </div>
          )}
        </div>
      </div>
      

{showEmojiPicker && (
    <div className='absolute bottom-20 mb-4 w-screen  flex justify-center  rounded-lg transform  p-2  shadow-lg  border'>
      <EmojiPicker onEmojiClick={handleEmojiClick} />
    </div>
  )}
      <input
        type="file"
        ref={imageInputRef}
        className='hidden'
        accept="image/*"
        onChange={(e) => handleFileChange(e, 'image')}
      />
      <input
        type="file"
        ref={videoInputRef}
        className='hidden'
        accept="video/*"
        onChange={(e) => handleFileChange(e, 'video')}
      />
    </div>
  );
}

export default ChatFooter;

