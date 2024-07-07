import { FC } from 'react';
import styled from 'styled-components';
import ProfileDataInterface from '../../../Types/User/userProfile';

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
  background-color: white;
  cursor: pointer;
  transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out;

  &:hover {
    background-color: #f0f0f0;
    transform: scale(1.05);
  }

  &.dark {
    background-color: #1a1a1a;
    border-color: #333;
    color: #fff;

    &:hover {
      background-color: #333;
    }
  }
`;

const ProfilePic = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;



type UserListProps = {
  users: ProfileDataInterface[];
  onFollow?: (id: string) => void;
  seeProfile?: (userId: string, ) => void;
};

const UserList: FC<UserListProps> = ({ users, seeProfile }) => {
  const seeProfileClick = (userId: string, ) => {
    if (!seeProfile) return;
    seeProfile(userId);
  };

  return (
    <UserListWrapper className='w-full flex justify-center'>
      {users.map((user, index) => (
        <UserCard key={index} className='mt-3 items-center py-2 px-4 rounded-lg hover:scale-105 dark:bg-gray-800 dark:hover:bg-gray-700'>
          <ProfilePic src={user.profileImageUrl} alt={`${user.name}'s profile`} />
          <div className='ml-3 flex flex-col' onClick={() => seeProfileClick(user._id, )}>
            <span className='font-bold dark:text-white'>{user.name}</span>
            <span className='dark:text-gray-300'>{user.userName}</span>
          </div>
          {/* {!user.isPrivate &&<FollowButton onClick={() => onFollow(user._id)}>Follow</FollowButton> } */}
        </UserCard>
      ))}
    </UserListWrapper>
  );
};

export default UserList;
