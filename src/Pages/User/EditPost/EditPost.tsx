import Navbar from '../../../Components/User/Navbar/Navbar'
import Sidebar2 from '../../../Components/User/Sidebar/Sidebar2';

import EditPost from '../../../Components/User/EditPost/EditPost';
const EditPostPage = () => {
  return (
    <div className="flex">
    <Navbar/>
    <Sidebar2/>
    <div className="flex-1 ">
     
       <EditPost/>
    </div>
    
   </div>
  )
}

export default EditPostPage
