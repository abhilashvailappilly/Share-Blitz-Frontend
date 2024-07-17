import { useEffect, useRef } from 'react';
import { useVideoCallContext } from '@/Context/VideoCallContext';
import { useVideoCallStore } from '@/ZustandStore/videoCallStore';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useNavigate } from 'react-router-dom';

function randomID(len: number) {
  let result = '';
  const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
  const maxPos = chars.length;
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(url = window.location.href) {
  const urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

const VideoCallRoom = () => {
  const { callAccepted, leaveCall, call } = useVideoCallContext();
  const { roomId: roomID } = useVideoCallStore();
  const navigate = useNavigate();
  const callContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!callAccepted) return;

    const handleLeaveRoom = async () => {
      await leaveCall(call?.from);
      navigate('/message');
    };

    if (callContainerRef.current) {
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        Number(import.meta.env.VITE_ZEGOCLOUD_APP_ID),
        import.meta.env.VITE_ZEGOCLOUD_SECRET_KEY,
        roomID,
        randomID(5),
        randomID(5)
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zp.joinRoom({
        container: callContainerRef.current,
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        showScreenSharingButton: true,
        showPreJoinView: false,
        turnOnCameraWhenJoining: true,
        turnOnMicrophoneWhenJoining: false,
        showLeaveRoomConfirmDialog: false,
        showRoomTimer: true,
        showLeavingView: false,
        showUserList: true,
        onLeaveRoom: handleLeaveRoom,
        onUserLeave:handleLeaveRoom,
        onUserAvatarSetter: (userList) => {
          userList.forEach((user) => {
            if (user?.setUserAvatar) {
              user.setUserAvatar('https://xxx.xxx.xx/xx.png');
            }
          });
        },
      });
    }
  }, [callAccepted, call?.from, leaveCall, navigate, roomID]);

  if (!callAccepted) return null;

  return (
    <div
      className="myCallContainer h-screen w-screen"
      ref={callContainerRef}
    ></div>
  );
};

export default VideoCallRoom;
