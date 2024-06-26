import { useDarkMode } from '@/Context/DarkModeContext';
import { Notification as NotificationInterface } from '@/Types/User/Notifications';
import NewMessage from './NotificationTypes/NewMessage';
import FriendRequest from './NotificationTypes/FriendRequest';
import DefaultNotification from './NotificationTypes/Default';

interface NotificationComponentInterface {
  notification: NotificationInterface;
}

const Notification = ({ notification }: NotificationComponentInterface) => {
  const { isDarkMode } = useDarkMode();

  let bgColor = '';
  let darkBgColor = '';
  let highlightClass = '';

  switch (notification.type) {
    case 'success':
      bgColor = 'bg-green-100 text-green-800';
      darkBgColor = 'dark:bg-green-900 dark:text-green-300';
      break;
    case 'error':
      bgColor = 'bg-red-100 text-red-800';
      darkBgColor = 'dark:bg-red-900 dark:text-red-300';
      break;
    case 'info':
      bgColor = 'bg-blue-100 text-blue-800';
      darkBgColor = 'dark:bg-blue-900 dark:text-blue-300';
      break;
    case 'warning':
      bgColor = 'bg-yellow-100 text-yellow-800';
      darkBgColor = 'dark:bg-yellow-900 dark:text-yellow-300';
      break;
    default:
      bgColor = 'bg-gray-100 text-gray-800';
      darkBgColor = 'dark:bg-gray-900 dark:text-gray-300';
  }

  if (!notification.isSeen) {
    highlightClass = 'border-l-4 border-blue-500';
  }

  return (
   <>
	{
		notification.type === "NEWMESSAGE" ? <NewMessage notification={notification} /> : 
		notification.type === "FRIENDREQUEST" ? <FriendRequest notification={notification} /> :
		<DefaultNotification notification={notification} />
	}
   </>
  );
};

export default Notification;