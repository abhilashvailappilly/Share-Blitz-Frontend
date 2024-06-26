// CustomMessageToast.tsx
import React from 'react';
import styled from 'styled-components';

const ToastContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 8px;
  max-width: 300px;
  margin: 10px;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const Username = styled.span`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Message = styled.span`
  color: #555;
`;

export interface CustomMessageToastProps {
  avatar: string;
  username: string;
  message: string;
}

const CustomMessageToast: React.FC<CustomMessageToastProps> = ({ avatar, username, message }) => (
  <ToastContainer>
    <Avatar src={avatar} alt={`${username}'s avatar`} />
    <Content>
      <Username>{username}</Username>
      <Message>{message}</Message>
    </Content>
  </ToastContainer>
);

export default CustomMessageToast;
