import React, { ReactNode } from 'react';

interface SuggestionContainerProps {
  children: ReactNode;
}

const SuggestionContainer: React.FC<SuggestionContainerProps> = ({ children }) => {
  return (
    <div className="w-fit mt-10 rounded-lg p-5 bg-green-600 bulgeBox2 bg-opacity-75 overflow-scroll no-scrollbar m-5">
      <div className="text-white font-semibold text-xl">
        Suggested profiles
      </div>
      <div className='mt-8 flex flex-col gap-2'>{children}</div>
    </div>
  );
}

export default SuggestionContainer;
