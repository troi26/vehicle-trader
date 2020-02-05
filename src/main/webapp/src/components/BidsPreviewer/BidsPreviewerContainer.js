import React, { Component } from 'react';
import { BidsPreviewerView } from './BidsPreviewerView';

export class BidsPreviewerContainer extends Component {
	constructor (props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<BidsPreviewerView {...this.props}
				style={{
					width: '100%',
					height: '100%',
				}}
			/>
		);

	}
}

BidsPreviewerContainer.defaultProps = {
	bids: [{
		author: "Trayan Troev",
		created_at: '01-02-2020 21:34:00',
		amount: 2402,
		id: "1",
	}],
};