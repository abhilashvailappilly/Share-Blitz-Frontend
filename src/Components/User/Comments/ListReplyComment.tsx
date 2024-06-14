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
    <article key={index} className="p-6 mb-3 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900">
        <footer className="flex justify-between items-center mb-2">
            <div className="flex items-center">
                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                    <img
                        className="mr-2 w-6 h-6 rounded-full"
                         src={userData?.profileImageUrl} alt={`${userData?.name}'s profile`} />{userData?.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400"><time
                        title="February 12th, 2022"></time></p>
            </div>
            <button id="dropdownComment2Button" data-dropdown-toggle="dropdownComment2"
                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-40 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                type="button">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                </svg>
                <span className="sr-only">Comment settings</span>
            </button>
            {/* <!-- Dropdown menu --> */}
            <div id="dropdownComment2"
                className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownMenuIconHorizontalButton">
                    <li>
                        <a href="#"
                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                    </li>
                    <li>
                        <a href="#"
                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                    </li>
                    <li>
                        <a href="#"
                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                    </li>
                </ul>
            </div>
        </footer>
        <p className="text-gray-500 dark:text-gray-400">{reply}</p>
        <div className="flex items-center mt-4 space-x-4">
            <button type="button"
                className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
                <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
                </svg>                
                Replyed
            </button>
        </div>
    </article>
    // <div key={index} className="border-l-2 border-gray-300 pl-4 mb-2">
    //      <div className="flex items-start">
    //      <img src={userData?.profileImageUrl} alt={`${userData?.name}'s profile`} className="w-8 h-8 rounded-full mr-2" />
    //      <div>
    //          <div className="flex items-center">
    //          <span className="font-bold mr-2">{userData?.name}</span>
    //          <span className="text-xs text-gray-500">{}</span>
    //          </div>
    //          <p>{reply}</p>
    //      </div>
    //      </div>
    //  </div>
  )
}

export default ListReplyComment
