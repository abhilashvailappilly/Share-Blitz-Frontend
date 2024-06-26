import React from "react";
import { useDarkMode } from '@/Context/DarkModeContext';

interface User {
  name: string;
  profilePic: string;
}

interface SuggestionProps {
  user: User;
}

const Suggestion: React.FC<SuggestionProps> = ({ user }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className={`w-full h-14 flex mt-4 rounded-3xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} p-2`}>
      <img
        className="w-11 h-11 ml-1 self-center rounded-full"
        src={user?.profilePic}
        alt={`${user?.name}'s profile`}
      />
      <div className="w-56 ml-3 flex self-center">
        <div className={`text-lg font-normal font-['Inika'] ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {user?.name}
        </div>
        <div className="w-20 h-7 self-center ml-auto mr-2 bg-blue-600 rounded-2xl flex justify-center items-center hover:bg-blue-700">
          <button className="text-white font-mono text-sm text-center">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
};

export default Suggestion;
