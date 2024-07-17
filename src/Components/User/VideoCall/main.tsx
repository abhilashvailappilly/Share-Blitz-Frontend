import React from 'react';
import VideoCallingNotification from './VideoCallingNotification';
import ZehoCloud from './ZehoVideo';

const VideoCallContainer: React.FC = () => {

  return (
    <div>
      {/* <VideoCall /> */}
      <ZehoCloud/>
      <VideoCallingNotification/>
    </div>
  );
};

export default VideoCallContainer;
