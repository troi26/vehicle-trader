import React from 'react';
import {Badge, Table} from "reactstrap";
import {buildDatesFromArray} from "../../DateParsers/DateParser";
import Button from "reactstrap/es/Button";

export const OffersPreviewerView = (props) => {
    console.log(props.offers);

    return (
        <div
            style={props.style}
        >
            <Button
                className={"vt-margin"}
                color={"warning"}
                onClick={props.openAddOffer}
            >Add offer</Button>
            <Table striped>
                <caption>My offers</caption>
                <thead className="thead-dark">
                <tr>
                    <th>#</th>
                    <td>Options</td>
                    <th>Published at</th>
                    <th>Last mod. at</th>
                    <th>Photo</th>
                    <th>Starting price</th>
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
                        <td>
                            {!offer.activeStatus &&
                                <Badge color="danger" pill>Closed</Badge>
                            }
                            <Button
                            className={'vt-horiz-margin'}
                            onClick={(event) => props.onOpenOfferClick(offer, event)}
                        >
                            Open
                        </Button></td>
                        <td>{buildDatesFromArray(offer.created_at).toLocaleString()}</td>
                        <td>{buildDatesFromArray(offer.modified_at).toLocaleString()}</td>
                        {!offer.photoUrl &&
                        <td>{"N/A"}</td>
                        }
                        {offer.photoUrl &&
                        <td><img
                            className={'offer-small-img'}
                            src={`http://localhost:8080/uploads/${offer.photoUrl}`} /></td>
                        }
                        <td>{!offer.startingPrice ? "N/A" : offer.startingPrice}</td>
                        <td>{!offer.brand ? "N/A" : offer.brand}</td>
                        <td>{!offer.model ? "N/A" : offer.model}</td>
                        <td>{offer.manufactured
                            ? buildDatesFromArray(offer.manufactured, true).toLocaleDateString()
                            : "N/A"}</td>
                    </tr>)
                }
                </tbody>
            </Table>
        </div>
    );
};