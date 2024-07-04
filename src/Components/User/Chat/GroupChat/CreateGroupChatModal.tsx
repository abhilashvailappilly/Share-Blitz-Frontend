import { SearchUser } from '@/Api/user/userApiMethod';
import { useDarkMode } from '@/Context/DarkModeContext';
import { CreateGroupChatModalPropsInteface } from '@/Types/User/Chat';
import ProfileDataInterface from '@/Types/User/userProfile';
import { debounce } from '@/utils/helpers/Debounce';
import { Modal, Box, Button, TextField, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import UserList from '../../EditPost/UserList';
import { AiOutlineClose } from 'react-icons/ai';
import { useToast } from '@/Components/ui/use-toast';
import { RootState } from '@/Store/store';
import useAppSelector from '@/hooks/UseSelector';
import { CreateGroupChat } from '@/Api/user/chatApiMethods';

const CreateGroupChatModal = ({ showCreateGroupChatModal, setShowCreateGroupChatModal }: CreateGroupChatModalPropsInteface) => {
  const [groupName, setGroupName] = useState<string>('');
  const [participantsQuery, setParticipantsQuery] = useState<string>('');
  const [inputFocused, setInputFocused] = useState<boolean>(false);
  const [userSuggestions, setUserSuggestions] = useState<ProfileDataInterface[]>([]);
  const [groupParticipants, setGroupParticipants] = useState<ProfileDataInterface[]>([]);
  const userInfo:ProfileDataInterface  = useAppSelector((state:RootState) => state.auth.userInfo)
  const { isDarkMode } = useDarkMode();
 const {toast} = useToast()

  const handleCreateGroupChat = async() => {
    // Handle group chat creation logic here
    console.log('Group Name:', groupName);
    console.log('Group Name:', groupParticipants);
   const participants= groupParticipants.map(user => user._id);
   
    try {
        const response = await CreateGroupChat(groupName,participants)
        if(response?.success){
            toast({title:"Group created successfully"})
            return 
        } 
        toast({title:"Failed to create the group"})
    } catch (error) {
        console.log(error)
    } finally {
        setShowCreateGroupChatModal(false);
        setGroupParticipants([])
        setGroupName('')
    }
  };

  const debouncedFetchUserSuggestions = useCallback(
    debounce(async (query: string) => {
      if (query.trim() !== '') {
        const suggestions = await SearchUser(query);
        setUserSuggestions(suggestions.users);
      } else {
        setUserSuggestions([]);
      }
    }, 300),
    []
  );

  useEffect(() => {
    debouncedFetchUserSuggestions(participantsQuery);
  }, [participantsQuery, debouncedFetchUserSuggestions]);

  const handleAddParticipant = (user: ProfileDataInterface) => {
    setInputFocused(false);
    if(user?._id == userInfo._id){
    toast({
            title: "Cannot select the user",  
            description : "you cannot create a group with your self"   
          })
          return;
    }
    if (!groupParticipants.some(participant => participant._id === user._id)) {
      setGroupParticipants([...groupParticipants, user]);
      setParticipantsQuery('');
      setUserSuggestions([]);
    }
  };

  const handleRemoveParticipant = (index: number) => {
    setGroupParticipants(groupParticipants.filter((_, i) => i !== index));
  };

  return (
    <Modal
      open={showCreateGroupChatModal}
      onClose={() => setShowCreateGroupChatModal(false)}
      aria-labelledby="create-group-chat-modal-title"
      aria-describedby="create-group-chat-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: isDarkMode ? 'background.paper' : 'background.default',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="create-group-chat-modal-title" variant="h6" component="h2">
          Create Group Chat
        </Typography>
        <TextField
          label="Group Name"
          fullWidth
          margin="normal"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <TextField
          label="Participants"
          fullWidth
          margin="normal"
          value={participantsQuery}
          onFocus={() => setInputFocused(true)}
          onChange={(e) => setParticipantsQuery(e.target.value)}
          helperText="Enter participant names"
        />
        <div className="mt-2 flex flex-wrap">
          {groupParticipants.map((user, index) => (
            <span
              key={index}
              className="inline-flex items-center bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full mr-2 mb-2"
            >
              @{user.name}
              <AiOutlineClose
                className="ml-1 cursor-pointer"
                onClick={() => handleRemoveParticipant(index)}
              />
            </span>
          ))}
        </div>
        {userSuggestions.length > 0 && inputFocused && (
          <ul className="absolute left-0 right-0 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded mt-1 max-h-40 overflow-y-auto no-scrollbar z-10">
            <UserList users={userSuggestions} doFunction={(user) => handleAddParticipant(user)} />
          </ul>
        )}
        <Button variant="contained" color="primary" onClick={handleCreateGroupChat} className="mt-4">
          Create Chat
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateGroupChatModal;
