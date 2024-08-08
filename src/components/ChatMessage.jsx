import React from 'react';
import "./ChatMessage.css"
import bot from '../assets/robot.png';
import user from '../assets/user.png';

function ChatMessage({ message }) {
    let imageSrc;
    let altText;
    let clsName;

    if (message.user === "gpt") {
        imageSrc = bot;
        altText = "bot";
        clsName = "bot";
    } else if (message.user === "me") {
        imageSrc = user;
        altText = "user";
        clsName = "user";
    }

    return (
        <div className={`chat-message ${message.user === "gpt" && "chatgpt"}`}>
            <div className='chat-message-center'>
                <div className={`avatar ${message.user === "gpt" && "chatgpt"}`}>
                    {imageSrc && <img className={clsName} src={imageSrc} alt={altText} />}
                </div>
                <div className='message'>
                    {message.message.split('\n').map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            <br />
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ChatMessage;
