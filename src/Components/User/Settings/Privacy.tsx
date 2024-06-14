import React, { useState } from 'react';
import classNames from 'classnames';
import { useDarkMode } from '../../../Context/DarkModeContext';
import { AiFillWechatWork } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { ChangePrivacy } from '../../../Api/user/userApiMethod';

const Privacy = () => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
//   const [isDarkMode, setIsDarkMode] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);

//   const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const togglePrivacy = async() =>{
    try {
        const response = await ChangePrivacy()
        if(!response.success)
            return toast.error(response?.message)
        setIsPrivate(!isPrivate);
        toast.success(`Privacy changed to ${response?.userData?.isPrivate ? 'Private' : 'Public'} `)

    } catch (error) {
        
    }finally {

    }
  }

  return (
    <div className={classNames('min-h-screen flex flex-col items-center justify-center p-4', { 'bg-gray-900 text-white': isDarkMode, 'bg-white text-gray-900': !isDarkMode })}>
      <h1 className="text-3xl font-bold mb-4">Privacy Settings</h1>

      <div className="mb-8">
        <label className="flex items-center cursor-pointer">
          <span className="mr-2">Dark Mode</span>
          <div className="relative">
            <input type="checkbox" className="sr-only" checked={isDarkMode} onChange={toggleDarkMode} />
            <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
            <div className={classNames('dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition', { 'translate-x-full bg-gray-800': isDarkMode })}></div>
          </div>
        </label>
      </div>

      <div>
        <label className="flex items-center cursor-pointer">
          <span className="mr-2">Account Privacy</span>
          <div className="relative">
            <input type="checkbox" className="sr-only" checked={isPrivate} onChange={togglePrivacy} />
            <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
            <div className={classNames('dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition', { 'translate-x-full bg-gray-800': isPrivate })}></div>
          </div>
        </label>
      </div>

      <p className="mt-8">
        Your account is currently <span className="font-bold">{isPrivate ? 'Private' : 'Public'}</span>.
      </p>
    </div>
  );
};

export default Privacy;
