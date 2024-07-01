import ChatMessageLoader from '@/Components/Skeleton/SkeletonChat';
import UseGetMessages from '@/hooks/UseGetMessages';
import SingleMessages from './SingleMessages';
import { useEffect, useRef, useState } from 'react';
import TypingIndicator from './TypingIndicator';
import { useChatStore } from '@/ZustandStore/chatStore';
import { UpdateMessagesAsSeen } from '@/Api/user/chatApiMethods';

const MessagesContainer = () => {
    const { selectedUser, typing } = useChatStore();
    const { messages, loading } = UseGetMessages();
    const [isLoading,setIsLoading] = useState<boolean>(true)
    const lastMessageRef = useRef<HTMLDivElement | null>(null);
    const typingRef = useRef<HTMLDivElement | null>(null);

    if (!selectedUser) return null;

    const isTyping = typing.includes(selectedUser._id);
    
    const updateMessagesAsSeen = async()=>{
        try {
            const response = await UpdateMessagesAsSeen(selectedUser?._id)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const scrollToLastMessage = () => {
            if (lastMessageRef.current) {
                lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
                
            }
        };

        const timer = setTimeout(scrollToLastMessage, 100);
        updateMessagesAsSeen()
        setIsLoading(false);
        return () => clearTimeout(timer);
    }, [messages]);

  
    useEffect(() => {
        if (isTyping && typingRef.current) {
            typingRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [isTyping]);
    
    if(isLoading) {
        return (
            <div className='w-full animate-pulse  h-screen flex items-center justify-center'>
                Loading ....
            </div>
        )
    }

   

    return (
        <div className='flex-grow p-4 overflow-y-auto'>
            {!loading && messages.length > 0 && messages.map((message, index) => (
                <div ref={index === messages.length - 1 ? lastMessageRef : null} key={message._id}>
                    <SingleMessages key={index} message={message} />
                </div>
            ))}
            {loading && Array.from({ length: 5 }).map((_, index) => (
                <ChatMessageLoader key={index} />
            ))}
            {!loading && messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <svg className="w-16 h-16 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6 4v-5a2 2 0 00-2-2h-4l-3 3H6a2 2 0 01-2-2V7a2 2 0 012-2h4l3-3h4a2 2 0 012 2v5m-6-1v5m-1 2a1 1 0 102 0 1 1 0 00-2 0z"></path>
                    </svg>
                    <p className="text-lg font-semibold text-gray-700">No messages available</p>
                    <p className="text-gray-500">Start a conversation by sending the first message!</p>
                </div>
            )}
            {isTyping && (
                <div ref={typingRef} className='mt-4'>
                    <TypingIndicator />
                </div>
            )}
        </div>
    );
}

export default MessagesContainer;
