// import {Button} from '../../../../components/ui/button'
import Navbar from "../../../Components/User/Navbar/Navbar"
import Sidebar from "../../../Components/User/Sidebar/Sidebar2"
import FriendsProfileContainer from "../../../Components/User/AnotherUserProfile/FriendsProfileContainer"
function Profile() {
  return (
    <div className="flex">
     <Navbar/>
     <Sidebar/>
     <div className="flex-1 ">
        {/* <ProfileContainer/> */}
        <FriendsProfileContainer/>
     </div>
     
    </div>
  )
}

export default Profile
