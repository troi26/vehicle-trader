import React from "react";
import { MessageView } from "./MessageView";
import { InputContainer } from "./InputContainer";
import { MessageContainer } from "./MessageContainer";

export const ChatPreviewerView = (props) => {
    console.log(props.chatMessages);
    return (
        <div>
            <ul className="Messages-list">
                {props.chatMessages.map(m => <MessageContainer className={props.loggedIn.id === m.sender 
                    ? "vk-messageMe" : "vk-messageOther"} 
                    message = {m.message}/>)}
            </ul>
            <InputContainer {...props}/>
        </div>
    );
};