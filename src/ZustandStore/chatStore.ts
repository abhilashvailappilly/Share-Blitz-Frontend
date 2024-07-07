import { create } from 'zustand';
import ProfileDataInterface from '@/Types/User/userProfile';
import { Socket } from 'socket.io-client';
import { RecentChatInteface, Message, Room } from '@/Types/User/ZustandStore';

interface ChatStoreState {
  selectedUser: ProfileDataInterface | null;
  selectedRoom: Room | null;
  isSidebarVisible: boolean;
  onlineUsers: string[];
  messages: Message[];
  socket: Socket | null;
  typing:string[]
  recentChats:RecentChatInteface[]
  setSelectedUser: (user: ProfileDataInterface | null) => void;
  setSelectedRoom: (room: Room | null) => void;
  setSidebarVisible: (isVisible: boolean) => void;
  setOnlineUsers: (users: string[]) => void;
  setTypingUsers: (userId: string[]) => void;
  setMessages: (message: Message[]) => void;
  setRecentChats: (chats: RecentChatInteface[]) => void;
  // setMessagesDeleted: (messages: Message[]) => void; // Corrected type
  setSocket: (socket: Socket | null) => void;
}

export const useChatStore = create<ChatStoreState>((set) => ({
  selectedUser: null,
  selectedRoom:null,
  isSidebarVisible: true,
  onlineUsers: [],
  messages:[],
  typing:[],
  recentChats:[],
  socket: null,
  setSelectedUser: (user) => set({ selectedUser: user }),
  setSelectedRoom: (selectedRoom) => set({ selectedRoom }),
  setMessages:(messages) => set({messages}),
  setRecentChats:(recentChats) => set({recentChats}),
  // setMessagesDeleted: (messages) => set((state) => ({ ...state, messages })), // Update messages correctly
  setSidebarVisible: (isVisible) => set({ isSidebarVisible: isVisible }),
  setOnlineUsers: (users) => set({ onlineUsers: users }),
  setTypingUsers: (users) => set({ typing: users }),
  setSocket: (socket) => set({ socket }),
}));
