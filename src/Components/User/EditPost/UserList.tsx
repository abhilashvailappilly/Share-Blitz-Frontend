import React, { FC } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import ProfileDataInterface from '../../../Types/User/userProfile';
import { toast } from 'react-toastify';

// Define light and dark theme objects
const lightTheme = {
  backgroundColor: '#fff',
  textColor: '#000',
  borderColor: '#ccc',
  buttonBackgroundColor: '#007bff',
  buttonHoverBackgroundColor: '#0056b3',
  cardHoverBackgroundColor: '#f0f0f0',
};

const darkTheme = {
  backgroundColor: '#333',
  textColor: '#fff',
  borderColor: '#555',
  buttonBackgroundColor: '#0056b3',
  buttonHoverBackgroundColor: '#003f7f',
  cardHoverBackgroundColor: '#444',
};

// Styled components
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
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.textColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.cardHoverBackgroundColor};
    transform: scale(1.05);
  }
`;

const ProfilePic = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const FollowButton = styled.button`
  margin-left: auto;
  padding: 5px 10px;
  background-color: ${(props) => props.theme.buttonBackgroundColor};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.buttonHoverBackgroundColor};
  }
`;

type UserListProps = {
  users: ProfileDataInterface[];
  onFollow?: (id: string) => void;
  doFunction?: (user: ProfileDataInterface) => void;
};

const UserList: FC<UserListProps> = ({ users, onFollow, doFunction }) => {
  const seeProfileClick = (user: ProfileDataInterface) => {
    if (doFunction) doFunction(user);
  };

  return (
    <UserListWrapper className="w-full flex justify-center">
      {users.map((user, index) => (
        <UserCard key={index} onClick={() => seeProfileClick(user)} className="mt-3 items-center py-2 px-4 rounded-lg">
          <ProfilePic src={user.profileImageUrl} alt={`${user.name}'s profile`} />
          <div className="ml-3 flex flex-col">
            <span className="font-bold">{user.name}</span>
            <span>{user.userName}</span>
          </div>
          {/* Uncomment the follow button if needed */}
          {/* {!user.isPrivate && <FollowButton onClick={() => onFollow(user._id)}>Follow</FollowButton>} */}
        </UserCard>
      ))}
    </UserListWrapper>
  );
};

export default UserList;
