import { Route,Routes } from "react-router-dom";
import Home from "../../Pages/Admin/Home/Home";
import AdminLoggedIn from "../../Components/Admin/adminLoggedIn";
import AdminLoggedOut from "../../Components/Admin/adminLoggedOut";
import Users from "../../Pages/Admin/User/User";
import NotFound from "../../Pages/Common/Notfound";
import ReportsPage from "../../Pages/Admin/Reports/Reports";
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
            <Route path='reports' element={<ReportsPage />} />
            <Route path='*' element={<NotFound />} />

            {/* <Route path='profile' element={<Profile />} /> */}
           
        </Route>
    </Routes>
    ) 
}