import  { FC } from 'react';
import styled from 'styled-components';
import ProfileDataInterface from '../../../Types/User/userProfile';


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


type UserListProps = {
  users: ProfileDataInterface[];
  onFollow?: (id: string) => void;
  doFunction?: (user: ProfileDataInterface) => void;
};

const UserList: FC<UserListProps> = ({ users, doFunction }) => {
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
