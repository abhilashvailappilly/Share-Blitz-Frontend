import Push from 'push.js';

interface NotificationOptions {
  title: string;
  body: string;
  icon?: string;
  timeout?: number;
  onClick?: () => void;
}

export const sendPushNotification = ({
  title,
  body,
  icon = "./logo.png",
  timeout = 4000,
  onClick = () => {
    window.focus(); 
  }
}: NotificationOptions) => {
  Push.create(title, {
    body: body,
    icon: icon,
    timeout: timeout,
    onClick: onClick,
  });
};