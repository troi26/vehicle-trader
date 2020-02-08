import React, { Component } from 'react';

import {OffersPreviewerView} from "./OffersPreviewerView";
import {getAllOffers, getOffersByUserId, postOffer} from "../../api/OffersFetchAPI";

export class OffersPreviewerContainer extends Component {
    constructor (props) {
        super(props);

        this.state = {
            offers: [],
        };

        this.interval = null;
    }

    componentDidMount () {
        postOffer({
            userId: "5e3aeb10831f801e447e5eb1",
            minCash: 120000,
            created_at: new Date("2020-02-05T16:23:09.466+00:00"),
            modified_at: new Date("2020-02-05T16:23:09.466+00:00"),
            kmRun: -1,
            climatic: true,
            leatherSeats: false,
            electronicWindows: true,
            electronicMirrors: true,
            horsePower: -1,
        })
            .then((response) => response.json())
            .then((response) => console.log(response))
            .catch(reason => console.log(reason));

        this.interval = setTimeout(() => {
            getAllOffers(this.props.loggedIn.id)
                .then((response) => {
                    return response.json();
                }).then((response) => {
                    console.log(response);
                    this.setState({
                        offers: response,
                    })
                })
                .catch((reason) => {
                    console.log(reason);
                });
        }, 2000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        this.interval = null;
    }

    render() {
        return (
            <OffersPreviewerView
                {...this.state}
                {...this.props}
                style={{
                    ...this.props.style,
                }}
            />
        );

    }
}

OffersPreviewerContainer.defaultProps = {
};