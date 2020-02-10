import React from 'react';
import { Table } from "reactstrap";
import {buildDatesFromArray} from "../../DateParsers/DateParser";
import Button from "reactstrap/es/Button";

export const AllOffersPrevView = (props) => {
    console.log(props.offers);

    return (
        <div
            style={props.style}
        >

            <Table striped>
                <caption>My offers</caption>
                <thead className="thead-dark">
                <tr>
                    <th>#</th>
                    <td>Options</td>
                    <th>Author</th>
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
                    { props.offers.map((offer, idx) => {
                        console.log("userID: ", offer.userId);
                        const author = props.authors.filter(auth => auth.id === offer.userId)[0];
                        return (
                            <tr
                                key={`offer-row-${offer.id}`}
                            >
                                <th scope="row">{idx + 1}</th>
                                <td><Button
                                    className={'vt-horiz-margin'}
                                    onClick={(event) => props.onOpenOfferClick(offer, event)}
                                >
                                    Open
                                </Button></td>
                                <td>{`${author.name} ${author.surname}`}</td>
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
                            </tr>
                        );
                    })
                }
                </tbody>
            </Table>
        </div>
    );
};