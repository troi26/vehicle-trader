import React from 'react';
import {Table} from "reactstrap";

export const BidsPreviewerView = (props) => {
	console.log(props.bids);
	return (
		<div
			style={props.style}
		>

			<Table striped>
				<thead className="thead-dark">
				<tr>
					<th>#</th>
					<th>Offer ID</th>
					<th>User ID</th>
					<th>Submitted At</th>
					<th>Last mod. at</th>
					<th>Value</th>
				</tr>
				</thead>
				<tbody>
				{ props.bids.map((bid, idx) =>
					<tr
						key={`bid-row-${bid.id}`}
					>
						<th scope="row">{idx + 1}</th>
						<td>{bid.offerId}</td>
						<td>{bid.userId}</td>
						<td>{bid.created_at}</td>
						<td>{bid.modified_at}</td>
						<td>{bid.value}</td>
					</tr>)
				}
				</tbody>
			</Table>
		</div>
	);
};