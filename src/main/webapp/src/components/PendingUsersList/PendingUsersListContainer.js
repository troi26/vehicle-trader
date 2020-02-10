import React, { Component } from 'react';

import {activateAcc, getAllInactiveAccounts, getAllUsers} from '../../api/UsersFetchAPI';
import {PendingUsersListView} from "./PendingUsersListView";

export class PendingUsersListContainer extends Component {
    constructor (props) {
        super(props);

        this.state = {
            accounts: [],
        };

        this.interval = null;
    }

    componentDidMount () {
        getAllInactiveAccounts()
            .then((response) => {
                return response.json();
            }).then((response) => {
            console.log(response);
            this.setState({
                accounts: response,
            });
        })
            .catch((reason) => {
                console.log(reason);
            });
    }

    componentWillUnmount() {
        // clearInterval(this.interval);
        // this.interval = null;
    }

    activateAccountHandler (userId) {
        activateAcc(userId)
            .then(r => {
                if (r.status === 200) {
                    console.log(r);
                    return r.text();
                }
                throw "UnsuccessfulActivation";
            })
            .then(activatedId => {
                console.log(activatedId);
                this.setState({
                    accounts: this.state.accounts
                        .filter(acc => {
                            return acc.id !== activatedId
                        }),
                })
            })
            .catch(reason => console.log(reason));
    }

    render() {
        return (
            <PendingUsersListView
                {...this.state}
                style={{
                    ...this.props.style,
                }}

                onActivateAccount={this.activateAccountHandler.bind(this)}
            />
        );

    }
}

PendingUsersListContainer.defaultProps = {
};