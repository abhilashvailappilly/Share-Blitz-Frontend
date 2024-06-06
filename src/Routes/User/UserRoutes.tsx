import { Route,Routes } from "react-router-dom";
import Login from '../../Pages/User/Login/Login'
import Home from "../../Pages/User/Home/Home2";
// import CreatePost from "../../Components/User/CreatePost/CreatePost2";
import CreatePost from "../../Pages/User/CreatePost/CreatePost";
import UserLoggedOut from "../../Components/User/userLoggedOut";
import UserLoggedIn from "../../Components/User/userLoggedIn";
import Profile from "../../Pages/User/Profile/Profile";
import { Navigate } from "react-router-dom";
import SignupComponent from "../../Pages/User/Signup/Signup";
import Otp from "../../Pages/User/Otp/Otp"
import NotFound from "../../Pages/Common/Notfound";
import SearchPage from "../../Pages/User/Search/SearchPage";
export const UserRoute = () =>{
    console.log("User route worked")
    return (
        <Routes>
            {/* <Route path="" element={<Home/>}/> */}
            <Route path="" element={<UserLoggedOut/>}>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="login" element={<Login/>}/>
                <Route path="register" element={<SignupComponent/>}/>
                <Route path='otp' element={<Otp/>} />
            </Route>
            <Route path="" element={<UserLoggedIn />}>
                <Route path="home" element={<Home/>}/>
                <Route path="search" element={<SearchPage/>}/>
                <Route path="createPost" element={<CreatePost/>}/>
                <Route path='profile/:userId' element={<Profile />} />
                <Route path='*' element={<NotFound />} />

               
            </Route>
        </Routes>
    )
}