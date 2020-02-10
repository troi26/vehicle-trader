import React, { Component } from 'react';

import { UsersPreviewerView } from './UsersPreviewerView';
import {
    activateAcc,
    deactivateAcc,
    getAllActiveAccountsNotMe,
    getAllIgnoringId,
    getAllUsers
} from '../../api/UsersFetchAPI';
import {PendingUsersListView} from "../PendingUsersList/PendingUsersListView";

export class UsersPreviewerContainer extends Component {
    constructor (props) {
        super(props);

        this.state = {
            users: [],
        };

        this.interval = null;
    }

    componentDidMount () {
        if (this.props.loggedIn.roles === "ROLE_ADMIN") {
            getAllIgnoringId(this.props.loggedIn.id)
                .then((response) => {
                    if (response.status === 200) {
                        return response.json();
                    }
                    throw "Unsuccessful users loading...";
                }).then((response) => {
                console.log(response);
                this.setState({
                    users: response,
                });
            })
                .catch((reason) => {
                    console.log(reason);
                });
        } else {
            getAllActiveAccountsNotMe(this.props.loggedIn.id)
                .then((response) => {
                    if (response.status === 200) {
                        return response.json();
                    }
                    throw "Unsuccessful users loading...";
                }).then((response) => {
                console.log(response);
                this.setState({
                    users: response,
                });
            })
                .catch((reason) => {
                    console.log(reason);
                });
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        this.interval = null;
    }

    activateAccountHandler (userId) {
        activateAcc(userId)
            .then(r => {
                if (r.status === 200) {
                    console.log(r);
                    return r.text();
                }
                throw "Unsuccessful Activation";
            })
            .then(activatedId => {
                console.log(activatedId);
                this.setState({
                    users: this.state.users
                        .map(acc => acc.id === activatedId
                            ? {
                                ...acc,
                                active: true,
                            }
                            : acc),
                })
            })
            .catch(reason => console.log(reason));
    }

    deactivateAccountHandler (userId) {
        deactivateAcc(userId)
            .then(r => {
                if (r.status === 200) {
                    console.log(r);
                    return r.text();
                }
                throw "Unsuccessful Deactivation";
            })
            .then(deactivatedId => {
                console.log(deactivatedId);
                this.setState({
                    users: this.state.users
                        .map(acc => acc.id === deactivatedId
                            ? {
                                ...acc,
                                active: false,
                            }
                            : acc),
                })
            })
            .catch(reason => console.log(reason));
    }

    render() {
        return (
            <UsersPreviewerView
                {...this.state}
                {...this.props}
               // style={{
               //     ...this.props.style,
               // }}

                onActivateAccount={this.activateAccountHandler.bind(this)}
                onDeactivateAccount={this.deactivateAccountHandler.bind(this)}
            />
        );

    }
}

UsersPreviewerContainer.defaultProps = {
};