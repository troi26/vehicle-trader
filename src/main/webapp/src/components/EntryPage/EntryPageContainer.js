import React, { Component } from 'react';

import {EntryPageView} from "./EntryPageView";
import {getLoggedUser, login, logout} from "../../api/SecurityFetchAPI";
import '../../css/chat.css';
import '../../css/forum.css';
export class EntryPageContainer extends Component {
    constructor (props) {
        super(props);

        this.state = {
            loggedIn: {
                id: '5e35c1701dc6010fac896bd9',
                username: 'admin',
            },
            // loggedIn: null,
            loading: false,
        };

        this.interval = null;
    }

    checkForSession () {
        getLoggedUser()
            .then(response => {
                console.log(response);
                if (response.redirected === true) {
                    throw "Not signed in";
                } else {
                    return response.json();
                }
            })
            .then(response => {
                console.log(response);
                this.setLoggedIn(response);
            })
            .catch(reason => {
                this.setLoggedIn(null);
                console.log(reason);
            });
    }

    setLoggedIn (logged) {
        console.log("LOGGED: ", logged);
        this.setState({
            loggedIn: logged,
            loading: false,
        });
    }

    loginHandler (credentials, event) {
        login(event.target)
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then(response => {
                console.log(response);
                this.setLoggedIn(response);
            })
            .catch((reason) => console.log(reason));
    }


    logoutHandler () {
        logout()
            .then(response => response.json())
            .then((response) => {
                console.log(response);
                this.setLoggedIn(null);
            })
            .catch(reason => console.log(reason))
    }

    componentDidMount () {
        console.log("MOUNTING:");
        // this.checkForSession();
    }

    componentWillUnmount() {

    }

    render() {

        return (
            <EntryPageView
                {...this.state}
                style={{
                    ...this.props.style,
                }}

                onLogin={this.loginHandler.bind(this)}
                onLogout={this.logoutHandler.bind(this)}
            />
        );

    }
}

EntryPageContainer.defaultProps = {
};