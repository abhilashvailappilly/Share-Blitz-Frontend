import Explore from "../../../Components/User/Explore/Explore"
import Navbar from "../../../Components/User/Navbar/Navbar"
import Sidebar from "../../../Components/User/Sidebar/Sidebar2"

const ExplorePage = () => {
  return (
    <div className="flex">
    <Navbar/>
    <Sidebar/>
    <div className="flex-1 ">
      <Explore/>
    </div>
    
   </div>
  )
}

export default ExplorePage
