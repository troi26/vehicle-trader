import React, { Component } from 'react';
import { BidsPreviewerView } from './BidsPreviewerView';
import {getBidsByOfferId, postBid} from "../../api/BidsFetchAPI";

export class BidsPreviewerContainer extends Component {
	constructor (props) {
		super(props);

		this.state = {
			bids: [],
		};

		this.eventSource = null;
	}

	addNewBidToState (bid) {
		console.log("addNewBidToState");
		const avBidIds = this.state.bids.map(b => b.id);
		if (!avBidIds.includes(bid.id)) {
			this.setState({
				bids: this.state.bids.concat([bid]),
			});
		}
	}

	addNewBidToDB (bid = {
		userId: "5e3b277397c94158f08d4f2d",
		offerId: "5e3aebed7703ff2ec194cb14",
		value: '14230',
		created_at: new Date("2020-02-05T22:23:09.000+00:00"),
		modified_at: new Date("2020-02-05T22:23:09.000+00:00"),
	}) {
		const result = postBid(bid, this.props.authToken);

		result
			.then((response) => {
				console.log(response);
				return response.json();
			})
			.then((response) => {
				console.log(response);
			})
			.catch((reason) => console.log(reason));
	}

	componentDidMount() {
		console.log("componentDidMount");
		this.startEventListener();
		setTimeout(this.addNewBidToDB.bind(this), 3000);
		setTimeout(this.addNewBidToDB.bind(this), 10000);
	}

	componentWillUnmount() {
		this.eventSource.close();
		this.eventSource = null;
	}

	startEventListener () {
		if(typeof(EventSource) !== "undefined") {
			console.log("startEventListener", this.props.authToken);
			if (this.eventSource === null) {
				const offerId = "5e3aebed7703ff2ec194cb14";
				this.eventSource = getBidsByOfferId(offerId, this.props.authToken);
				this.eventSource.addEventListener("message", (event) => {
					const newData = JSON.parse(event.data);
					console.log(newData);
					this.addNewBidToState(newData);
				});
				// this.eventSource.onmessage = (event) => {
				// 	const newData = JSON.parse(event.data);
				// 	console.log(newData);
				// 	this.addNewBidToState(newData);
				// };
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