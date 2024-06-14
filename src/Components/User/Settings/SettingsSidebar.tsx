import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { DarkThemeToggle } from 'flowbite-react';
import classNames from 'classnames';
import IconTickCircle from '../../icons/VerificationIcon';
import LockIcon from '../../icons/LockIcon';
import { UserIcon } from '@heroicons/react/24/outline';
import { useDarkMode } from '../../../Context/DarkModeContext';


const SettingsSidebar = () => {
    const {isDarkMode,toggleDarkMode} = useDarkMode()


  return (
    <div className={classNames("w-1/6 h-screen sticky border-black rounded  border-r-2 mr-3", { 'bg-white': !isDarkMode, 'bg-gray-900 text-white': isDarkMode })}>
      <div className="h-full flex flex-col justify-end px-3 py-4 overflow-y-auto no-scrollbar">
        

        <ul className="space-y-2 font-medium">
          
          <li><hr className={classNames("h-[1.5px]", { 'bg-black': !isDarkMode, 'bg-white': isDarkMode })} /></li>
          <li>
            <NavLink to="personal-info" className="flex items-center p-2 justify-center rounded-lg hover:bg-green-900 hover:text-white font-bold">
              <UserIcon className={classNames("flex-shrink-0 w-5 h-5 transition duration-75", { 'dark:text-gray-400': isDarkMode, 'group-hover:text-gray-900 dark:group-hover:text-white': isDarkMode })} />
              <span className="lg:block   hidden flex-1 ms-3 whitespace-nowrap">Personal Info</span>
            </NavLink>
          </li>
          <li><hr className={classNames("h-[1.5px]", { 'bg-black': !isDarkMode, 'bg-white': isDarkMode })} /></li>
          <li>
            <NavLink to="privacy" className="flex items-center p-2 justify-center rounded-lg hover:bg-green-900 hover:text-white font-bold">
              <LockIcon className={classNames("flex-shrink-0 w-5 h-5 transition duration-75", { 'dark:text-gray-400': isDarkMode, 'group-hover:text-gray-900 dark:group-hover:text-white': isDarkMode })} />
              <span className="lg:block  hidden flex-1 ms-3 whitespace-nowrap">Privacy</span>
            </NavLink>
          </li>
          <li><hr className={classNames("h-[1.5px]", { 'bg-black': !isDarkMode, 'bg-white': isDarkMode })} /></li>
          <li>
            <NavLink to="verification" className="flex items-center p-2 justify-center rounded-lg hover:bg-green-900 hover:text-white font-bold">
              <IconTickCircle className={classNames("flex-shrink-0 w-5 h-5 transition duration-75", { 'dark:text-gray-400': isDarkMode, 'group-hover:text-gray-900 dark:group-hover:text-white': isDarkMode })} />
              <span className="lg:block  hidden flex-1 ms-3 whitespace-nowrap">Verification</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SettingsSidebar;
