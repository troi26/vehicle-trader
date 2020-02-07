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
        this.interval = setInterval(() => {
            getOffersByUserId()
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
        }, 1000);
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