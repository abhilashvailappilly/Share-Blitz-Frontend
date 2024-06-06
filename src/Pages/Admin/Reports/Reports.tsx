import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Sidebar from "../../../Components/Admin/Sidebar/Sibebar"
import ReportManagement from "../../../Components/Admin/Reports/ReportManagement"
import { RootState } from "../../../Store/store"

const ReportsPage = () => {
    const {adminInfo} = useSelector((state:RootState)=>state.auth)
    const navigate = useNavigate()
  
   useEffect(()=>{
     if(!adminInfo){
      navigate('/admin')
     }
   })
  
  
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 overflow-x-hidden">
          <ReportManagement />
        </div>
      </div>
    )
}

export default ReportsPage
