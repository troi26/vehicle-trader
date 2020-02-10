import React, { Component } from 'react';

import {OffersPreviewerView} from "./OffersPreviewerView";
import {getOffersByUserId} from "../../api/OffersFetchAPI";

export class OffersPreviewerContainer extends Component {
    constructor (props) {
        super(props);

        this.state = {
            offers: [],
        };

        this.interval = null;
    }

    componentDidMount () {
        getOffersByUserId(this.props.tabProps.userId)
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