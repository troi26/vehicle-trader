import React, { Component } from 'react';

import {AddOfferView} from "./AddOfferView";
import {OfferFieldsNonNull} from "../../Configs/OfferFieldsParams";
import {postOffer} from "../../api/OffersFetchAPI";

export class AddOfferContainer extends Component {
    constructor (props) {
        super(props);

        this.state = {
            offer: {
                userId: this.props.loggedIn.id,
                usedStatus: true,
                transmissionType: "AUTO",
                engineType: "Diesel",
                climatic: false,
                leatherSeats: false,
                electronicWindows: false,
                electronicMirrors: true,
                startingPrice: 0,
                horsePower: 100,
                kmRun: 0,
                manufactured: new Date(),
            },
            errors: {

            }
        };
    }

    setTextFieldHandler (event) {
        const value = event.target.value;
        const fname = event.target.name;
        if (OfferFieldsNonNull.includes(fname)) {
            if (!value || value.length === 0) {
                this.setState({
                    offer : {
                        ...this.state.offer,
                        [fname]: value,
                    },
                    errors: {
                        ...this.state.errors,
                        [fname]: "Empty value is not allowed here",
                    },
                })
            } else {
                const cleanError = this.state.errors;
                delete cleanError[fname];
                console.log("VALID VALUE", fname, value);
                // console.log();
                this.setState({
                    offer : {
                        ...this.state.offer,
                        [fname]: value,
                    },
                    errors: cleanError,
                });
            }
        } else {
            this.setState({
                [fname]: value,
            });
        }
    }

    setNumberFieldHandler (event) {
        const value = event.target.value;
        const fname = event.target.name;
        console.log(fname, value);
        if (OfferFieldsNonNull.includes(fname)) {
            console.log("NOT EMPTY");
            if (!value || value.length === 0) {
                this.setState({
                    offer : {
                        ...this.state.offer,
                        [fname]: value >= 0 ? value : this.state.offer[fname],
                    },
                    errors: {
                        ...this.state.errors,
                        [fname]: "Empty value and symbols is not allowed here",
                    },
                })
            } else {
                const cleanError = this.state.errors;
                delete cleanError[fname];
                console.log("VALID VALUE", fname, value);
                // console.log();
                this.setState({
                    offer : {
                        ...this.state.offer,
                        [fname]: value >= 0 ? value : this.state.offer[fname],
                    },
                    errors: cleanError,
                });
            }
        } else {
            this.setState({
                [fname]: value,
            });
        }
    }

    onOfferedSuccessfullyCreated (promise) {
        this.props.onShowAccountInfoClick();
    }

    onFailure (promise) {
        console.log(promise.errors);
        const errorsMap = {};

        for (let err of promise.errors) {
            console.log("ERR:", err);
            errorsMap[err.field] = err.defaultMessage;
        }
        console.log(errorsMap);
        this.setState({
            errors: errorsMap,
        });
    }

    submitOfferValidation () {
        if (Object.keys(this.state.errors).length === 0) {
            postOffer(this.state.offer)
                .then(r => {
                    if (r.status === 200) {
                        r.json().then(this.onOfferedSuccessfullyCreated.bind(this));
                    } else {
                        r.json().then(this.onFailure.bind(this));
                        throw "Unsuccessful";
                    }
                })
                .catch();
        }
    }

    manufactDateFieldChangeHandler (date) {
        console.log(date);
        this.setState({
            offer: {
                ...this.state.offer,
                manufactured: date,
            },
        });
    }

    changeRadioFieldHandler (event) {
        const value = event.target.value;
        const fname = event.target.name;
        console.log(fname, value);
        this.setState({
            offer : {
                ...this.state.offer,
                [fname]: value
            },
        });
    }

    changeIncludedExcludedHandler (event) {
        const fname = event.target.name;
        this.setState({
            offer: {
                ...this.state.offer,
                [fname]: !this.state.offer[fname],
            },
        });
    }

    render() {
        return (
            <AddOfferView
                {...this.state}

                onSetTextField={this.setTextFieldHandler.bind(this)}
                onSetNumberField={this.setNumberFieldHandler.bind(this)}
                onChangeRadio={this.changeRadioFieldHandler.bind(this)}
                onSubmit={this.submitOfferValidation.bind(this)}
                onChangeManufactDate={this.manufactDateFieldChangeHandler.bind(this)}
                onChangeIncludedExcluded={this.changeIncludedExcludedHandler.bind(this)}
            />
        )
    }
}

AddOfferContainer.defaultProps = {
};