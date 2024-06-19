import { getUserById } from '@/Api/admin/adminApiMethod'
import { ReportsInterface } from '@/Types/Admin/Reports'
import ProfileDataInterface from '@/Types/User/userProfile'
import React, { useEffect, useState } from 'react'
interface ListOfReportsInterface {
    index:number
    report:ReportsInterface
}
const ListOfReports = ({index ,report} :ListOfReportsInterface ) => {
    const [userData,setUserData] = useState<ProfileDataInterface>()
    useEffect(()=>{
        fetchUserData()
    })
    const fetchUserData = async ()=>{
        try {
            const response = await getUserById(report?.userId)
            if(response.success){
                setUserData(response.user)
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <li key={index} className="mb-2">
    <div className="p-3 border rounded-lg shadow-md bg-white dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center">
            <img 
                src={userData?.profileImageUrl || "https://via.placeholder.com/150"} 
                alt="User Profile" 
                className="h-8 w-8 rounded-full border-2 border-gray-300"
            />
            <div className="ml-3">
                <div className="text-sm font-semibold text-gray-900 dark:text-white">{userData?.name}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">@{userData?.userName}</div>
            </div>
        </div>
        <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-inner">
            <div className="text-sm text-gray-700 dark:text-gray-300">{report.reason}</div>
        </div>
    </div>
</li>
  )
}

export default ListOfReports
