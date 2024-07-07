import { useVideoCallContext } from '@/Context/VideoCallContext';
import ProfileDataInterface from '@/Types/User/userProfile';
import React, { useEffect } from 'react';
import { FaPhoneSlash } from 'react-icons/fa';


interface CallingScreenProps {
  user: ProfileDataInterface;
  onEndCall: () => void;
}

const CallingScreen: React.FC<CallingScreenProps> = ({ user, onEndCall }) => {
  const { callUser, stream, callAccepted } = useVideoCallContext();

  useEffect(() => {
    callUser(user._id);
  }, []);
console.log(stream,user)
  return (
    <>
           
      {!callAccepted &&
        <div className="fixed z-40 h-screen inset-0 bg-gray-900 bg-opacity-75 flex flex-col items-center justify-between text-white">
          <div className="mb-4 flex flex-col items-center">
            <div className="rounded-full mt-10 bg-red-300 overflow-hidden w-24 h-24 mb-2">
              <img src={user?.profileImageUrl} alt={user?.name} className="h-full w-full object-cover" />
            </div>
            <div className="text-xl mt-2">{user?.name}</div>
            <div className="text-sm mt-4">Calling....</div>
            {/* <div className="text-sm mt-4">
              {stream && (
                <Paper className="w-1/3 h-1/2">
                  <Grid>
                    <Typography>{'Your video'}</Typography>
                    <video playsInline muted ref={myVideo} autoPlay className="" />
                  </Grid>
                </Paper>
              )}
            </div> */}
          </div>
          <button onClick={onEndCall} className="bg-red-600 mb-16 p-4 rounded-full">
            <FaPhoneSlash className="w-8 h-8" />
          </button>
        </div>
      // ) : (
      //   <div className="fixed z-40 h-screen inset-0 bg-gray-900 bg-opacity-75 flex flex-col items-center justify-between text-white">
      //     <div className="mb-4 flex flex-col items-center">
      //       <VideoCall />
      //     </div>
      //   </div>
      // )
      }
    </>
  );
};

export default CallingScreen;
