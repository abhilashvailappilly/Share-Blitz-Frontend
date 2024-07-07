import { Notification as NotificationInterface } from '@/Types/User/Notifications';
import NewMessage from './NotificationTypes/NewMessage';
import FriendRequest from './NotificationTypes/FriendRequest';
import DefaultNotification from './NotificationTypes/Default';

interface NotificationComponentInterface {
  notification: NotificationInterface;
}

const Notification = ({ notification }: NotificationComponentInterface) => {


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