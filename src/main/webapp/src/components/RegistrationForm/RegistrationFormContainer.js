import React, { Component } from 'react';

import {RegistrationFormView} from "./RegistrationFormView";
import {registerAccount, uploadPhoto} from "../../api/UsersFetchAPI";

export class RegistrationFormContainer extends Component {
    constructor (props) {
        super(props);

        this.state = {
            credentials: {
                username: "",
                name: "",
                surname: "",
                email: "",
                cashAmount: 0,
                password: "",
                roles: "ROLE_BIDDER",
            },
            hasErrors: false,
            errors: {

            }
        };
    }

    componentDidMount () {
    }

    componentWillUnmount() {
    }

    submitHandler (user) {
    }

    changeTextFieldHandler (event) {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            credentials: {
                ...this.state.credentials,
                [name]: value,
            }
        });
    }

    changeNumberFieldHandler (event) {
        const value = event.target.value;
        const name = event.target.name;
        if (value >= 0 || !value) {
            this.setState({
                credentials: {
                    ...this.state.credentials,
                    [name]: value,
                }
            });
        }
    }

    radioButtonHandler (event) {
        const value = event.target.value;
        const name = event.target.name;
        console.log("radioButtonHandler", name, value);
        this.setState({
            credentials: {
                ...this.state.credentials,
                [name]: value,
            }
        });
    }
    //
    // uploadNewAvatarHandler (event) {
    //     console.log(event.target.files[0].name);
    //     uploadPhoto(event.target.files[0], this.state.user.id)
    //         .then(response => {
    //             if (response.status === 200) {
    //                 return response.json();
    //             }
    //             throw response.error();
    //         })
    //         .then(response => {
    //             this.setState({
    //                 user: {
    //                     ...this.state.user,
    //                     avatarUrl: response.avatarUrl,
    //                 }
    //             }, () => console.log(this.state.user.avatarUrl));
    //         })
    //         .catch(reason => console.log(reason));
    // }

    successfulReg (resp) {
        console.log("TRUE");
        this.props.onShowLogin();
    }

    customErrorResponse (errors) {
        console.log("Data: ", errors.data);
        this.setState({
            hasErrors: true,
            errors: {
                ...this.state.errors,
                [errors.field]: errors.errorMsg,
            }
        }, () => {console.log(this.state.errors)});
        console.log("FALSE");
    }

    errorResponse (statusObj) {
        console.log(statusObj.errors);
        const errorsMap = {};

        for (let err of statusObj.errors) {
            console.log("ERR:", err);
            errorsMap[err.field] = err.defaultMessage;
        }
        console.log(errorsMap);
        this.setState({
            errors: errorsMap,
        });
    }

    registerSubmit (event) {
        event.preventDefault();
        registerAccount(this.state.credentials)
            .then(r => {
                if (r.status === 201) {
                    r.json()
                        .then(this.successfulReg.bind(this));
                } else if (r.status === 409) {
                    return r.json()
                        .then(this.customErrorResponse.bind(this));
                } else if (r.status === 400) {
                    return r.json()
                        .then(this.errorResponse.bind(this));
                }
                throw "Unknown status";
            })
            .catch(reason => console.log(reason));
        return false;
    }

    render() {
        return (
            <RegistrationFormView
                {...this.state}
                onSubmit={this.submitHandler.bind(this)}
                onChangeTextField={this.changeTextFieldHandler.bind(this)}
                onChangeNumberFieldHandler={this.changeNumberFieldHandler.bind(this)}
                // onUploadNewAvatar={this.uploadNewAvatarHandler.bind(this)}

                onRegisterSubmit={this.registerSubmit.bind(this)}
                onRadioButtonChange={this.radioButtonHandler.bind(this)}
            />
        )
    }
}

RegistrationFormContainer.defaultProps = {
};