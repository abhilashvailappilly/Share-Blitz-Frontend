
const chatRoutes={
    recentChats:'/chat/recentChats',
    sendMessage:'/chat/messages/send',
    getMessages:'/chat/messages/getAllMessages',
    deleteMessage:'/chat/messages/deleteMessage',
    editMessage:'/chat/messages/editMessage',
    getMessageById:'/chat/messages',
    unreadedMessages:'/chat/messages/unReadedMessages',
    markAsRead:'/chat/messages/markAsRead',
    createGroupChat:'/chat/groupChat',
    sendGroupMessage:'/chat/groupMessage',
    getMessagesByRoom : '/chat/messages/getAllMessagesByRoom',
    removeParticipants:'/chat/groupChat/removeParticipants'
   
}

export default chatRoutes;