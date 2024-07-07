import React, { useEffect, useState } from 'react'
import { IconButton } from '@mui/material';
import { VideoCallContext, useVideoCallContext } from '@/Context/VideoCallContext'
import { Grid, Paper, Typography } from '@mui/material'
import { CallEnd, MicOff, Mic, VideocamOff, Videocam } from '@mui/icons-material';
import { FaMicrophone, FaMicrophoneAlt, FaMicrophoneSlash, FaPhoneSlash } from 'react-icons/fa';


const VideoCall = () => {
const {call,callAccepted ,answeredCall, myVideo , userVideo , callEnded,leaveCall , stream} =  useVideoCallContext()
const [isMuted, setIsMuted] = useState(false);
const [isCameraOff, setIsCameraOff] = useState(false);

const handleEndCall = () => {
  console.log('call :',call)
  leaveCall(call?.from)
};

const toggleMute = () => {
  setIsMuted(!isMuted);
  if (stream) {
    stream.getAudioTracks().forEach((track: { enabled: boolean; }) => {
      track.enabled = !track.enabled;
    });
  }
};
useEffect(()=>{

  console.log('myideo',myVideo)
  console.log('user',userVideo)
  console.log('stream',stream)
}
)
const toggleCamera = () => {
  setIsCameraOff(!isCameraOff);
  if (stream) {
    stream.getVideoTracks().forEach((track: { enabled: boolean; }) => {
      track.enabled = !track.enabled;
    });
  }
};

// useEffect(()=>{
//   answeredCall()
// },[])
  return (
    
    <>
    
   {callAccepted &&
    <div className="w-screen flex flex-col justify-center items-center h-screen dark:bg-slate-800 text-white">
      <div className="w-full h-3/4 flex flex-col items-center  justify-center">
        <div className="bg-white w-3/4 h-full mt-2 relative rounded-lg overflow-hidden">
          <video playsInline  ref={userVideo} autoPlay className="w-full h-full object-fill" />
          {/* <div className="bg-red-900 w-1/6 h-1/6 absolute bottom-0 right-0 m-4 rounded-lg overflow-hidden">
            <video playsInline muted ref={stream} autoPlay className="w-full h-full object-fill" />
          </div> */}
        </div>
       
      </div>
      <div className="w-full h-1/4 flex justify-center items-center space-x-4 p-4 rounded-lg mt-4">
          <button
            type="button"
            onClick={toggleMute}
            className="dark:bg-white bg-black hover:bg-red-700 p-4 rounded-full transition-transform transform hover:scale-105"
          >
            {isMuted ? <FaMicrophoneSlash className="w-8 h-8 dark:text-black text-white" /> : <FaMicrophone className="w-8 h-8 dark:text-black text-white" />}
          </button>
          <button
            type="button"
            onClick={handleEndCall}
            className="bg-red-600 hover:bg-red-700 p-4 rounded-full transition-transform transform hover:scale-105"
          >
            <FaPhoneSlash className="w-8 h-8" />
          </button>
          <button
            type="button"
            onClick={toggleCamera}
            className="dark:bg-white bg-black hover:bg-red-700 p-4 rounded-full transition-transform transform hover:scale-105"
          >
            {isCameraOff ? <VideocamOff className="w-8 h-8 dark:text-black text-white" /> : <Videocam className="w-8 h-8 dark:text-black text-white" />}
          </button>
          {/* <h1>{call?.from}</h1> */}
        </div>
    </div>}
   </>

  )
}

export default VideoCall
