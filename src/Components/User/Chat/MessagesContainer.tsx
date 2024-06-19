import ChatMessageLoader from '@/Components/Skeleton/SkeletonChat';
import { useDarkMode } from '@/Context/DarkModeContext';
import UseGetMessages from '@/hooks/UseGetMessages';
import SingleMessages from './SingleMessages';
import { useEffect, useRef } from 'react';
import useListenMessages from '@/hooks/UseListenMessages';

const MessagesContainer = () => {
    const { isDarkMode } = useDarkMode();
    useListenMessages();
    const {messages ,loading} = UseGetMessages()
    console.log('messages ::',messages)
    const lastMessageRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

  return (
    <div className='flex-grow p-4 overflow-y-auto'>
        {
            !loading && messages.length > 0 && messages.map((message ,index) => (
                <div ref={index === messages.length - 1 ? lastMessageRef : null} key={message._id}>
                    <SingleMessages key={index} message={message} />
                </div>
            ))
        }
         {loading && Array.from({ length: 5 }).map((_, index) => (
             <ChatMessageLoader  />
             ))}
       {!loading && messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <svg className="w-16 h-16 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6 4v-5a2 2 0 00-2-2h-4l-3 3H6a2 2 0 01-2-2V7a2 2 0 012-2h4l3-3h4a2 2 0 012 2v5m-6-1v5m-1 2a1 1 0 102 0 1 1 0 00-2 0z"></path>
          </svg>
          <p className="text-lg font-semibold text-gray-700">No messages available</p>
          <p className="text-gray-500">Start a conversation by sending the first message!</p>
        </div>
      )}

  </div>
      )
    }
    
    {/* <div className='mb-4'>
      <div className={`p-2 rounded inline-block ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}>
        Hi! How are you?
      </div>
    </div>
    <div className='mb-4 text-right'>
      <div className={`p-2 rounded inline-block ${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`}>
        I'm good, thanks! How about you?
      </div>
    </div>
    <div className='mb-4 text-right'>
      <div className={`p-2 rounded inline-block ${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`}>
        I'm good, thanks! How about you?
      </div>
      
    </div> 
    <div className='mb-4'>
      <div className={`p-2 rounded inline-block ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}>
        Hi! How are you?
      </div>
    </div>
    <div className='mb-4'>
      <div className={`p-2 rounded inline-block ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}>
        Hi! How are you?
      </div>
    </div>
    <div className='mb-4'>
      <div className={`p-2 rounded inline-block ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}>
        Hi! How are you?
      </div>
    </div>
    <div className='mb-4 text-right'>
      <div className={`p-2 rounded inline-block ${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`}>
        I'm good, thanks! How about you?
      </div>
    </div> <div className='mb-4 text-right'>
      <div className={`p-2 rounded inline-block ${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`}>
        I'm good, thanks! How about you?
      </div>
    </div> <div className='mb-4 text-right'>
      <div className={`p-2 rounded inline-block ${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`}>
        I'm good, thanks! How about you?
      </div>
    </div> <div className='mb-4 text-right'>
      <div className={`p-2 rounded inline-block ${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`}>
        I'm good, thanks! How about you?
      </div>
    </div> <div className='mb-4 text-right'>
      <div className={`p-2 rounded inline-block ${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`}>
        I'm good, thanks! How about you?
      </div>
    </div>
    <div className='mb-4'>
      <div className={`p-2 rounded inline-block ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}>
        Hi! How are you?
      </div>
    </div>
     <div className='mb-4 text-right'>
      <div className={`p-2 rounded inline-block ${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`}>
        I'm good, thanks! How about you?
      </div>
    </div> <div className='mb-4 text-right'>
      <div className={`p-2 rounded inline-block ${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`}>
        I'm good, thanks! How about you?
      </div>
    </div>
    More chat messages */}

export default MessagesContainer
