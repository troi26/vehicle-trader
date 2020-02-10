import React from 'react';
import {Col, Container, Row, Table} from "reactstrap";
import {ApiErrorPrevView} from "../ApiErrorPrev/ApiErrorPrevView";
import Spinner from "reactstrap/es/Spinner";
import CardImg from "reactstrap/es/CardImg";
import Button from "reactstrap/es/Button";
import {BidInputView} from "../BidInput/BidInputView";

export const OfferPrevView = (props) => {

    return (
        <div
            style={props.style}
        >
            { props.error &&
                <ApiErrorPrevView
                    error={props.error}
                />
            }
            { props.loading &&
                <Spinner />
            }
            { props.offer &&
                <Container
                    className={'vt-offer-container'}
                >
                    <Container
                        className={'inner-container'}
                    >
                        <Row
                            className={'title-row'}
                        >
                            <Col
                                style={{
                                    fontWeight: 'bolder',
                                }}
                            >{props.offer.title}</Col>
                            <Col
                                style={{
                                    fontWeight: 'normal',
                                }}
                            ><b>Highest bid: </b>{props.highestBid ? props.highestBid : "There is still no bids"}</Col>
                        </Row>
                        <Row
                            className={'vt-margin'}
                        >
                            <Col
                                className={'img-prev'}
                            >
                                <CardImg
                                    // className={'vt-margins'}
                                    // src={'https://uni-carrent.com/data/ufiles/images/cars/image/large/ZAFIRA-1.jpg'}
                                    src={`http://localhost:8080/uploads/${props.offer.photoUrl
                                        ? props.offer.photoUrl
                                        : "NO_IMAGE.png" }`}
                                />
                            </Col>
                            <Col><Row
                                className={'vt-row'}
                            >
                                <Col><label
                                    className={'font-weight-bold'}
                                >Starting price: </label> {props.offer.startingPrice}</Col>
                                <Col><label
                                    className={'font-weight-bold'}
                                >Used/new: </label> {props.offer.usedStatus ? " Used" : " New"}</Col>
                                <Col><label
                                    className={'font-weight-bold'}
                                >Transmission: </label> {props.offer.transmissionType}</Col>
                                <Col></Col>
                            </Row>
                                <Row
                                    className={'vt-row'}
                                >
                                    <Col><label
                                        className={'font-weight-bold'}
                                    >Run: </label> {props.offer.kmRun}</Col>
                                    <Col><label
                                        className={'font-weight-bold'}
                                    >Date of manuf: </label> {new Date(props.offer.manufactured)
                                        .toLocaleDateString()}</Col>
                                    <Col><label
                                        className={'font-weight-bold'}
                                    >Fuel: </label> {props.offer.engineType}</Col>
                                    <Col><label
                                        className={'font-weight-bold'}
                                    >hp: </label> {props.offer.horsePower ? props.offer.horsePower : "NA"}</Col>
                                </Row>
                                <Row
                                    className={'vt-row'}>
                                    <Col><label
                                        className={'font-weight-bold'}
                                    >Brand: </label> {props.offer.brand}</Col>
                                    <Col><label
                                        className={'font-weight-bold'}
                                    >Model/modification: </label> {props.offer.model}</Col>
                                    <Col></Col>
                                    <Col></Col>
                                </Row>
                                <Row
                                    className={'vt-row'}>
                                    <Col><label
                                        className={'font-weight-bold'}
                                    >Climatic: </label> {props.offer.climatic ? "Included" : "Excluded"}</Col>
                                    <Col><label
                                        className={'font-weight-bold'}
                                    >Leather: </label> {props.offer.leatherSeats ? "Included" : "Excluded"}</Col>
                                    <Col><label
                                        className={'font-weight-bold'}
                                    >El windows: </label> {props.offer.electronicWindows ? "Included" : "Excluded"}</Col>
                                    <Col><label
                                        className={'font-weight-bold'}
                                    >El mirrors: </label> { props.offer.electronicMirrors ? "Included" : "Excluded"}</Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <label
                                className={'font-weight-bold'}
                            >Author:</label>
                            <Row
                                className={'vt-row'}>
                                <Col><label
                                    className={'font-weight-bold'}
                                >Name: </label> {props.author
                                    ? props.author.name
                                    : "This offer may be unavailable. Reload to check."}</Col>
                                { props.author &&
                                    <Col><label
                                        className={'font-weight-bold'}
                                    >Surname: </label> {props.author.surname}</Col>
                                }
                                { props.author &&
                                    <Col><label
                                        className={'font-weight-bold'}
                                    >Email: </label> {props.author.email}</Col>
                                }
                            </Row>
                        </Row>
                        <Row>
                            {props.loggedIn.id !== props.offer.userId && !props.bidding &&
                                <Button
                                    onClick={(event) => props.onBidOfferAttempt(props.offer, event)}
                                >
                                    Bid
                                </Button>
                            }
                            {props.loggedIn.id === props.offer.userId && props.bids.length === 0 &&
                            // TODO: Check if bid is already submitted and disable editing!
                                <Button
                                    onClick={(event) => props.onEditAttempt(props.offer, event)}
                                >
                                    Edit
                                </Button>
                            }
                                {/*<Button
                                    onClick={(event) => props.onBackClick(event)}
                                >
                                    Back
                                </Button>*/}
                            { props.bidding && props.loggedIn.id !== props.offer.userId &&
                                <BidInputView
                                    style={props.style}
                                    offer={props.offer}
                                    value={props.bidValue}
                                    logged={props.loggedIn}
                                    onValueChange={props.onBidValueChange}
                                    onSubmitBid={props.onSubmitBid}
                                />
                            }

                        </Row>
                    </Container>
                    <Row
                        className={'vt-bottom-row'}
                    >
                        <Col>
                            <label
                                className={'font-weight-bold'}
                            >Published on: </label>
                            {` ${props.offer.created_at.toLocaleString()}`}
                        </Col>
                        <Col>
                            <label
                                className={'font-weight-bold'}
                            >Last modified on: </label>
                            {` ${props.offer.modified_at.toLocaleString()}`}
                        </Col>
                    </Row>
                </Container>
            }

        </div>
    );
};



// private LocalDateTime created_at = LocalDateTime.now();
// private LocalDateTime modified_at = LocalDateTime.now();
// @URL
// private String photoUrl;