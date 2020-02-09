import React, { Component } from "react";
import {PostView} from "./PostView";

export class PostContainer extends Component{
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <PostView {...this.props}
            />
        );
    }
}

PostContainer.defaultProps = {

};