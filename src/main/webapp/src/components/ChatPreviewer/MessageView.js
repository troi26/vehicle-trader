import React from "react";

export const MessageView = (props) => {
    // console.log(props.message);
    // const {member, text} = props.message;
    // const {currentMember} = props;
    // const messageFromMe = member.id === currentMember.id;
    // const className = messageFromMe ?
    // "Messages-message currentMember" : "Messages-message";
    return (
        <li>
            <div className="Message-content">
                {props.message}
            </div>
        </li>
    );
};