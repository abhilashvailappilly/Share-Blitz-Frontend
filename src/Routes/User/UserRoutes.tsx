import { Route,Routes } from "react-router-dom";
import Login from '../../Pages/User/Login/Login'
import UserLoggedOut from "../../Components/User/userLoggedOut";
import UserLoggedIn from "../../Components/User/userLoggedIn";
import Profile from "../../Pages/User/Profile/Profile";
import { Navigate } from "react-router-dom";
import SignupComponent from "../../Pages/User/Signup/Signup";
export const UserRoute = () =>{
    console.log("User route worked")
    return (
        <Routes>
            {/* <Route path="" element={<Home/>}/> */}
            <Route path="" element={<UserLoggedOut/>}>
                 <Route path="/" element={<Navigate to="/login" />} />
                <Route path="login" element={<Login/>}/>
                <Route path="/signup" element={<SignupComponent/>}/>
            </Route>
            <Route path="" element={<UserLoggedIn />}>
                <Route path='profile' element={<Profile />} />
               
            </Route>
        </Routes>
    )
}