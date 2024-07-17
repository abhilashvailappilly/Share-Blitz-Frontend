
import React, { createContext, useState, useRef, useEffect, ReactNode, useContext } from "react";
import { useChatStore } from "@/ZustandStore/chatStore";

import { toast } from "react-toastify";
import { randomID } from "@/utils/helpers/RandomIdGenerator";
import { useVideoCallStore } from "@/ZustandStore/videoCallStore";

interface ContextProviderProps {
  children: ReactNode;
}

interface Call {
  isReceivedCall: boolean;
  from: string;
  // name: string;
  // signal: any;
}

const VideoCallContext = createContext<any>(null);

export const useVideoCallContext = () => {
    const context = useContext(VideoCallContext);
    if (!context) {
      throw new Error('useSocketContext must be used within a SocketContextProvider');
    }
    return context;
  }

const VideoCallContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const { socket } = useChatStore();
 const {setRoomId } = useVideoCallStore()
  // const [stream, setStream] = useState<MediaStream | null>(null);
  const [me, setMe] = useState<string>("");
  const [name,setName] = useState<string>('')
  const [callAccepted,setCallAccepted] = useState<boolean>(false)
  const [isCalling,setIsCalling] = useState<boolean>(false)
  const [callReceiving,setCallReceiving] = useState<boolean>(false)
  const [callEnded,setCallEnded] = useState<boolean>(false)
  const [call, setCall] = useState<Call>({
    isReceivedCall: false,
    from: "",
    // name: "",
    // signal: ""
  });

  const myVideo = useRef<HTMLVideoElement | null>(null);
  const userVideo = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const handleConnected = (id: string) => setMe(id);
    const handleCallFromUser = ({ roomId,from }: { roomId: string, from: string, }) => {
      // toast('call user received from backend');console.log('recive call',from,name) 
      setCallReceiving(true)
      setRoomId(roomId)
      setCall({ isReceivedCall: true, from });
      
    };
    // const handleCallUser = ({ from, name: callerName, signal }: { from: string, name: string, signal: any }) => {
    //   // toast('call user received from backend');console.log('recive call',from,name) 
    //   setCallReceiving(true)
    //   setCall({ isReceivedCall: true, from, name: callerName, signal });
    // };
    // const handleCallEnded = () =>{ 
    //   toast("call ended")
    //   leaveCall()

    // };
    const handleAnsweredCall = () => {
      // toast('call user received from backend');console.log('recive call',from,name) 
      setCallAccepted(true);
      setCall({ ...call, isReceivedCall: false });
      
    };

    const handleCallEnded = () => {
      // toast('call user received from backend');console.log('recive call',from,name) 
     toast('Call ended')
     setCallEnded(true);
      setRoomId('')
    setCallAccepted(false);
    setIsCalling(false)

    setCall({ isReceivedCall: false, from: ""});
      
    };
   
    socket?.on('connected', handleConnected);
    socket?.on('callFromUser', handleCallFromUser);
    socket?.on('answeredCall', handleAnsweredCall);
    socket?.on('callEnded', handleCallEnded);
  
    return () => {
      socket?.off('connected', handleConnected);
      // socket?.off('callUser', handleCallUser);
      socket?.off('callFromUser', handleCallFromUser);
     socket?.off('answeredCall', handleAnsweredCall);
      socket?.off('callEnded', handleCallEnded);
    };
  }, [socket]);

// const answeredCall1 =async() => {
//     // const currentStream= await getMediaStream();
//     console.log('ans c my',myVideo)
//     // if (myVideo.current) {
//     //   toast('setteed')
//     //   myVideo.current.srcObject = stream;
//     // }
//     toast.success('call accepted');
//     setCallAccepted(true);
//   };


  
  // const callUser = async (id: string) => {
  //   const currentStream = await getMediaStream();
  //   setCall({isReceivedCall: false,
  //     from: id,
  //     name: "",
  //     signal: ""})
  //    if (myVideo.current) {
  //       myVideo.current.srcObject = currentStream;
  //     }
  //   if (!socket || !currentStream) return;
  
  //   const peer = new SimplePeer({ initiator: true, trickle: false, stream: currentStream });
  
  //   peer.on('signal', (data) => {
  //     socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
  //   });
  
  //   peer.on('stream', (currentStream) => {
  //     if (userVideo.current) {
  //       userVideo.current.srcObject = currentStream;
  //     }
  //   });
  
  //   socket.on('answeredCall',async (signal) => {
  //     // const currentStream= await getMediaStream();
  //     // await answeredCall()
  //     // if (myVideo.current) {
  //     //   toast('setteed')
  //     //   myVideo.current.srcObject = stream;
  //     // }
  //     toast.success('call accepted');
  //     setCallAccepted(true);
  //     peer.signal(signal);
  //   });
  
  //   connectionRef.current = peer;
  // };

  const callUser  = async (userId : string) =>{
    try {
      // setCall({ isReceivedCall: true, from:userId });

      const roomId = randomID(5);
      if (!socket) return;
      setRoomId(roomId);
      socket.emit('callUser', { to: userId,roomId});
    } catch (error) {
      
    }
  }
  const answerCall = async () => {
    setCallAccepted(true);
    setCall({ ...call, isReceivedCall: false });
    if (!socket) return;

    socket.emit('answerCall', { to: call.from });
      // joinRoom(roomId);

  }
  // const answerCall = async () => {
    // setCallAccepted(true);
    // setCall({ ...call, isReceivedCall: false });
  
    // const currentStream = await getMediaStream();
    // if (myVideo.current) {

    //   myVideo.current.srcObject = currentStream;
    // }
    // if (!socket || !currentStream) return;
  
    // const peer = new SimplePeer({ initiator: false, trickle: false, stream: currentStream });
  
    // peer.on('signal', (data) => {
    //   socket.emit('answerCall', { signal: data, to: call.from });
    // });
  
    // peer.on('stream', (stream) => {
    //   if (userVideo.current) {
    //     userVideo.current.srcObject = stream;
    //   }
    // });
  
    // peer.signal(call.signal);
    // connectionRef.current = peer;
  // };
  

  const leaveCall = (id: string) => {
    if (!socket) {
      console.error('Socket is not connected');
      toast.error('Socket is not connected');
      return;
    }
    setCallEnded(true);
    socket.emit('callEnded', { userId: id });
    // connectionRef.current?.destroy();
    // us.current?.destroy();
    // connectionRef.current?.destroy();
    setCallAccepted(false);
    setIsCalling(false)
    setRoomId('')

    // setStream(null);
    setCall({ isReceivedCall: false, from: ""});
  };
  

  return (
    <VideoCallContext.Provider value={{
      call,
      callUser,
      answerCall,
      leaveCall,
      // answeredCall,
      callAccepted,
      callReceiving,
      callEnded,
      myVideo,
      userVideo,
      // stream,
      name,
      isCalling,
      setCallReceiving,
      setIsCalling,
      setName,
      me
    }}>
      {children}
    </VideoCallContext.Provider>
  );
};

export { VideoCallContextProvider, VideoCallContext };

