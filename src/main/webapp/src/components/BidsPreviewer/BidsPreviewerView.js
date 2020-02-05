import React from 'react';

export const BidsPreviewerView = (props) => {
	console.log(props.bids);
	return (
		<div style={props.style}>
			{props.bids.map(bid =>
				<div
					key={`bid-${bid.id}`}
				>{bid.author}</div>)
			}
		</div>
	);
};