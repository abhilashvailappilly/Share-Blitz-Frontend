import Navbar from "../../../Components/User/Navbar/Navbar"
import Search from "../../../Components/User/Search/Search"
import Sidebar2 from "../../../Components/User/Sidebar/Sidebar2"

function SearchPage() {
  return (
    <>
      <div className="flex ">
            <Navbar/>
            <Sidebar2/>
            <Search/>
            {/* <div className="flex-1 ">
                <div className="hidden lg:block md:block sm:bock">
                     <FriendsProfileContainer />
                 </div>
            </div> */}
      </div>
    </>
  )
}

export default SearchPage
