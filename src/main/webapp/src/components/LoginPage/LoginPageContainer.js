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
        login(event.target)
            .then((response) => console.log(response))
            .catch((reason) => console.log(reason));
    };

    render() {
        return (
            <LoginPageView
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