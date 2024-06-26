import Navbar from "@/Components/User/Navbar/Navbar"
import NotificationContainer from "@/Components/User/Notifications/NotificationContainer"
import Sidebar2 from "@/Components/User/Sidebar/Sidebar2"

const NotificationPage = () => {
  return (
    <div className="flex">
    <Navbar/>
    <Sidebar2/>
    <div className="flex-1 ">
       <NotificationContainer/>
    </div>
    
   </div>
  )
}

export default NotificationPage
