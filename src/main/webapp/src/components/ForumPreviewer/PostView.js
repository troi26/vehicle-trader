import React from "react";

export const PostView = (props) => {
    return (
        <li className="vk-forum-post"> 
            <div>
                <p>{props.post.username}</p>
                <p>{props.post.message}</p>
                <span>{props.post.messageDateTime}</span>
            </div>
        </li>
    );
};