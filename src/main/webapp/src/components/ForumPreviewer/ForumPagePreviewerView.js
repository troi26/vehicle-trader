import React from 'react';
import Container from "reactstrap/es/Container";
import {
    Button,
    Card,
    CardBody,
    CardImg,
    CardSubtitle,
    CardText,
    CardTitle, Form, FormGroup, Input, Label,
    Modal,
    ModalBody, ModalFooter,
    ModalHeader,
    Row
} from "reactstrap";

export const ForumPagePreviewerView = (props) => {
    console.log(props.page);
    console.log(props.expansionMode);

    return (
        <div>
            <Container
                className={'vt-offer-container'}
            >
            <Row
                className={'title-row'}
            ><Button
                className={'vt-horiz-margin'}
                // color={""}
                onClick={props.onForumOpenClick}
            >
                Back
            </Button>{props.page.topic}</Row>
                {props.page.posts.map(p =>
                    <Card
                        key={`post-${p.id}`}
                        className={'vt-margin'}
                    >
                        {/*<CardImg top width="100%" src="https:/localhost:8080/assets/318x180.svg" alt="Card image cap" />*/}
                        <CardBody>
                            {/*<CardTitle>{props.post.message}</CardTitle>*/}
                            {/*<CardSubtitle>{props.post.message}</CardSubtitle>*/}
                            <CardText>{`${p.message.substr(0, 50)}...`}</CardText>
                            <Button
                                className={'vt-horiz-margin'}
                                onClick={() => props.toggleExpansion(true, p, "prev")}
                            >Read</Button>
                            { p.userId === props.loggedIn.id &&
                                <Button
                                    className={'vt-horiz-margin'}
                                    color={"warning"}
                                    onClick={() => props.toggleExpansion(true, p, "edit")}
                                >Edit</Button>
                            }
                        </CardBody>
                    </Card>
                )}
                <Row>
                    <Button
                        onClick={() => props.toggleExpansion(true, {}, "add")}
                    >
                        Add
                    </Button>
                </Row>
            </Container>

            <Modal isOpen={props.expanded} toggle={() => props.toggleExpansion(!props.expanded, {}, "prev")}
                   className={"vk-post-expansion"}>

                {props.expansionMode !== "prev" &&
                <div>
                    <ModalHeader toggle={() =>
                        props.toggleExpansion(!props.expanded, {}, props.expansionMode)}></ModalHeader>
                    <ModalBody>
                        <Input type="textarea" value={props.expandedPost.message}
                               onChange={props.onPostContentEdit}
                               placeholder="Write post content here" rows={5}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={() =>
                            props.toggleExpansion(false, {}, props.expansionMode)}>Cancel</Button>
                        <Button color="secondary" onClick={() =>
                            props.onSubmitChangesToPost(props.expandedPost)}>Submit</Button>
                    </ModalFooter>
                </div>
                }
                { props.expansionMode === "prev" &&
                    <div>
                        <ModalHeader toggle={() =>
                            props.toggleExpansion(!props.expanded, {}, "prev")}></ModalHeader>
                        <ModalBody>
                            {props.expandedPost ? props.expandedPost.message : "Loading"}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary"
                                    onClick={() => props.toggleExpansion(false, {}, "prev")}>Cancel</Button>
                        </ModalFooter>
                    </div>
                }
            </Modal>

        </div>
        /*<div>
            <ul>
                {props.forumPosts.map(post => <PostContainer post = {post}/>)}
            </ul>
            <InputContainer {...props}/>
        </div>*/
    );
};