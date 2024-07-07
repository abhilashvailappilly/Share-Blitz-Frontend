import  { useEffect } from 'react'
import Notification from './Notification';
import { useDarkMode } from '@/Context/DarkModeContext';
import { useNotificationStore } from '@/ZustandStore/notificationStore';
import { GetAllNotifications, ToogleSeenOfNotifications } from '@/Api/user/notificationApiMethod';

// const notifications = [
//   { type: 'success', message: 'Your post has been published!', time: '2 minutes ago' },
//   { type: 'info', message: 'You have a new friend request', time: '10 minutes ago' },
//   { type: 'warning', message: 'Your password will expire in 3 days', time: '1 hour ago' },
//   { type: 'error', message: 'Failed to upload your photo', time: '2 hours ago' },
// ]

const NotificationContainer = () => {
  const { isDarkMode } = useDarkMode();
  const {notifications,setNotifications} = useNotificationStore()

  useEffect(() => {
    fetchNotifications()
    return ()=>{markNotificationsAsSeen()}
  },[])

  const fetchNotifications = async ()=>{
    try {
      const response = await GetAllNotifications()
      if(response.success){
        setNotifications([...response.data.notifications])
      }
    } catch (error) {
      console.log(error)
    }
  }

  const markNotificationsAsSeen = async ()=>{
    try {
      const response = await ToogleSeenOfNotifications()
      if(response.success){
        setNotifications([...response.data.notifications])
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className={`max-w-full  h-full min-h-screen p-10 dark:bg-slate-800 ${isDarkMode ? 'dark' : ''}`}>
      <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
      {notifications.map((notification, index) => (
        <Notification
          key={index}
          notification= {notification}
        />
      ))}
    </div>
  )
}

export default NotificationContainer
