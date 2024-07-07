import { getUser } from '@/Api/user/authApiMethod';
import ProfileDataInterface from '@/Types/User/userProfile';
import React, { useEffect, useState } from 'react'

const ShowUserName = ({userId}:{userId:string}) => {
  const [userData, setUserData] = useState<ProfileDataInterface | null>(null);
    
    useEffect(() => {
        fetchUserData();
      }, []);
    
      const fetchUserData = async () => {
        try {
          const response = await getUser(userId);
          console.log('User data:', response);
          if (response.success) {
            setUserData(response?.user);
          }
        } catch (error) {
          console.log(error);
        }
      };
  return (
    <div>
      <span>{userData?.name}</span>
    </div>
  )
}

export default ShowUserName
