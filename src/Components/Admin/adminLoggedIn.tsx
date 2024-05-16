import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

interface RootState {
    auth: {
        userInfo: string
        adminInfo:string
    }
}

const AdminLoggedIn = () => {
    const adminInfo = useSelector((state: RootState) => state.auth);
    return (
        adminInfo.adminInfo ? < Outlet /> : <Navigate to='/login' />
    )
}

export default AdminLoggedIn
  