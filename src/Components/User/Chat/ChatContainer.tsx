import { useDarkMode } from '@/Context/DarkModeContext';
// import ChatSidebar from './ChatSidebar';
import {  useEffect, useCallback, lazy, Suspense } from 'react';
import ProfileDataInterface from '@/Types/User/userProfile';
import { useChatStore } from '@/ZustandStore/chatStore';
import LoaderSpinner from '@/Components/Common/Loader/LoaderSpinner';
// import MessageSection from './MessageSection';

const ChatSidebar = lazy(() => import('./ChatSidebar'));
const MessageSection = lazy(() => import('./MessageSection'));

const ChatContainer = () => {
  const { isDarkMode } = useDarkMode();
  // const {onlineUsers} = useSocketContext();
  const onlineUsers = useChatStore((state) => state.onlineUsers)
  // const [isOnline,setIsOnline] = useState<boolean>(false)
  const selectedUser = useChatStore((state) => state.selectedUser);
  const isSidebarVisible = useChatStore((state) => state.isSidebarVisible);
  const setSelectedUser = useChatStore((state) => state.setSelectedUser);
  const setIsSidebarVisible = useChatStore((state) => state.setSidebarVisible);
  const {setSelectedRoom} = useChatStore()
  // useEffect(()=>{
  //   console.log("online users",onlineUsers)
  //   if(selectedUser?._id)
  //   setIsOnline(onlineUsers.includes(selectedUser._id))
  // },[selectedUser])
 

  const handleUserSelect = useCallback((user: ProfileDataInterface) => {

    setSelectedUser(null);
    setSelectedRoom(null)
    setSelectedUser(user);
    if (window.innerWidth < 768) {
      setIsSidebarVisible(false);
    }
  }, [setSelectedUser, setIsSidebarVisible]);


  const handleBackClick = useCallback(() => {
    setIsSidebarVisible(true);
    setSelectedUser(null);
  }, [setIsSidebarVisible, setSelectedUser]);


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarVisible(true);
      } else {
        setIsSidebarVisible(selectedUser === null);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [selectedUser]);

  return (
    <div className={`w-full h-screen ${isDarkMode ? 'bg-gray-800' : 'bg-emerald-200'} flex`}>
      {isSidebarVisible && (
      <Suspense fallback={<div className='w-full h-screen flex  justify-center items-center'><LoaderSpinner/></div>}>
       <ChatSidebar onUserSelect={handleUserSelect} />
        </Suspense>
      )}
      <Suspense fallback={<div className='w-full h-screen flex  justify-center items-center'><LoaderSpinner/></div>}>
        <MessageSection />
      </Suspense>
      
    </div>
  );
};

export default ChatContainer;
