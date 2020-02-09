import React, { Component } from 'react';

import {getPostsForTopic, postPostForTopic} from "../../api/ForumFetchAPI";
import {ForumPagePreviewerView } from './ForumPagePreviewerView';

export class ForumPagePreviewerContainer extends Component {
    constructor (props) {
        super(props);

        this.state = {
            topic : props.topic,
            forumPosts: [
                {
                    id: "123",
                    userId: props.loggedIn.id,
                    username: props.loggedIn.username,
                    message: "I think this is great!",
                    messageDateTime: "2020-02-10 10:00:00"
                }
            ],
        };
    }

    componentDidMount () {
        // getPostsForTopic(this.props.topic)
        getPostsForTopic("myforum")
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            let currStateForumPostsIds = [];
            this.state.forumPosts.forEach(post => currStateForumPostsIds.push(post.id));
            result.posts.forEach((post) => {
                if(!currStateForumPostsIds.includes(post.id)){
                    this.setState({
                        forumPosts: this.state.forumPosts.concat([post])
                    });
                }
            })
        })
    }

    componentWillUnmount() {
        
    }

    handleSend (event){
        event.preventDefault();
		const jsonData = {
            userId : this.props.loggedIn.id,
            username: this.props.loggedIn.username,
            message : event.target.elements[0].value,
			messageDateTime : new Date()
		}
		postPostForTopic("myforum", jsonData).then(
            () => this.componentDidMount()
        );

        event.target.elements[0].value = "";
		console.log(event.target.elements[0].value)
		console.log("sending");
    }
    
    render() {
        return (
            <ForumPagePreviewerView
                {...this.state}
                {...this.props}
                style={{
                    ...this.props.style,
                }}
                handleSend = {this.handleSend.bind(this)}
            />
        );

    }
}

ForumPagePreviewerContainer.defaultProps = {
};