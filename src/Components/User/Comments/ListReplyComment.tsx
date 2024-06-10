import React, { useEffect, useState } from 'react'
import { ListReplyCommentPropsInteface } from '../../../Types/User/Comment'
import ProfileDataInterface from '../../../Types/User/userProfile'
import { getUser } from '../../../Api/user/authApiMethod'
import { toast } from 'react-toastify'

const ListReplyComment = ({userId, index,reply} : ListReplyCommentPropsInteface) => {
    if(!userId)
        return <h1>No userId</h1>
    const [userData,setUserData] = useState<ProfileDataInterface| null>(null)

    useEffect(()=>{
      fetchUserData()
    },[userId])
    const fetchUserData = async ()=>{
        const response = await getUser(userId)
        if(!response.success){
            toast.error(response.message)
            return (
                <>
                    <h2>User data not available</h2>
                </>
            )
        }
        setUserData(response.user)
    }
  return (
    <div key={index} className="border-l-2 border-gray-300 pl-4 mb-2">
         <div className="flex items-start">
         <img src={userData?.profileImageUrl} alt={`${userData?.name}'s profile`} className="w-8 h-8 rounded-full mr-2" />
         <div>
             <div className="flex items-center">
             <span className="font-bold mr-2">{userData?.name}</span>
             <span className="text-xs text-gray-500">{}</span>
             </div>
             <p>{reply}</p>
         </div>
         </div>
     </div>
  )
}

export default ListReplyComment
