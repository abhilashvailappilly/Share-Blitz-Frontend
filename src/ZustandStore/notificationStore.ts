import { Notification } from '@/Types/User/Notifications';
import { create } from 'zustand';



interface ChatStoreState {
 
  notifications: Notification[];
  setNotifications: (notifiaction: Notification[]) => void;
 
}

export const useNotificationStore = create<ChatStoreState>((set) => ({
    notifications: [],
    setNotifications: (notifications) => set({ notifications }),
}));
