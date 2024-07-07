import { getUser } from '@/Api/user/authApiMethod';
import ProfileDataInterface from '@/Types/User/userProfile';
import { ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { useEffect, useState } from 'react';


interface ListParticipantsInterface {
  userId: string;
  onRemove: (userId: string) => void;
key:number
}

const ListParticipants = ({ userId }: ListParticipantsInterface) => {
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
  // const onRemove = (userId : string)=>{
  //   toast(userId)
  // }

  if (!userData) return null;

  return (
    <ListItem key={userId} sx={{ display: 'flex', alignItems: 'center' } } className=''>
      <ListItemAvatar>
        <Avatar src={userData.profileImageUrl} alt={userData.name} />
      </ListItemAvatar>
      <ListItemText primary={userData.name} className='dark:text-white  text-black'/>
      {/* <IconButton edge="end" onClick={() => onRemove(userId)}>
        <FaTrash className='text-white' />
      </IconButton> */}
    </ListItem>
  );
};

export default ListParticipants;
