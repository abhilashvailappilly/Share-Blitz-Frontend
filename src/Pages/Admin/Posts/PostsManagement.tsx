import PostList from '../../../Components/Admin/Posts/Posts2'
import Sidebar from '../../../Components/Admin/Sidebar/Sibebar';
import Paggination from '../../../Components/Admin/Posts/Paggination';
import { Table } from '@/Components/ui/table';
import ShardComp from '@/Components/Admin/Posts/Shard';
import PostContainer from '@/Components/Admin/Posts/PostContainer';

const PostsManagement = () => {
  const userData = [
    {
        id: 1,
        name: "Neil Sims",
        position: "React Developer",
        status: "Online",
        avatar: "/docs/images/people/profile-picture-1.jpg",
        email: "neil.sims@flowbite.com",
        blocked: false,
    },
    // {
    //     id: 2,
    //     name: "Bonnie Green",
    //     position: "Designer",
    //     status: "Online",
    //     avatar: "/docs/images/people/profile-picture-3.jpg",
    //     email: "bonnie@flowbite.com",
    //     blocked: false,
    // },
    // {
    //     id: 3,
    //     name: "Jese Leos",
    //     position: "Vue JS Developer",
    //     status: "Online",
    //     avatar: "/docs/images/people/profile-picture-2.jpg",
    //     email: "jese@flowbite.com",
    //     blocked: false,
    // },
    // {
    //     id: 4,
    //     name: "Thomas Lean",
    //     position: "UI/UX Engineer",
    //     status: "Online",
    //     avatar: "/docs/images/people/profile-picture-5.jpg",
    //     email: "thomes@flowbite.com",
    //     blocked: false,
    // },
    // {
    //     id: 5,
    //     name: "Leslie Livingston",
    //     position: "SEO Specialist",
    //     status: "Offline",
    //     avatar: "/docs/images/people/profile-picture-4.jpg",
    //     email: "leslie@flowbite.com",
    //     blocked: true,
    // },
];


  return (
    <div className="flex">
        <Sidebar />
        <div className="flex-1">
       <PostContainer/>
        </div>
      </div>
   
  )
}

export default PostsManagement
