import { Route,Routes } from "react-router-dom";
import Login from '../../Pages/User/Login/Login'
export const AdminRoute = () =>{
    return (
        <Routes>
            {/* <Route path="" element={<Home/>}/> */}
            <Route>
                <Route path="login" element={<Login/>}/>
            </Route>
        </Routes>
    ) 
}