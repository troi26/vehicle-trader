import React, { Component } from "react";
import {HeaderView} from "./HeaderView";

export class HeaderContainer extends Component{
    constructor (props) {
        super(props);
    }

    loginClickHandler () {
        console.log("LOGIN");
    }

    homeClickHandler () {
        console.log("HOME");
    }

    logoutClickHandler () {
        this.props.onLogout();
    }

    render() {
        return (
            <HeaderView
                {...this.props}
                onLoginClick={this.loginClickHandler.bind(this)}
                onHomeClick={this.homeClickHandler.bind(this)}
                onLogoutClick={this.logoutClickHandler.bind(this)}
            />
        );
    }
}