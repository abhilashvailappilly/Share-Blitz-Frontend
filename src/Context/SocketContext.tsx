// import { useChatStore } from "@/ZustandStore/chatStore";
// import useAppSelector from "@/hooks/UseSelector";
// import { FC, ReactNode, createContext, useContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { Socket, io } from "socket.io-client";

// interface SocketContextInterface {
//     onlineUsers: string[];
//     setOnlineUsers: React.Dispatch<React.SetStateAction<string[]>>;
//   }
//   interface SocketContextProviderProps {
//         children: ReactNode;
//     }
// export const SocketContext = createContext<SocketContextInterface | undefined>(undefined);

// export const useSocketContext = ()=>{
//     const context = useContext(SocketContext);
//     if (!context) {
//       throw new Error('useDarkMode must be used within a DarkModeProvider');
//     }
//     return context;
// }

// export const SocketContextProvider: FC<SocketContextProviderProps> = ({ children }) => {
//     const BACKENDURL = import.meta.env.VITE_BACKEND_URL;
//     const [socket, setSocket] = useState<Socket | null>(null);
// //   const [onlineUsers, setOnlineUsers] = useState<string[]>([]); 
//     const onlineUsers = useChatStore((state) => state.onlineUsers);
//     const setOnlineUsers = useChatStore((state) => state.setOnlineUsers);
//     const userInfo = useAppSelector(state => state.auth.userInfo);

//   useEffect(()=>{
//     if(userInfo) {
//         const newSocket  = io(BACKENDURL ,{
//             query:{
//                 userId:userInfo._id
//             }
//         });
//         setSocket(newSocket);

//         newSocket.on("getOnlineUsers",(users) => {
//             // toast.warning("get online ")
//             console.log("received get users :",users)
//             setOnlineUsers(users)
//         })
//         return () =>{ newSocket.close()}
//     } else {
//         if(socket) {
//             socket.close()
//             setSocket(null)
//         }
//     }
//   },[userInfo])
  
//     return (
//       <SocketContext.Provider value={{ onlineUsers,setOnlineUsers}}>
//         {children}
//       </SocketContext.Provider>
//     );
//   };
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

  const setOnlineUsers: React.Dispatch<React.SetStateAction<string[]>> = (value) => {
    if (typeof value === 'function') {
      setOnlineUsersStore(value(onlineUsers));
    } else {
      setOnlineUsersStore(value);
    }
  };

  useEffect(() => {
    if (userInfo) {
      const newSocket = io(BACKENDURL, {
        query: {
          userId: userInfo._id
        }
      });
      setSocket(newSocket);
      setSocketStore(newSocket)

      newSocket.on("getOnlineUsers", (users) => {
        // toast.info("get online")
        console.log("received get users:", users);
        setOnlineUsers(users);
      });

      // newSocket.on("newMessage", (users) => {toast.info("new messaes")
      //   console.log("received get users:", users);
      //   setOnlineUsers(users);
      // });

      return () => {
        newSocket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [userInfo]);

  return (
    <SocketContext.Provider value={{ onlineUsers, setOnlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
