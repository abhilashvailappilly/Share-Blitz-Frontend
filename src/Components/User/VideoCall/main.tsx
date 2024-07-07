import React from 'react';
import VideoCall from './VideoCall';
import VideoCallingNotification from './VideoCallingNotification';

const VideoCallContainer: React.FC = () => {
  // const { selectedUser, onlineUsers, typing } = useChatStore();

  return (
    <div>
      <VideoCall />
      <VideoCallingNotification/>
    </div>
  );
};

export default VideoCallContainer;
