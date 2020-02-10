import React, { Component } from 'react';

import {getAllUsers, getUserById, updateUser, uploadPhoto} from '../../api/UsersFetchAPI';
import {UserEditView} from "./UserEditView";
import Spinner from "reactstrap/es/Spinner";
import {TAB_INDEXES} from "../../NavigationConstants/constants";
import {ApiErrorPrevView} from "../ApiErrorPrev/ApiErrorPrevView";

export class UserEditContainer extends Component {
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
        delete user["authorities"];
        this.setState({
            user: {
                ...user,
                password: "",
            },
            loading: false,
        });
    }

    componentDidMount () {
        console.log(this.props)
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
        // IMPORTANT NOTE: Have to delete authorities and add empty password string to be able backend to cast
        // passed JSON string to User model!!
        delete user["authorities"];
        this.setState({
            user: {
                ...user,
                password: "",
            },
            loading: false,
        });
    }

    submitHandler (user) {
        updateUser(user).then(r => {
            if (r.status === 200) {
                return r.json();
            }
            throw "Unsuccessful user update";
        }).then(user => {
            console.log(user);
            this.onSuccessfulHandler(user);

        }).catch(reason => {
            this.setState({
                error: reason,
            });
        });
    }

    /**
     * Load image handler
     * @param event
     */

    loadImageHandler (event) {
        console.log(event.target.files[0].name);
        uploadPhoto(event.target.files[0], this.state.user.id)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
                throw response.error();
            })
            .then(response => {
                this.setState({
                    user: {
                        ...this.state.user,
                        avatarUrl: response.avatarUrl,
                    }
                }, () => console.log(this.state.user.avatarUrl));
            })
            .catch(reason => console.log(reason));
    }

    changeTextFieldHandler (event) {
        this.setState({
            user: {
                ...this.state.user,
                [event.target.name]: event.target.value,
            }
        });
    }

    changeRadioFieldHandler (event) {
        console.log(event.target.name);
        console.log(event.target.value);
        this.setState({
            user: {
                ...this.state.user,
                [event.target.name]: event.target.value,
            }
        });
    }

    render() {
        if (this.state.loading) {
            return <Spinner />;
        } else if (this.state.error) {
            return <ApiErrorPrevView {...this.state} />;
        } else {
            return (
                <UserEditView
                    {...this.state}
                    {...this.props}
                    style={{
                        ...this.props.style,
                    }}

                    onSubmitUser={this.submitHandler.bind(this)}
                    onLoadNewImage={this.loadImageHandler.bind(this)}

                    onChangeTextField={this.changeTextFieldHandler.bind(this)}
                    onChangeRadioField={this.changeRadioFieldHandler.bind(this)}
                />
            );
        }
    }
}

UserEditContainer.defaultProps = {
};