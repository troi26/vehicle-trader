import React, { Component } from 'react';

import {postPostForTopic, updatePostInTopic} from "../../api/ForumFetchAPI";
import {ForumPagePreviewerView } from './ForumPagePreviewerView';

export class ForumPagePreviewerContainer extends Component {
    constructor (props) {
        super(props);

        this.state = {
            expanded: false,
            expandedPost: {},
            expansionMode: "prev",
            page: this.props.tabProps.page,
        };
    }

    showExpansion (mode, post) {
        this.setState({
            expansionMode: mode,
            expanded: true,
            expandedPost: post,
        });
    }

    toggleExpansion (nextState = false, post, mode) {
        if (!nextState) {
            this.closeExpansion(mode, post);
        } else {
            console.log("OPENING IN: ", mode, post);
            this.showExpansion(mode, post);
        }
    }

    closeExpansion (mode, post) {
        console.log("CLOSE EXPANSION");
        this.setState({
            expansionMode: mode,
            expanded: false,
            expandedPost: post,
        })
    }

    componentDidMount () {
        console.log("FORUM PAGE MOUNT: ", this.state.page);
    }

    componentWillUnmount() {
        
    }

    openEditModal (mode, post) {
        this.setState({
            expansionMode: mode,
            expanded: true,
            expandedPost: post,
        })
    }

    successPostHandler (page) {
        console.log("ADDED: ", page);
        this.setState({
            page: page,
        }, () => console.log("SET: ", this.state.page))
    }

    failurePostHandler (errors) {
        console.log(errors);
    }

    submitNewPost (post) {
        console.log("Updating: ", post);
        postPostForTopic(this.state.page.topic, post)
            .then(r => r.status === 200
                ? r.json().then(this.successPostHandler.bind(this))
                    : r.json().then(this.failurePostHandler.bind(this)))
            .catch(reason => console.log(reason));
    }

    postContentEdit (event) {
        this.setState({
            expandedPost: {
                ...this.state.expandedPost,
                message: event.target.value,
            },
        });
    }

    successPostUpdateHandler (page) {
        console.log("UPDATED: ", page);
        this.setState({
            page: page,
        }, () => console.log("SET: ", this.state.page))
    }

    submitChangesToPost (post) {
        post.userId = this.props.loggedIn.id;
        post.username = this.props.loggedIn.id;
        if (post.id) {
            updatePostInTopic(this.state.page.topic, post.id, post)
                .then(r => r.status === 200
                    ? r.json().then(this.successPostUpdateHandler.bind(this))
                    : r.json().then(this.failurePostHandler.bind(this)))
                .catch(reason => console.log(reason));
            return;
        }
        this.submitNewPost(post);

    }

    render() {
        return (
            <ForumPagePreviewerView
                {...this.state}
                {...this.props}
                style={{
                    ...this.props.style,
                }}

                page={this.state.page}

                onPostExpand={this.showExpansion.bind(this)}
                onExpansionClose={this.closeExpansion.bind(this)}
                toggleExpansion={this.toggleExpansion.bind(this)}

                onOpenEditModal={this.openEditModal.bind(this)}

                submitNewPost={this.submitNewPost.bind(this)}
                onPostContentEdit={this.postContentEdit.bind(this)}
                onSubmitChangesToPost={this.submitChangesToPost.bind(this)}
            />
        );

    }
}

ForumPagePreviewerContainer.defaultProps = {
};