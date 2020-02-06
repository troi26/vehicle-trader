import React from 'react';
import { Table } from "reactstrap";

export const OffersPreviewerView = (props) => {
    console.log(props.offers);

    return (
        <div
            style={props.style}
        >

            <Table striped>
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
                    </tr>)
                }
                </tbody>
            </Table>
        </div>
    );
};