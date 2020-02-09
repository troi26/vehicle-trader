import React, { Component } from 'react';

import {OfferPrevView} from "./OfferPrevView";
import {getOfferById, putOffer, uploadPhoto} from "../../api/OffersFetchAPI";
import {TAB_INDEXES} from "../../NavigationConstants/constants";
import {OfferEditView} from "./OfferEditView";
import Spinner from "reactstrap/es/Spinner";
import {getUserById} from "../../api/UsersFetchAPI";
import {getBidsByOfferId, postBid} from "../../api/BidsFetchAPI";

export class OfferPrevContainer extends Component {
    constructor (props) {
        super(props);

        this.state = {
            loading: true,
            offer: null,
            error: null,
            editedValues: null,
            author: null,

            bidding: true,
            bidValue: 0,
            bids: [],
        };

        this.interval = null;

        this.bidsStream= null;
    }

    setOffer (offer) {
        console.log("BEFORE state: ", offer);
        const dates = this.getDates(offer);
        console.log(dates);
        this.setState({
            loading: false,
            offer: {
                ...offer,
                ...dates,
            },
            editedValues: {
                ...offer,
                ...dates,
            },
            error: null,
        }, () => console.log("after state: ", this.state.offer));
    }

    setAuthor (user) {
        this.setState({
            author: user,
        });
    }

    getDates (offer) {
        console.log(offer);
        return {
            manufactured: new Date(offer.manufactured[0], offer.manufactured[1] - 1, offer.manufactured[2],
                12, 0, 0),
            created_at: new Date(offer.created_at[0], offer.created_at[1] - 1, offer.created_at[2]
                , offer.created_at[3], offer.created_at[4], offer.created_at[5]),
            modified_at: new Date(offer.modified_at[0], offer.modified_at[1] - 1, offer.modified_at[2]
            , offer.modified_at[3], offer.modified_at[4], offer.modified_at[5]),

        };
    }

    setError (errorMsg) {
        this.setState({
            loading: false,
            offer: null,
            editedValues: null,
            error: errorMsg,
        });
    }

    updateBidsList (bid) {
        console.log("addNewBidToState");
        const avBidIds = this.state.bids.map(b => b.id);
        if (!avBidIds.includes(bid.id)) {
            this.setState({
                bids: this.state.bids.concat([bid]),
            });
        }
    }

