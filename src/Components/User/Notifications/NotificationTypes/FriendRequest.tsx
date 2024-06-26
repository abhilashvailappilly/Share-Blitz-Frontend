import { useDarkMode } from '@/Context/DarkModeContext';
import { Notification } from '@/Types/User/Notifications';
import moment from 'moment';
interface NotificationComponentInterface {
    notification: Notification;
  }
const FriendRequest = ({notification } : NotificationComponentInterface) => {
      const { isDarkMode } = useDarkMode();
    
       let  bgColor = 'bg-gray-100 text-gray-800';
       let  darkBgColor = 'dark:bg-gray-900 dark:text-gray-300';
       let highlightClass = '';
    
       if (!notification.isSeen) {
        highlightClass = 'border-l-4 border-blue-500';
      }
  return (
    <div
     className={`flex items-center p-4 mb-4 text-sm rounded-lg ${bgColor} ${isDarkMode ? darkBgColor : ''} ${highlightClass}`}
     role="alert"
    >
    <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zM9 3h2v6H9V3zm0 8h2v2H9v-2z" />
    </svg>
    <div>
      <span className="font-medium">{notification.message}</span>
      <div className="text-xs text-gray-500 dark:text-gray-400">
        {moment(notification.createdAt).fromNow()}
      </div>
    </div>
  </div>
  )
}

export default FriendRequest
