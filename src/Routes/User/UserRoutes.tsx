import { Route,Routes } from "react-router-dom";
import Login from '../../Pages/User/Login/Login'
import Home from "../../Pages/User/Home/Home2";
import CreatePost from "../../Pages/User/CreatePost/CreatePost";
import UserLoggedOut from "../../Components/User/userLoggedOut";
import UserLoggedIn from "../../Components/User/userLoggedIn";
import Profile from "../../Pages/User/Profile/Profile";
import { Navigate } from "react-router-dom";
import SignupComponent from "../../Pages/User/Signup/Signup";
import Otp from "../../Pages/User/Otp/Otp"
import NotFound from "../../Pages/Common/Notfound";
import SearchPage from "../../Pages/User/Search/SearchPage";
import EditPostPage from "../../Pages/User/EditPost/EditPost";
import Explore from "../../Pages/User/Explore/ExplorePage";
import SettingsPage from "../../Pages/User/Settings/SettingsPage";
import Forgetpassword from "../../Pages/User/ForgetPassword/ForgetPassword";
import MessagesPage from "@/Pages/User/Message/MessagesPage";
import NotificationPage from "@/Pages/User/Notification/NotificationPage";

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
                <Route path='forgetPassword' element={<Forgetpassword/>} />
            </Route>
            <Route path="" element={<UserLoggedIn />}>
                <Route path="home" element={<Home/>}/>
                <Route path="search" element={<SearchPage/>}/>
                <Route path="createPost" element={<CreatePost/>}/>
                <Route path='profile/:userId' element={<Profile />} />
                <Route path='post/editPost/:postId' element={<EditPostPage />} />
                <Route path='explore' element={<Explore />} />
                <Route path='message' element={<MessagesPage />} />
                {/* <Route path='video' element={<PushNotification />} /> */}
                <Route path='notifications' element={<NotificationPage />} />
                <Route path='settings/*' element={<SettingsPage />} />
      

                <Route path='*' element={<NotFound />} />

               
            </Route>
        </Routes>
    )
}