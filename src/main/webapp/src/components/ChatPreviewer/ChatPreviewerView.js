import React from "react";
import {Launcher} from 'react-chat-window'

export const ChatPreviewerView = (props) => {
    return (
        <div
            style={props.style}
        >
            <Launcher
                agentProfile={{
                    teamName: props.receiver && props.receiver.username
                        ? props.receiver.username
                        : "Loading",
                    imageUrl: `http://localhost:8080/uploads/${"no_avatar.png"}`
                }}
                onMessageWasSent={props.onMessageWasSent}
                messageList={props.messageList}
                onFileSelected={() => {}}
                showEmoji={false}
                showFile={false}
            />
        </div>
    );
};