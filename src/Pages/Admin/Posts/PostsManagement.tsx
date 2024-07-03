
import PostContainer from '@/Components/Admin/Posts/PostContainer';
import AdminLayout from '../Layout/AdminLayout';

const PostsManagement = () => {
  
  return (
    // <div className="flex">
    //     <Sidebar />
    //     <div className="flex-1">
    //    <PostContainer/>
    //     </div>
    //   </div>

    <AdminLayout>
         <PostContainer/>
    </AdminLayout>
   
  )
}

export default PostsManagement
