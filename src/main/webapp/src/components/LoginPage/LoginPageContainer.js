import React, { Component } from "react";
import {LoginPageView} from "./LoginPageView";
import {login} from "../../api/SecurityFetchAPI";

export class LoginPageContainer extends Component{
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
        };

        this.fm = null;
    }

    passwordChangeHandler (ev) {
        this.setState({
            password: ev.target.value,
        });
    }

    usernameChangeHandler (ev) {
        this.setState({
            username: ev.target.value,
        });
    }

    handleSubmit (event) {
        event.preventDefault();
        this.props.onLogin({
            username: this.state.username,
            password: this.state.password,
        }, event);
    };

    render() {
        return (
            <LoginPageView
                {...this.props}
                style={{
                    ...this.props.style,
                }}
                formRef={this.fm}
                username={this.state.username}
                password={this.state.password}
                onSubmit={this.handleSubmit.bind(this)}
                onPasswordChange={this.passwordChangeHandler.bind(this)}
                onUsernameChange={this.usernameChangeHandler.bind(this)}
            />
        );
    }
}

LoginPageContainer.defaultProps = {

};