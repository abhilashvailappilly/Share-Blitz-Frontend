

import  { FC } from 'react';
import styled from 'styled-components';
import ProfileDataInterface from '../../../Types/User/userProfile';
import { toast } from 'react-toastify';

const UserListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const UserCard = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ProfilePic = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const FollowButton = styled.button`
  margin-left: auto;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;



type UserListProps = {
  users: ProfileDataInterface[];
  onFollow?: (id: string) => void;
  doFunction? : (user :ProfileDataInterface)=> void;
};


const UserList: FC<UserListProps> = ({ users, onFollow,doFunction }) => {
const seeProfileClick =(user:ProfileDataInterface)=>{
  if(doFunction)
  doFunction(user)
}
  return (
    <UserListWrapper className='w-full flex justify-center'>
      {users.map((user,index) => (
        <UserCard key={index} onClick={()=>seeProfileClick(user)} className='mt-3 bg-white items-center py-2 px-4 rounded-lg hover:bg-gray-100 hover:cursor-pointer hover:scale-110'>
          <ProfilePic src={user.profileImageUrl}  alt={`${user.name}'s profile`} />
          <div className='ml-3 flex flex-col'  >
            <span className='font-bold'>{user.name}</span>
            <span>{user.userName}</span>
          </div>
          {/* {!user.isPrivate &&<FollowButton onClick={() => onFollow(user._id)}>Follow</FollowButton> } */}
        </UserCard>
      ))}
    </UserListWrapper>
  );
};

export default UserList;
