import React, { Component } from "react";
import {MessageView} from "./MessageView";

export class MessageContainer extends Component{
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <MessageView {...this.props}
            />
        );
    }
}

MessageContainer.defaultProps = {

};