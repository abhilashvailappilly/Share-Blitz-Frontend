import React from 'react';
import VideoCall from './VideoCall';
import Options from './Options';
import Notification from './Notification';

const App: React.FC = () => {
  return (
    <div>
      <h1>One-to-One Video Call</h1>
      <VideoCall />
      <Options >
        <Notification />
      </Options>
    </div>
  );
};

export default App;
