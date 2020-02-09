import React from 'react';
import {InputContainer} from "../InputPreviewer/InputContainer"; 
import {PostContainer} from "./PostContainer"; 

export const ForumPagePreviewerView = (props) => {
    console.log(props.forumPosts);

    return (
        <div>
            <h1>{props.topic}</h1>
            <ul>
                {props.forumPosts.map(post => <PostContainer post = {post}/>)}
            </ul>
            <InputContainer {...props}/>
        </div>
    );
};