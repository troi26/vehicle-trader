import React from "react";
import { MessageView } from "./MessageView";
import { InputContainer } from "./InputContainer";
import { MessageContainer } from "./MessageContainer";

export const ChatPreviewerView = (props) => {
    console.log(props.chatMessages);
    return (
        <div>
            <ul className="Messages-list">
                {props.chatMessages.map(m => <MessageContainer message = {m.message}/>)}
            </ul>
            <InputContainer {...props}/>
        </div>
    );
};