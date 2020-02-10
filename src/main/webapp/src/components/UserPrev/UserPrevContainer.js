import React, { Component } from 'react';

import { UserPrevView } from './UserPrevView';
import {deactivateAcc, getAllUsers, getUserById, updateUser, uploadPhoto} from '../../api/UsersFetchAPI';
import {UserEditView} from "./UserEditView";
import Spinner from "reactstrap/es/Spinner";
import {TAB_INDEXES} from "../../NavigationConstants/constants";
import {getOfferById} from "../../api/OffersFetchAPI";
import {getBidsByOfferId} from "../../api/BidsFetchAPI";
import {ApiErrorPrevView} from "../ApiErrorPrev/ApiErrorPrevView";

export class UserPrevContainer extends Component {
    constructor (props) {
        super(props);

        this.state = {
            user: null,
            error: null,
            loading: true,
        };

        this.interval = null;
    }

    setUser (user) {
        this.setState({
            user: user,
            loading: false,
        });
    }

    componentDidMount () {
        getUserById(this.props.tabProps.userId)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw response.text();
                }
            })
            .then(user => {
                this.setUser(user);
            })
            .catch(reason => {
                this.setState({
                    error: reason,
                    loading: false,
                });
                console.log(reason);
            });
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        this.interval = null;
    }

    onSuccessfulHandler (user) {
        this.setState({
            user: user,
        }, () => {
            if (user.id === this.props.loggedIn.id) {
                this.prop.onUpdateUserGlobally(user);
            }
        });
    }

    submitHandler (user) {
        updateUser(user).then(r => {
            if (r.status === 200) {
                return r.json();
            }
            throw "Unsuccessful user update";
        }).then(user => {
            this.onSuccessfulHandler(user);

        }).catch(reason => {
            this.setState({
                error: reason,
            });
        });
    }

    deactivateAccClick (userId) {
        deactivateAcc(userId)
            .then(r => {
                if (r.status === 200) {
                    return r.text();
                }
                throw `Unsuccessful deactivation of ${userId}`;
            })
            .then(deacAcc => {
                this.setState({
                    user: {
                        ...this.state.user,
                        active: false
                    },
                })
            })
            .catch()
    }

    render() {
        if (this.state.loading) {
            return <Spinner />;
        } else if (this.state.error) {
            return <ApiErrorPrevView {...this.state} />;
        } else {
            return (
                <UserPrevView
                    {...this.state}
                    {...this.props}
                    style={{
                        ...this.props.style,
                    }}

                    onEditAttempt={this.props.onUserEditClick}
                    onDeactivateAccClick={this.deactivateAccClick.bind(this)}
                />
            );
        }
    }
}

UserPrevContainer.defaultProps = {
};