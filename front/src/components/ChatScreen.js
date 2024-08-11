// ChatScreen.js
import React from 'react';
import ChatCard from './ChatCard';

const ChatScreen = ({messages}) => {
    return (
            <div className="chat-screen">
                {messages.map((message, index) => (
                    <ChatCard
                        key={index}
                        message={message}
                        isSentByUser={message.sentByUser}
                    />
                ))}
            </div>
    );
};

export default ChatScreen;
