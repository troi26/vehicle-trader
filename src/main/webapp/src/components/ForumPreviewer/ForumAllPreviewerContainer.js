import React, { Component } from 'react';

import {ForumAllPreviewerView} from "./ForumAllPreviewerView";
import {getAllForumPages} from "../../api/ForumFetchAPI";

export class ForumAllPreviewerContainer extends Component {
    constructor (props) {
        super(props);

        this.state = {
            forumPages: [],
            currentTopic: [],
        };

        this.interval = null;
    }

    componentDidMount () {
        getAllForumPages()
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            this.setState({
                forumPages: this.state.forumPages.concat(result)
            });
        })
    }

    componentWillUnmount() {
        
    }

    onOpenTopic (topic) {

    }

    render() {
        return (
            <ForumAllPreviewerView
                {...this.state}
                {...this.props}
                style={{
                    ...this.props.style,
                }}
            />
        );

    }
}

ForumAllPreviewerContainer.defaultProps = {
};