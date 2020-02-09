import React from 'react';
import { Table } from "reactstrap";

export const ForumAllPreviewerView = (props) => {
    console.log(props.forumPages);

    return (
        <div
            style={props.style}
        >
            <h2>Forum</h2>
            <ul>
                {props.forumPages.map(page => 
                <li>
                    <p>{page.topic}</p>
                </li>
                )}
            </ul>
        </div>
    );
};