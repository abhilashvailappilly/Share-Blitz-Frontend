
import { FC, ReactNode, createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import useAppSelector from "@/hooks/UseSelector";
import { useChatStore } from "@/ZustandStore/chatStore";
import { toast } from "react-toastify";

interface SocketContextInterface {
  onlineUsers: string[];
  setOnlineUsers: React.Dispatch<React.SetStateAction<string[]>>;
}

interface SocketContextProviderProps {
  children: ReactNode;
}

export const SocketContext = createContext<SocketContextInterface | undefined>(undefined);

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocketContext must be used within a SocketContextProvider');
  }
  return context;
}

export const SocketContextProvider: FC<SocketContextProviderProps> = ({ children }) => {
  const BACKENDURL = import.meta.env.VITE_BACKEND_URL;
  const [socket, setSocket] = useState<Socket | null>(null);
  const onlineUsers = useChatStore((state) => state.onlineUsers);
  const setOnlineUsersStore = useChatStore((state) => state.setOnlineUsers);
  const setSocketStore = useChatStore((state) => state.setSocket);
  const userInfo = useAppSelector(state => state.auth.userInfo);
  const adminInfo = useAppSelector(state => state.auth.adminInfo);

  const setOnlineUsers: React.Dispatch<React.SetStateAction<string[]>> = (value) => {
    if (typeof value === 'function') {
      setOnlineUsersStore(value(onlineUsers));
    } else {
      setOnlineUsersStore(value);
    }
  };

  useEffect(() => {
    console.log('admin info',adminInfo)
    if (userInfo || adminInfo ) {
      const newSocket = io(BACKENDURL, {
        query: {
          userId: userInfo?._id || adminInfo?._id
        }
      });
      setSocket(newSocket);
      setSocketStore(newSocket)

      newSocket.on("getOnlineUsers", (users) => {
        console.log("received get users:", users);
        setOnlineUsers(users);
      });


      return () => {
        newSocket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [userInfo,adminInfo]);

  return (
    <SocketContext.Provider value={{ onlineUsers, setOnlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
