
import ChatContainer from "@/Components/User/Chat/ChatContainer"
import Navbar from "@/Components/User/Navbar/Navbar"
import Sidebar2 from "@/Components/User/Sidebar/Sidebar2"

const MessagesPage = () => {
  return (
    <div className="flex">
    {/* <Navbar/> */}
    <Sidebar2/>
    <div className="flex-1 ">
      <ChatContainer/>
    </div>
    
   </div>
  )
}

export default MessagesPage
