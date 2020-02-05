import React, { Component } from "react";
import {LoginFormView} from "./LoginFormView";

export class LoginFormContainer extends Component{
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <LoginFormView {...this.props}
            />
        );
    }
}

LoginFormContainer.defaultProps = {

};