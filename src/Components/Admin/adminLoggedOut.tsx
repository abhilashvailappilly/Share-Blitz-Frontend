import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

interface RootState {
    auth: {
        userInfo: string,
        adminInfo:string
    }
}

const AdminLoggedOut = () => {
    const adminInfo = useSelector((state: RootState) => state.auth);
    return (
        adminInfo.adminInfo ? <Navigate to='/admin/home' /> : <Outlet />
    ) 
}

export default AdminLoggedOut