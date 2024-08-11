import React from 'react';
import ChatScreen from "./ChatScreen";

const CardComponent = ({ title, conversations, activeConversation, messages }) => {
    return (
        <div className="container d-flex">
            <div className="custom-card">
                <h5 className="card-title">{title}</h5>
                <div className="conversations">
                    {conversations.map((conv, index) => (
                        <div
                            key={index}
                            className={`conversation-item ${activeConversation === conv.name ? 'active' : ''}`}
                        >
                            <img src={conv.avatar} alt={`${conv.name}'s avatar`} className="avatar" />
                            <div className="conversation-details">
                                <strong>{conv.name}:</strong> {conv.lastMessage}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <ChatScreen messages={messages} />
        </div>
    );
};

export default CardComponent;
