import React from 'react';
import {Button, Table} from "reactstrap";
import {buildDatesFromArray} from "../../DateParsers/DateParser";

export const BidsPreviewerView = (props) => {

	return (
		<div
			style={{
				...props.style,
				margin: '0.5em',
			}}
		>

			<Table striped
				className={'vt-horiz-margin vt-horiz-margin'}
			>
				<caption>My bids</caption>
				<thead className="thead-dark">
				<tr>
					<th>#</th>
					<th>Offer Status</th>
					<th>Offer</th>
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
						<th scope="row"
						>{idx + 1}</th>
						<td
							className={bid.offer.activeStatus ? "vt-active-offer" : "vt-closed-offer"}>
							{bid.offer.activeStatus ? "Active offer" : "Closed offer"}</td>
						<td>{(bid.offer && bid.offer.title)
								? bid.offer.title.length > 40
									? `${bid.offer.title.substr(0, 40)}...`
									: bid.offer.title
								: "N/A"}<Button
							className={'vt-horiz-margin'}
							onClick={(event) => {
								console.log("OPEN OFFER: ", bid.offer);
								props.onOpenOfferClick(bid.offer, event)
							}}
						>Open</Button></td>
						<td>{buildDatesFromArray(bid.created_at).toLocaleString()}</td>
						<td>{buildDatesFromArray(bid.modified_at).toLocaleString()}</td>
						<td>{bid.value}</td>
					</tr>)
				}
				</tbody>
			</Table>
		</div>
	);
};