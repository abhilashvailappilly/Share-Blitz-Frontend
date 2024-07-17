import { create } from 'zustand';



interface VideoCallStoreState {
 
  roomId: string;
  setRoomId: (roomId: string) => void;
 
}

export const useVideoCallStore = create<VideoCallStoreState>((set) => ({
    roomId: '',
    setRoomId: (roomId) => set({ roomId }),
}));
