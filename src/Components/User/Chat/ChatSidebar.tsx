import { useDarkMode } from '@/Context/DarkModeContext';
import { useState, useEffect, useRef, useCallback } from 'react';
import { SearchUser } from '@/Api/user/userApiMethod';
import ProfileDataInterface from '@/Types/User/userProfile';
import React from 'react';
import ListUsersSidebar from './ListUsersSidebar';
import { GetRecentChats } from '@/Api/user/chatApiMethods';
import { useChatStore } from '@/ZustandStore/chatStore';
import CreateGroupChatModal from './GroupChat/CreateGroupChatModal';
import ListGroupChatsInSidebar from './GroupChat/ListGroupChatsInsideSidebar';
import useAppSelector from '@/hooks/UseSelector';
import { useToast } from '@/Components/ui/use-toast';

interface ChatSidebarProps {
  onUserSelect: (user: ProfileDataInterface) => void;
}
interface Room {
  _id: string;
  createdAt: string;
  isGroupChat: boolean;
  messages: string[]; 
  name: string;
  lastMessage:string;
  participants: string[]; // Array of participant IDs
  updatedAt: string;
  __v: number;
}


const ChatSidebar: React.FC<ChatSidebarProps> = React.memo(({ onUserSelect }) => {
  const { isDarkMode } = useDarkMode();
  const [isLoading, setIsLoading] = useState(true);
  const [allUsers] = useState<ProfileDataInterface[]>([]);
  const [searchedUsers, setSearchedUsers] = useState<ProfileDataInterface[]>([]);
  // const [recentChat, setRecentChat] = useState<ChatRoom[]>([]);
  const {recentChats,setRecentChats,setSelectedRoom} = useChatStore((state) => state)
  const [searchInput, setSearchInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const {setSidebarVisible ,setSelectedUser} = useChatStore()
  const userInfo = useAppSelector(state => state.auth.userInfo);
  const {toast: toaster} = useToast()

  const [active] = useState<{chat:boolean,groupChat:boolean}>
  ({chat:true,groupChat:false})
  const [showCreateGroupChatModal,setShowCreateGroupChatModal] = useState<boolean>(false)

  useEffect(() => {
    fetchRecentChats();
  }, []);

if(isLoading){
}
   
  const fetchRecentChats = async () => {
    try {
      const response = await GetRecentChats();
      if (response.success) {
        console.log('recent chats :',response.data.users)
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
  
    if(user._id === userInfo._id)
      return toaster({
				title: "You cannot chat with yourself",
			});
		
    setSearchInput('');
    inputRef.current?.blur();
    onUserSelect(user);
  }, [onUserSelect, recentChats]);

  const handleUserClickGroupChat = useCallback((room: Room) => {
    
    setSelectedUser(null);
    setSelectedRoom(null)
    setSelectedRoom(room)
    if (window.innerWidth < 768) {
      setSidebarVisible(false);
    }

  }, [ ]);
  
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
      
      <div className='p-4 overflow-y-auto h-5/6 no-scrollbar'>
      <div className='w-full  h-[50px] flex gap-1'>
        <div className={`w-full h-full flex justify-center items-center cursor-pointer ${
              active.chat ? 'border-b-4 rounded-lg bg-gray-200 dark:bg-gray-700' : 'hover:border-b-4 '
            } rounded`}
            onClick={()=>setShowCreateGroupChatModal(!showCreateGroupChatModal)}
            >
           <span className='font-bold dark:text-white text-black'> + Create a group</span>
        </div>
        {/* <div className={`w-1/4 h-full flex justify-center items-center cursor-pointer ${
              active.chat ? 'border-b-4 rounded-lg bg-gray-200 dark:bg-gray-700' : 'hover:border-b-4 '
            } rounded`}>
              Search Chat
        </div> */}
      
      </div>
        <ul>
          {isFocused && searchInput ? (
            <li>
              <h1 className={`p-2 ${isDarkMode ? 'text-white' : 'text-black'} font-bold text-xl`}>Search Result</h1>
              {searchedUsers.map((user) => (
                <ListUsersSidebar
                  key={user._id}
                  isSearching={true}
                  user={user}
                  doFunction={handleUserClick}
                />
              ))}
            </li>
          ) : (
            <li>
              <h1 className={`p-2 ${isDarkMode ? 'text-white' : 'text-black'} font-bold text-xl`}>Recent chats</h1>
              {recentChats.length > 0
                ? recentChats.map((user,index) => (
                  user?.room?.isGroupChat ? 
                  <ListGroupChatsInSidebar
                   key={index}
                    room={user?.room}
                    user={user.participantsDetails[0]}
                    lastMessage= {user.room.lastMessage}
                    doFunction={handleUserClickGroupChat}
                  />
                  :
                  <ListUsersSidebar
                    key={index}
                    isSearching={false}
                    roomId={user?.room?._id}
                    user={user.participantsDetails[0]}
                    lastMessage= {user.room.lastMessage}
                    doFunction={handleUserClick}
                  />
                ))
                : <div className={`p-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>No recent chats available</div>
              }
            </li>
          )}
        </ul>
      </div>
      <CreateGroupChatModal showCreateGroupChatModal={showCreateGroupChatModal} setShowCreateGroupChatModal={setShowCreateGroupChatModal}/>
    </div>
  );
});

export default ChatSidebar;
