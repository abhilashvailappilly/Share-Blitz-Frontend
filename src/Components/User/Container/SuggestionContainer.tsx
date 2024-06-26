import React, { ReactNode } from 'react';
import { useDarkMode } from '@/Context/DarkModeContext';

interface SuggestionContainerProps {
  children: ReactNode;
}

const SuggestionContainer: React.FC<SuggestionContainerProps> = ({ children }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className={`w-fit mt-10 rounded-lg p-5 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} bg-opacity-75 m-5 overflow-hidden no-scrollbar`}>
      <div className={`font-semibold text-xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Suggested profiles
      </div>
      <div className='mt-8 flex flex-col gap-4'>{children}</div>
    </div>
  );
};

export default SuggestionContainer;
