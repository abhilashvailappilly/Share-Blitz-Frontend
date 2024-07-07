import React from 'react';
import { Modal, Box, Typography, List, IconButton } from '@mui/material';
import { FaTimes } from 'react-icons/fa';

import { useDarkMode } from "@/Context/DarkModeContext";
import ListParticipants from './ListParticipants';
import { toast } from 'react-toastify';
import { RemoveParticipantFromGroupChat } from '@/Api/user/chatApiMethods';
import { useChatStore } from '@/ZustandStore/chatStore';

interface GroupChatDetailsModalProps {
  open: boolean;
  onClose: () => void;
  participants: string[];
}

const GroupChatDetailsModal: React.FC<GroupChatDetailsModalProps> = ({ open, onClose, participants }) => {
  const { isDarkMode } = useDarkMode();
  const {selectedRoom} = useChatStore()
  const onRemove =async(userId : string)=>{
    try {
      if(!selectedRoom)
        return
      const response = await RemoveParticipantFromGroupChat(userId,selectedRoom?._id)
      if(response.success){
        toast.success('ss')
        participants = response?.data?.room.participants
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="group-chat-details-modal-title">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          // bgcolor: isDarkMode ? 'background.default' : 'background.paper',
          color: isDarkMode ? 'text.primary ' : 'text.secondary',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
        className="dark:bg-gray-900 bg-white"

      >
        <Box display="flex" justifyContent="space-between" alignItems="center" >
          <Typography id="group-chat-details-modal-title" variant="h6" component="h2" className='dark:text-white text-black'>
            Group Chat Participants
          </Typography>
          <IconButton onClick={onClose}>
            <FaTimes />
          </IconButton>
        </Box>
        <List>
          {participants.map((userId, index) => (
           <ListParticipants userId={userId} key={index} onRemove={onRemove}/>
          ))}
        </List>
      </Box>
    </Modal>
  );
};

export default GroupChatDetailsModal;
