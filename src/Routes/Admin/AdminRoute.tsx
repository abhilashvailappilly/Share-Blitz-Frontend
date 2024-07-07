import { Route,Routes } from "react-router-dom";
import Home from "../../Pages/Admin/Home/Home";
import AdminLoggedIn from "../../Components/Admin/adminLoggedIn";
import Users from "../../Pages/Admin/User/User";
import NotFound from "../../Pages/Common/Notfound";
import ReportsPage from "../../Pages/Admin/Reports/Reports";
import PostsManagement from "../../Pages/Admin/Posts/PostsManagement";
import VerificationPage from "../../Pages/Admin/Verification/VerificationPage";
export const AdminRoute = () =>{
    return (
        <Routes>
        {/* <Route path="" element={<Home/>}/> */}
        {/* <Route path="/" element={<AdminLoggedOut/>}>
           
        </Route> */}
        <Route path="" element={<AdminLoggedIn />}>
            <Route path="/" element={<Home/>}/>
            <Route path="home" element={<Home/>}/>
            <Route path='users' element={<Users />} />
            <Route path='posts' element={<PostsManagement />} />
            <Route path='reports' element={<ReportsPage />} />
            <Route path='verifications' element={<VerificationPage />} />
            <Route path='*' element={<NotFound />} />

            {/* <Route path='profile' element={<Profile />} /> */}
           
        </Route>
    </Routes>
    ) 
}