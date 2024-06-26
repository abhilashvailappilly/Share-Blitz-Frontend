import { getUser } from '@/Api/user/authApiMethod';
import { useDarkMode } from '@/Context/DarkModeContext';
import { Notification } from '@/Types/User/Notifications';
import ProfileDataInterface from '@/Types/User/userProfile';
import { useChatStore } from '@/ZustandStore/chatStore';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface NotificationComponentInterface {
    notification: Notification;
  }
const NewMessage = ({notification} : NotificationComponentInterface) => {
  const { isDarkMode } = useDarkMode();
  const [userData,setUserData] = useState<ProfileDataInterface | null>(null)
 const {setSelectedUser} = useChatStore()
 const navigate = useNavigate()
   let  bgColor = 'bg-gray-100 text-gray-800';
   let  darkBgColor = 'dark:bg-gray-900 dark:text-gray-300';
   let highlightClass = '';

   if (!notification.isSeen) {
    highlightClass = 'border-l-4 border-blue-500';
  }
  useEffect(()=>{
    if(notification.userId)
         fetchUserData()
  },[])

  const fetchUserData = async () => {
        try {
        if(!notification.userId)
            return
        const res = await getUser(notification?.userId)
        if (res) {
            setUserData(res.user)
            
        }
        } catch (error) {
        console.log(error)
        }
    }
  const handleClickViewChat = ()=>{
   
    setSelectedUser(userData);
    navigate('/message')

  }
  return (
    <div
      className={`flex items-center p-4 mb-4 text-sm rounded-lg ${bgColor} ${isDarkMode ? darkBgColor : ''} ${highlightClass}`}
      role="alert"
      onClick={handleClickViewChat}
    >
     <div>
        <img src={userData?.profileImageUrl}  className='w-8 h-8 rounded-full mr-3' alt="" />
     </div>
      <div>
        {/* <span className="font-medium">{notification.message}</span> */}
        <span className="font-medium">You have a new message from {userData?.name}</span>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {moment(notification.createdAt).fromNow()}
        </div>
      </div>
    </div>
  )
}

export default NewMessage
