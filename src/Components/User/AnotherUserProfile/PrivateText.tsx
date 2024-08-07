import React from 'react';

const PrivateAccount = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 border border-gray-300 rounded-lg shadow-md">
      {/* <img src={'d'} alt="Private Account" className="w-12 h-12 mb-2" /> */}
      <div className='bg-white dark:bg-gray-800 border-2 border-black overflow-hidden flex items-center justify-center w-14 h-14 rounded-full'>
    {children}
      </div>
      <p className="text-gray-700 dark:text-white text-lg font-semibold">Private Account</p>
      <p className="text-gray-500 dark:text-white">Only friends can see the posts</p>
    </div>
  );
};

export default PrivateAccount;
