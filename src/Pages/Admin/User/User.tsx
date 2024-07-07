import {useEffect} from 'react'
import Sidebar from '../../../Components/Admin/Sidebar/Sibebar'
import UserManagement from '../../../Components/Admin/User/User'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../../Store/store'


function UserList() {
 
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
        <UserManagement />
      </div>
    </div>
  )
}

export default UserList
