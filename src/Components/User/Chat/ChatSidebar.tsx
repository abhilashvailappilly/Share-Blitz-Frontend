import { useDarkMode } from '@/Context/DarkModeContext';
import { useState, useEffect, useRef, useCallback } from 'react';
import { SearchUser } from '@/Api/user/userApiMethod';
import ProfileDataInterface from '@/Types/User/userProfile';
import React from 'react';
import ListUsersSidebar from './ListUsersSidebar';
import { GetRecentChats } from '@/Api/user/chatApiMethods';
import { useChatStore } from '@/ZustandStore/chatStore';

interface ChatSidebarProps {
  onUserSelect: (user: ProfileDataInterface) => void;
}
interface Room {
  _id: string;
  createdAt: string;
  isGroupChat: boolean;
  messages: string[]; // Assuming message IDs are strings
  name: string;
  lastMessage:string;
  participants: string[]; // Array of participant IDs
  updatedAt: string;
  __v: number;
}

interface ChatRoom {
  room: Room;
  participantsDetails: ProfileDataInterface[];
}
const ChatSidebar: React.FC<ChatSidebarProps> = React.memo(({ onUserSelect }) => {
  const { isDarkMode } = useDarkMode();
  const [isLoading, setIsLoading] = useState(true);
  const [allUsers, setAllUsers] = useState<ProfileDataInterface[]>([]);
  const [searchedUsers, setSearchedUsers] = useState<ProfileDataInterface[]>([]);
  // const [recentChat, setRecentChat] = useState<ChatRoom[]>([]);
  const {recentChats,setRecentChats} = useChatStore((state) => state)
  const [searchInput, setSearchInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchRecentChats();
  }, []);
  useEffect(() => {
console.log('recent chaets,',recentChats)
  }, [recentChats]);


  const fetchRecentChats = async () => {
    try {
      const response = await GetRecentChats();
      if (response.success) {
        setRecentChats(response.data.users);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchInput === '') {
      setSearchedUsers(allUsers);
    } else {
      setSearchedUsers(allUsers.filter(user => user.name.toLowerCase().includes(searchInput.toLowerCase())));
    }
  }, [searchInput, allUsers]);

  const handleUserClick = useCallback((user: ProfileDataInterface) => {
    // if (!recentChat.some(chat => chat._id === user._id)) {
    //   setRecentChat([user, ...recentChat]);
    // }
    setSearchInput('');
    inputRef.current?.blur();
    onUserSelect(user);
  }, [onUserSelect, recentChats]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (searchInput.trim() === '') {
        setSearchedUsers([]);
        return;
      }
      try {
        const response = await SearchUser(searchInput);
        if (response.success) {
          setSearchedUsers(response.users);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setSearchedUsers([]);
      }
    };

    const debounceFetch = setTimeout(fetchUserDetails, 300);
    return () => clearTimeout(debounceFetch);
  }, [searchInput]);

  return (
    <div className={`w-full md:w-1/4 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} h-full border-r ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
      <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} h-1/6`}>
        <input
          ref={inputRef}
          type='text'
          placeholder='Search friends'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
        />
      </div>
      <div className='p-4 overflow-y-auto h-5/6'>
        <ul>
          {isFocused && searchInput ? (
            <>
              <h1 className={`p-2 ${isDarkMode ? 'text-white' : 'text-black'} font-bold text-xl`}>Search Result</h1>
              {searchedUsers.map((user) => (
                <ListUsersSidebar
                  key={user._id}
                  isSearching={true}
                  user={user}
                  doFunction={handleUserClick}
                />
              ))}
            </>
          ) : (
            <>
              <h1 className={`p-2 ${isDarkMode ? 'text-white' : 'text-black'} font-bold text-xl`}>Recent chats</h1>
              {recentChats.length > 0
                ? recentChats.map((user,index) => (
                  <ListUsersSidebar
                    key={index}
                    isSearching={false}
                    user={user.participantsDetails[0]}
                    lastMessage= {user.room.lastMessage}
                    doFunction={handleUserClick}
                  />
                ))
                : <li className={`p-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>No recent chats available</li>
              }
            </>
          )}
        </ul>
      </div>
    </div>
  );
});

export default ChatSidebar;
