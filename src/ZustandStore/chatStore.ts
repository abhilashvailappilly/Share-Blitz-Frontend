import { create } from 'zustand';
import ProfileDataInterface from '@/Types/User/userProfile';
import { Socket } from 'socket.io-client';
import { Message } from '@/Types/User/ZustandStore';

interface ChatStoreState {
  selectedUser: ProfileDataInterface | null;
  selectedRoom: any | null;
  isSidebarVisible: boolean;
  onlineUsers: string[];
  messages: Message[];
  socket: Socket | null;
  setSelectedUser: (user: ProfileDataInterface | null) => void;
  setSelectedRoom: (user: any | null) => void;
  setSidebarVisible: (isVisible: boolean) => void;
  setOnlineUsers: (users: string[]) => void;
  setMessages: (users: Message[]) => void;
  // setMessagesDeleted: (messages: Message[]) => void; // Corrected type
  setSocket: (socket: Socket | null) => void;
}

export const useChatStore = create<ChatStoreState>((set) => ({
  selectedUser: null,
  selectedRoom:null,
  isSidebarVisible: true,
  onlineUsers: [],
  messages:[],
  socket: null,
  setSelectedUser: (user) => set({ selectedUser: user }),
  setSelectedRoom: (selectedRoom) => set({ selectedRoom }),
  setMessages:(messages) => set({messages}),
  // setMessagesDeleted: (messages) => set((state) => ({ ...state, messages })), // Update messages correctly
  setSidebarVisible: (isVisible) => set({ isSidebarVisible: isVisible }),
  setOnlineUsers: (users) => set({ onlineUsers: users }),
  setSocket: (socket) => set({ socket }),
}));
