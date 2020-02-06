import React, { Component } from 'react';
import { BidsPreviewerView } from './BidsPreviewerView';
import {getBidsByOfferId} from "../../api/BidsFetchAPI";

export class BidsPreviewerContainer extends Component {
	constructor (props) {
		super(props);

		this.state = {
			bids: [],
		};
	}

	addNewBid (bid) {
		this.setState({
			bids: this.state.bids.concat([bid]),
		});
	}

	componentDidMount() {
		this.startEventListener();
	}

	startEventListener () {
		if(typeof(EventSource) !== "undefined") {
			const offerId = "5e3aebed7703ff2ec194cb14";
			const eventSource = getBidsByOfferId(offerId);
			eventSource.onmessage = (event) => {
				const newData = JSON.parse(event.data);
				console.log(newData);
				this.addNewBid(newData);
			};
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