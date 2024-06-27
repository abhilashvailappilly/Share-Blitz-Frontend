console.log("Hello, World!");

import React, { createContext, useState, useRef, useEffect, ReactNode, useContext } from "react";
import { useChatStore } from "@/ZustandStore/chatStore";
import SimplePeer from "simple-peer";
import { toast } from "react-toastify";
import Peer, { MediaConnection } from 'peerjs';
// import 'webcrypto-shim';

interface ContextProviderProps {
  children: ReactNode;
}

interface Call {
  isReceivedCall: boolean;
  from: string;
  name: string;
  signal: any;
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

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [me, setMe] = useState<string>("");
  const [name,setName] = useState<string>('')
  const [callAccepted,setCallAccepted] = useState<boolean>(false)
  const [callEnded,setCallEnded] = useState<boolean>(false)
  const [call, setCall] = useState<Call>({
    isReceivedCall: false,
    from: "",
    name: "",
    signal: ""
  });

  const myVideo = useRef<HTMLVideoElement | null>(null);
  const userVideo = useRef<HTMLVideoElement | null>(null);
  const connectionRef = useRef<SimplePeer.Instance | null>(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        if (myVideo.current) {
          myVideo.current.srcObject = currentStream;
        }
      });

    socket?.on('connected', (id: string) => setMe(id));

    socket?.on('callUser', ({ from, name: callerName, signal }: { from: string, name: string, signal: any }) => {
        toast('call user revied from back')
      setCall({ isReceivedCall: true, from, name: callerName, signal });
    });
  }, [socket]);


  const callUser = (id : string) => {
    if (!socket) {
              console.error('Socket is not connected');
              toast.error('Socket is not connected');
              return;
            }
    if (!stream) {
                console.error('Stream is not available');
                toast.error('Stream is not available');
                return;
              }
    const peer = new SimplePeer({ initiator: true, trickle: false, stream: stream });

    peer.on('signal', (data) => {
        socket.emit('callUser', { userToCall: id, signalData: data, from: me, name: name });
    });

    peer.on('stream', (currentStream) => {
        if (userVideo.current) {
            userVideo.current.srcObject = currentStream;
          }
    });

    socket.on('answeredCall', (signal) => {
        toast.success('call accepted')
        setCallAccepted(true);

        peer.signal(signal);
    });

    connectionRef.current = peer;
}


  const answerCall = () => {
    setCallAccepted(true)
    setCall({ ...call, isReceivedCall: false });

    if (!socket) {
        console.error('Socket is not connected');
        toast.error('Socket is not connected');
        return;
      }
  
      if (!stream) {
        console.error('Stream is not available');
        toast.error('Stream is not available');
        return;
      }
  
 

    const peer = new SimplePeer({
      initiator: false,
      trickle: false,
      stream: stream ,
    });

    peer.on('signal', (data: any) => {
      socket?.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream: MediaStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream;
      }
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true)
    connectionRef.current?.destroy();
    window.location.reload();
  };

  return (
    <VideoCallContext.Provider value={{
      call,
      callUser,
      answerCall,
      leaveCall,
      callAccepted,
      callEnded,
      myVideo,
      userVideo,
      stream,
      name,
      setName,
      me
    }}>
      {children}
    </VideoCallContext.Provider>
  );
};

export { VideoCallContextProvider, VideoCallContext };

