import React from 'react';
import { useDarkMode } from '@/Context/DarkModeContext';
import './TypingIndicator.css';

const TypingIndicator: React.FC = () => {
  const { isDarkMode } = useDarkMode();
  return (
    <div className={`typing-indicator ${isDarkMode ? 'text-white' : 'text-black'}`}>
      <div className="typing-dot"></div>
      <div className="typing-dot"></div>
      <div className="typing-dot"></div>
    </div>
  );
};

export default TypingIndicator;
