import React from 'react';
import { Table } from "reactstrap";

export const OffersPreviewerView = (props) => {
    console.log(props.offers);

    return (
        <div
            style={props.style}
        >

            <Table striped>
                <caption>Offers</caption>
                <thead className="thead-dark">
                <tr>
                    <th>#</th>
                    <th>UserId</th>
                    <th>Published at</th>
                    <th>Last mod. at</th>
                    <th>Run in (km)</th>
                    <th>Climatic</th>
                    <th>Leather seat</th>
                    <th>Electric windows</th>
                    <th>Electric mirrors</th>
                    <th>Horse power</th>
                    <th>Photo</th>
                    <th>Starting price</th>
                    <th>Transmission type</th>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Manufactured Year</th>
                </tr>
                </thead>
                <tbody>
                { props.offers.map((offer, idx) =>
                    <tr
                        key={`offer-row-${offer.id}`}
                    >
                        <th scope="row">{idx + 1}</th>
                        <td>{offer.userId}</td>
                        <td>{offer.created_at}</td>
                        <td>{offer.modified_at}</td>
                        <td>{offer.kmRun < 0 ? "N/A" : offer.kmRun}</td>
                        <td>{offer.climatic ? "included" : "excluded"}</td>
                        <td>{offer.leatherSeats ? "included" : "excluded"}</td>
                        <td>{offer.electronicWindows ? "included" : "excluded"}</td>
                        <td>{offer.electronicMirrors ? "included" : "excluded"}</td>
                        <td>{offer.horsePower < 0 ? "N/A" : offer.horsePower}</td>
                        <td>{!offer.photoUrl ? "N/A" : offer.photoUrl}</td>
                        <td>{!offer.startingPrice ? "N/A" : offer.startingPrice}</td>
                        <td>{!offer.transmissionType ? "N/A" : offer.transmissionType}</td>
                        <td>{!offer.brand ? "N/A" : offer.brand}</td>
                        <td>{!offer.model ? "N/A" : offer.model}</td>
                        <td>{!offer.manufactured ? "N/A" : offer.manufactured}</td>
                    </tr>)
                }
                </tbody>
            </Table>
        </div>
    );
};