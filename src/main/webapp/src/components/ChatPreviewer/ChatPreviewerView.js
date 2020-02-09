import React from "react";
import { InputContainer } from "../InputPreviewer/InputContainer";
import { MessageContainer } from "./MessageContainer";

export const ChatPreviewerView = (props) => {
    console.log(props.chatMessages);
    return (
        <div>
            <ul styleClassName = "vk-ul"> 
                {props.chatMessages.map(m => <MessageContainer 
                    styleClassName={props.loggedIn.id === m.senderId 
                        ? "vk-messageMe" : "vk-messageOther"} 
                    message = {m.message}
                    messageDateTime = {m.messageDateTime}
                    senderUsername = {m.senderUsername}
                    styleClassTime = {props.loggedIn.id === m.senderId 
                        ? "vk-time-right" : "vk-time-left"} />)}
            </ul>
            <InputContainer {...props}/>
        </div>
    );
};