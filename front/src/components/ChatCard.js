import React from 'react';

const ChatCard = ({ message, isSentByUser }) => {
    return (
        <div className={`chat-card ${isSentByUser ? 'sent' : 'received'}`}>
            {!isSentByUser && <img src={message.avatar} alt={`${message.name}'s avatar`} className="avatar" />}
            <div className="card-content">
                <div className="card-header">
                    <span className="card-name">{message.name}</span>
                    <span className="card-time">{message.time}</span>
                </div>
                <p className="card-description">{message.description}</p>
            </div>
            {isSentByUser && <img src={message.avatar} alt="Your avatar" className="avatar" />}
        </div>
    );
};

export default ChatCard;
