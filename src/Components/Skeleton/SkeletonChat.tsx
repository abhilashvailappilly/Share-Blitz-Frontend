import React from 'react';
import { useDarkMode } from '@/Context/DarkModeContext';

const ChatMessageLoader: React.FC = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      role="status"
      className={` w-full p-4  rounded shadow animate-pulse md:p-6 ${
        isDarkMode ? '' : ''
      }`}
    >
     
     
      
      <div className="flex items-center mt-4 ">
        <svg
          className={`w-10 h-10 me-3 ${
            isDarkMode ? 'text-gray-700' : 'text-gray-200'
          }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
        </svg>
        <div>
          <div
            className={`h-2.5 rounded-full mb-2 ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
            } w-32`}
          ></div>
          <div
            className={`w-48 h-2 rounded-full ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
            }`}
          ></div>
         
        </div>
        <div className='mt-10 w-full flex  justify-end'>
           <div
            className={`w-48 mr-0 h-2 mt-3 rounded-full ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
            }`}
          ></div>
          
           </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default ChatMessageLoader;
