import React, { Component } from 'react';

import { UserPrevView } from './UserPrevView';
import {deactivateAcc, getAllUsers, getUserById, updateUser, uploadPhoto} from '../../api/UsersFetchAPI';
import {UserEditView} from "./UserEditView";
import Spinner from "reactstrap/es/Spinner";
import {TAB_INDEXES} from "../../NavigationConstants/constants";
import {getOfferById} from "../../api/OffersFetchAPI";
import {getBidsByOfferId} from "../../api/BidsFetchAPI";
import {ApiErrorPrevView} from "../ApiErrorPrev/ApiErrorPrevView";
import {getUserRatingByGraderId, getUserRatingById, postUserRating} from "../../api/RatingFetchAPI";

export class UserPrevContainer extends Component {
    constructor (props) {
        super(props);

        this.state = {
            user: null,
            error: null,
            loading: true,
            rating: null,
            overallRating: 0,
        };

        this.interval = null;
    }

    loadRatingByMe () {
        console.log("loadRatingByMe");
        getUserRatingByGraderId(this.state.user.id, this.props.loggedIn.id)
            .then(r => r.status
                ? r.json().then((rating) => {
                    this.setState({
                        rating: rating.length > 0 ? rating[rating.length - 1].numStars : 0,
                    });
                })
                : r.json().then(() => {
                    this.setState({
                        rating: 0,
                    });
                })).catch(reason => console.log(reason))
    }

    setUserAndRating (user, overallR) {
        console.log("RATING LOADED: ", user, overallR);
        this.setState({
            user: user,
            overallRating: isNaN(overallR) ? 0 : overallR,
            loading: false,
        });

        if (user.id !== this.props.loggedIn.id) {
            this.loadRatingByMe();
        }
    }

    setUser (user) {
        getUserRatingById(user.id)
            .then(r => r.status === 200
                ? r.json().then((rating) => this.setUserAndRating(user, rating))
                : r.json().then((errors) => {
                    console.log(errors)
                    this.setState({
                        user: user,
                        loading: false,
                    });
                }))
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

    gradeSuccessHandler (rating) {
        console.log("gradeSuccessHandler", rating);
        this.setState({
            rating: rating.numStars,
        });
    }

    gradeFailure (errors) {
        console.log("gradeFailure", errors);
        this.setState({
            user: {
                ...this.state.user,
                rate: this.state.user.rating,
            },
        })
    }

    rateUserHandler (rate) {
        const grade = {
            graderUserId: this.props.loggedIn.id,
            evaluatedUserId: this.state.user.id,
            comment: `${this.props.loggedIn.id} rates you with ${rate} stars.`,
            numStars: rate,
        };

        postUserRating(grade)
            .then(r => r.status === 200
                ? r.json().then(this.gradeSuccessHandler.bind(this))
                : r.json().then(this.gradeFailure.bind(this)))
            .catch(reason => console.log(reason));
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
                    onRateClick={this.rateUserHandler.bind(this)}
                />
            );
        }
    }
}

UserPrevContainer.defaultProps = {
};