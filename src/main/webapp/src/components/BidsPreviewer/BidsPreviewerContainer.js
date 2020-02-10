import React, { Component } from 'react';
import { BidsPreviewerView } from './BidsPreviewerView';
import {getBidsByOfferId, getBidsByUserId, postBid} from "../../api/BidsFetchAPI";
import {getOfferById} from "../../api/OffersFetchAPI";

export class BidsPreviewerContainer extends Component {
	constructor (props) {
		super(props);

		this.state = {
			bids: [],
		};


		this.offerIds = [];

		this.eventSource = null;
	}

	addNewBidToState (bid) {

		console.log("addNewBidToState");
		// if (!this.offerIds.includes(bid.offerId)) {
			getOfferById(bid.offerId)
				.then(resp => {
					if (resp.status === 200) {
						return resp.json()
					}
					throw "Offer not found";
				})
				.then(offer => {
					const avBidIds = this.state.bids.map(b => b.id);
					bid = {
						...bid,
						offer: offer,
					};
					if (!avBidIds.includes(bid.id)) {
						this.setState({
							bids: this.state.bids.concat([bid]),
						}/*, () => this.offerIds.push(bid.offerId)*/);
					}
				})
				.catch(reason => console.log(reason));
		// }
	}

	componentDidMount() {
		console.log("componentDidMount");
		this.startEventListener();
	}

	componentWillUnmount() {
		this.eventSource.close();
		this.eventSource = null;
	}

	startEventListener () {
		if(typeof(EventSource) !== "undefined") {
			console.log("startEventListener");
			if (this.eventSource === null) {
				const loggedUserId = this.props.loggedIn.id;
				this.eventSource = getBidsByUserId(loggedUserId);
				this.eventSource.addEventListener("message", (event) => {
					const newData = JSON.parse(event.data);
					console.log(newData);
					this.addNewBidToState(newData);
				});
			}
		} else {
			console.log("EventSource not enabled");
		}
	}

	render() {
		return (
			<BidsPreviewerView {...this.state}
							   {...this.props}
			/>
		);

	}
}

BidsPreviewerContainer.defaultProps = {
};