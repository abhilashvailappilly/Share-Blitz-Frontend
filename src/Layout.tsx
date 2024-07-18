import Sidebar2 from "@/Components/User/Sidebar/Sidebar2"
import Navbar from "./Components/User/Navbar/Navbar"
import { ReactNode } from "react";
import App from "./Components/User/VideoCall/main";
import { useChatStore } from "./ZustandStore/chatStore";
import { useVideoCallContext } from "./Context/VideoCallContext";
import useListenMessages from "./hooks/UseListenMessages";

interface LayoutProps {
    children: ReactNode;
}
  
  const Layout: React.FC<LayoutProps> = ({ children }) => {
    const {selectedUser ,selectedRoom} = useChatStore()
    const {callAccepted} = useVideoCallContext()
    useListenMessages()
  return (
   
    <div className="flex flex-col min-h-screen">
    <App />
    <div className="flex flex-1">
     {!callAccepted&& <Sidebar2 />}
      <div className="flex-1">
      {!callAccepted ? children : null}
      </div>
    </div>
   { (!selectedUser && !selectedRoom)&&<Navbar />}
  </div>
  
  )
}

export default Layout
