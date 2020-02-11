import React from 'react';
import {Button, Container, Toast, ToastBody, ToastHeader} from "reactstrap";
import Row from "reactstrap/es/Row";

const getColorByNumOfPosts = (num) => {
    // TODO: Change topic color on different amount of posts in it.
};

export const ForumAllPreviewerView = (props) => {
    console.log(props.forumPages);

    return (
        <div
            style={props.style}
        >
            <Container
                className={'vt-offer-container'}
            >
                <Row
                    className={'title-row'}
                >Forum</Row>
                <Row>
                    { props.forumPages.map(page =>
                        <Toast
                            className={'vt-horiz-margin vk-clickable'}
                            key={`forum-page-${page.id}`}
                        >
                            <ToastHeader
                                icon={"primary"}
                                onClick={() => props.onShowPagePosts(page)}
                            >
                                {page.topic}
                            </ToastHeader>
                            <ToastBody>
                                {`There is ${page.posts.length} posts for the topic.`}
                            </ToastBody>
                        </Toast>
                    )}
                </Row>
            </Container>
            {/*<h2>Forum</h2>
            <ul>
                {props.forumPages.map(page =>
                <li>
                    <p>{page.topic}</p>
                </li>
                )}
            </ul>*/}
        </div>
    );
};