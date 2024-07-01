import React from 'react';
import VideoCall from './VideoCall';
import Options from './Options';
import Notification from './Notification';
import VideoCallingNotification from './VideoCallingNotification';
import { useVideoCallContext } from '@/Context/VideoCallContext';
import { useChatStore } from '@/ZustandStore/chatStore';

const VideoCallContainer: React.FC = () => {
  const {callUser} =useVideoCallContext()
  // const { selectedUser, onlineUsers, typing } = useChatStore();

  return (
    <div>
      {/* <h1>One-to-One Video Call</h1> */}
      <VideoCall />
      {/* <Options > */}
        {/* <Notification /> */}
        {/* <div>
          <button onClick={()=>callUser(selectedUser?._id)}>call</button>
        </div> */}
        <VideoCallingNotification/>
      {/* </Options> */}
    </div>
  );
};

export default VideoCallContainer;