    componentDidMount () {
        console.log("componentDidMount");
        if (!this.state.offer) {
            getOfferById(this.props.tabProps.offerId)
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        throw response.text();
                    }
                })
                .then(offer => {
                    getUserById(offer.userId)
                        .then(response => {
                            if (response.status === 200) {
                                return response.json();
                            } else {
                                throw "User not found";
                            }
                        })
                        .then(user => {
                            this.setOffer(offer);
                            this.setAuthor(user);
                        })
                        .catch(reason => {
                            console.log(reason);
                            this.setOffer(offer);
                        });

                    // const offerId = "5e3aebed7703ff2ec194cb14";
                    // this.eventSource = getBidsByOfferId(offerId);
                    // this.eventSource.addEventListener("message", (event) => {
                    //     const newData = JSON.parse(event.data);
                    //     console.log(newData);
                    //     this.addNewBidToState(newData);
                    // });

                    // console.log(offer.id);
                    this.bidsStream = getBidsByOfferId(offer.id);
                    this.bidsStream.addEventListener("message", (event) => {
                        const newData = JSON.parse(event.data);
                        console.log(newData);
                        this.updateBidsList(newData);
                    });
                })
                .catch(reason => {
                    console.log();
                    this.setError(reason);
                });
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        this.interval = null;

        // Closing event stream
        this.bidsStream.close();
        this.bidsStream = null;
    }

    changeTransmissionTHandler (event) {
        this.setState({
            editedValues: {
                ...this.state.editedValues,
                transmissionType: event.target.value,
            },
        });
    }

    changeUsedStatHandler (event) {
        this.setState({
            editedValues: {
                ...this.state.editedValues,
                usedStatus: event.target.value === "Used",
            },
        });
    }

    changeStartPrHandler (event) {
        const value = parseInt(event.target.value);
        if (value >= 0) {
            this.setState({
                editedValues: {
                    ...this.state.editedValues,
                    startingPrice: value,
                },
            });
        }
    }

    changeTitleHandler (event) {
        this.setState({
            editedValues: {
                ...this.state.editedValues,
                title: event.target.value,
            },
        });
    }

    changeRunHandler (event) {
        const value = parseInt(event.target.value);
        if (value >= 0) {
            this.setState({
                editedValues: {
                    ...this.state.editedValues,
                    kmRun: value,
                },
            });
        }
    }

    changeManufactHandler (date) {
        console.log(date);
        this.setState({
            editedValues: {
                ...this.state.editedValues,
                manufactured: date,
            },
        });
    }

    changeEngineTHandler (event) {
        console.log(event.target.value);
        this.setState({
            editedValues: {
                ...this.state.editedValues,
                engineType: event.target.value,
            },
        });
    }

    changeHPHandler (event) {
        const value = parseInt(event.target.value);
        if (value >= 0) {
            this.setState({
                editedValues: {
                    ...this.state.editedValues,
                    horsePower: value,
                },
            });
        }
    }

    changeBrandHandler (event) {
        this.setState({
            editedValues: {
                ...this.state.editedValues,
                brand: event.target.value,
            },
        });
    }

    changeModelHandler (event) {
        this.setState({
            editedValues: {
                ...this.state.editedValues,
                model: event.target.value,
            },
        });
    }

    changeIncludedExcluded (event) {
        const fieldName = event.target.name;
        this.setState({
            editedValues: {
                ...this.state.editedValues,
                [fieldName]: !this.state.editedValues[fieldName],
            },
        });
    }

    submitOfferHandler (offer) {
        console.log(offer);
        console.log(offer.manufactured.toISOString());
        const offerToSave = {
            ...offer,
            manufactured: offer.manufactured.toISOString(),
            created_at: offer.created_at.toISOString(),
            modified_at: offer.modified_at.toISOString(),
        };
        console.log(offerToSave);
        putOffer(offerToSave)
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                }
                throw response.error();
            })
            .then(offer => {
                this.setOffer(offer);
                this.props.onSubmitOffer(offer)
            })
            .catch(reason => console.log(reason));
    }

    loadImageHandler (event) {
        console.log(event.target.files[0].name);
        uploadPhoto(event.target.files[0], this.state.offer.id)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
                throw response.error();
            })
            .then(response => {
                this.setState({
                    editedValues: {
                        ...this.state.editedValues,
                        photoUrl: response.photoUrl,
                    }
                }, () => console.log(this.state.editedValues.photoUrl));
            })
            .catch(reason => console.log(reason));
    }

    setOfferDates (offer) {
        console.log("setOfferDates", offer);
        return {
            ...offer,
            manufactured: new Date(offer.manufactured),
            created_at: new Date(offer.created_at),
            modified_at: new Date(offer.modified_at),
        }
    }

    valueChangeHandler (event) {
        const value = parseInt(event.target.value);
        console.log("valueChangeHandler: ", value);
        if (value >= 0 || !value) {
            this.setState({
                bidValue: value,
            });
        }
    }

    bidSubmitHandler (bid) {
        postBid(bid)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
                throw response.error();
            })
            .then(response => {
                console.log(response);
                this.endBidding();
            })
            .catch(reason => {
                console.log(reason);
                this.endBidding();
            });
    }

    endBidding () {
        this.setState({
            bidding: false,
        });
    }

    bidAttemptHandler () {
        this.setState({
            bidding: true,
        });
    }

    findHighestBid () {
        console.log("findHighestBid");
        if (this.state.bids.length > 0) {
            const bids = this.state.bids.slice();
            bids.sort((b1, b2) => b2.value - b1.value);
            console.log(bids);
            return bids[0].value;
        }

        return null;
    }

    render() {
        if (this.state.loading) {
            return <Spinner />;
        } else {
            if (this.props.tabIdx === TAB_INDEXES.OFFER_EDIT) {

                return (
                    <OfferEditView
                        {...this.state}
                        {...this.props}

                        offer={this.state.offer}
                        style={{
                            ...this.props.style,
                        }}

                        onSubmitOffer={this.submitOfferHandler.bind(this)}


                        onChangeTransmissionT={this.changeTransmissionTHandler.bind(this)}
                        onChangeUseStatus={this.changeUsedStatHandler.bind(this)}
                        onChangeStartPrice={this.changeStartPrHandler.bind(this)}
                        onChangeTitle={this.changeTitleHandler.bind(this)}
                        onChangeEngineT={this.changeEngineTHandler.bind(this)}
                        onChangeRun={this.changeRunHandler.bind(this)}
                        onChangeManufactDate={this.changeManufactHandler.bind(this)}
                        onChangeHorseP={this.changeHPHandler.bind(this)}
                        onChangeBrand={this.changeBrandHandler.bind(this)}
                        onChangeModel={this.changeModelHandler.bind(this)}
                        onChangeIncludedExcluded={this.changeIncludedExcluded.bind(this)}
                        onLoadNewImage={this.loadImageHandler.bind(this)}


                    />
                );
            } else {
                return (
                    <OfferPrevView
                        {...this.state}
                        {...this.props}

                        offer={this.state.offer}

                        style={{
                            ...this.props.style,
                        }}

                        highestBid={this.findHighestBid()}

                        onBidValueChange={this.valueChangeHandler.bind(this)}
                        onSubmitBid={this.bidSubmitHandler.bind(this)}

                        onBidOfferAttempt={this.bidAttemptHandler.bind(this)}
                    />
                );
            }
        }
    }
}

OfferPrevContainer.defaultProps = {
};