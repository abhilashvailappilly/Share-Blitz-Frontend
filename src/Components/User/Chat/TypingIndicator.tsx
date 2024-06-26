import React from 'react';
import { useDarkMode } from '@/Context/DarkModeContext';

const TypingIndicator = () => {
  const { isDarkMode } = useDarkMode();
  return (
    <div className={`flex items-center space-x-2  ${isDarkMode ? 'text-white' : 'text-black'}`}>
      <div className="bg-current rounded-full w-2 h-2 animate-typing"></div>
      <div className="bg-current rounded-full w-2 h-2 animate-typing" style={{ animationDelay: '0.2s' }}></div>
      <div className="bg-current rounded-full w-2 h-2 animate-typing" style={{ animationDelay: '0.4s' }}></div>
      
    </div>
  );
};

export default TypingIndicator;
