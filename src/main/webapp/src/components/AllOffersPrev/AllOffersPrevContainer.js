import React, { Component } from 'react';

import {getAllOffers, getOffersByUserId} from "../../api/OffersFetchAPI";
import {getAllUsers, getUserById} from "../../api/UsersFetchAPI";
import {AllOffersPrevView} from "./AllOffersPrevView";

export class AllOffersPrevContainer extends Component {
    constructor (props) {
        super(props);

        this.state = {
            offers: [],
            authors: [],
        };

        this.interval = null;
        this.userIds = [];
    }

    loadAuthors () {
        const authorIds = this.state.offers.map(off => off.userIds);
        getAllUsers()
            .then(r => {
                if (r.status === 200) {
                    return r.json();
                }
                throw "Authors can not be loaded";
            })
            .then(users => {
                this.setState({
                    authors: users
                }, () => console.log(this.state.authors));
            })
            .catch(reason => {
                console.log(reason);
            });
    }

    componentDidMount () {
        this.loadAuthors();
        getAllOffers()
            .then(resp => {
                if (resp.status === 200) {
                    return resp.json();
                }
                throw "Offer not found";
            })
            .then(offers => {
                this.setState({
                    offers: offers
                });
            })
            .catch(reason => console.log(reason));
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        this.interval = null;
    }

    render() {
        return (
            <AllOffersPrevView
                {...this.state}
                {...this.props}
                style={{
                    ...this.props.style,
                }}
            />
        );

    }
}

AllOffersPrevContainer.defaultProps = {
};