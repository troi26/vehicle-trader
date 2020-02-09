import React from "react";

export const MessageView = (props) => {
    // console.log(props.message);
    // const {member, text} = props.message;
    // const {currentMember} = props;
    // const messageFromMe = member.id === currentMember.id;
    // const className = messageFromMe ?
    // "Messages-message currentMember" : "Messages-message";
    return (
        <li className={props.styleClassName}> 
            <div>
                <p>{props.senderUsername}</p>
                <p>{props.message}</p>
                <span className={props.styleClassTime}>{props.messageDateTime}</span>
            </div>
        </li>
    );
};