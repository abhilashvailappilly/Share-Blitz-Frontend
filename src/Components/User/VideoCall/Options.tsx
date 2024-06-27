import React, { useState } from 'react';
import { PhoneIcon, PhoneXMarkIcon } from '@heroicons/react/24/outline';
import { useVideoCallContext } from '@/Context/VideoCallContext';
import { CopyToClipboard } from 'react-copy-to-clipboard';


interface OptionsProps {
    children?: React.ReactNode;
  }

  
  const Options: React.FC<OptionsProps> = ({ children }) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useVideoCallContext();
  const [idToCall, setIdToCall] = useState('');
  {console.log('ss,',me)}

  return (
    <div className="container mx-auto mt-10 p-5">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <form className="space-y-6">
          <div>
            <h6 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Account Info</h6>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:text-black dark:border-gray-700 rounded-lg focus:outline-none focus:ring focus:ring-blue-200 dark:focus:ring-blue-800"
            />
            <CopyToClipboard text={me}>
              <button
                type="button"
                className="mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Copy Your ID
              </button>
            </CopyToClipboard>
          </div>

          <div>
            <h6 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Make a Call</h6>
            <input
              type="text"
              placeholder="ID to Call"
              value={idToCall}
              onChange={(e) => setIdToCall(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 dark:text-black rounded-lg focus:outline-none focus:ring focus:ring-blue-200 dark:focus:ring-blue-800"
            />
            {callAccepted && !callEnded ? (
              <button
                type="button"
                onClick={leaveCall}
                className="mt-4 w-full py-2 px-4 bg-red-500  text-white rounded-lg hover:bg-red-600 flex items-center justify-center space-x-2"
              >
                <PhoneXMarkIcon className="h-6 w-6" />
                <span>Hang Up</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => callUser(idToCall)}
                className="mt-4 w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center space-x-2"
              >
                <PhoneIcon className="h-6 w-6" />
                <span>Call</span>
              </button>
            )}
          </div>
        </form>
        {children && <div className="mt-6">{children}</div>}
      </div>
    </div>
  );
};

export default Options;
