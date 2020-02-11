import React from 'react';
import {Col, Container, Row, Table} from "reactstrap";
import {ApiErrorPrevView} from "../ApiErrorPrev/ApiErrorPrevView";
import Spinner from "reactstrap/es/Spinner";
import CardImg from "reactstrap/es/CardImg";
import Button from "reactstrap/es/Button";
import {TAB_INDEXES} from "../../NavigationConstants/constants";
import StarRatingComponent from "react-star-rating-component";

export const UserPrevView = (props) => {
    console.log(props);

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
                        >{'USER PROFILE'}</Col>
                    </Row>
                    <Row
                        className={'vt-margin'}
                    >
                        <Col
                            className={'img-prev'}
                        >
                            <CardImg
                                src={`http://localhost:8080/uploads/${props.user.avatarUrl
                                    ? props.user.avatarUrl
                                    : "no_avatar.png" }`}
                            />
                        </Col>
                        <Col>
                            <Row
                                className={'vt-row'}
                            >
                                <Col><label
                                    className={'font-weight-bold'}
                                >Username: </label> {props.user.username}</Col>
                                <Col><label
                                    className={'font-weight-bold'}
                                >E-mail: </label> {props.user.email}</Col>
                                <Col><label
                                    className={'font-weight-bold'}
                                >Role: </label> {props.user.roles.replace("ROLE_", "") === "ADMIN"
                                    ? "ADMIN"
                                    : props.user.roles.replace("ROLE_", "") === "DEALER"
                                        ? "DEALER"
                                        : "BIDDER"}
                                </Col>
                                <Col></Col>
                            </Row>
                            <Row
                                className={'vt-row'}
                            >
                                <Col><label
                                    className={'font-weight-bold'}
                                >Name: </label> {props.user.name}</Col>
                                <Col><label
                                    className={'font-weight-bold'}
                                >Surname: </label> {props.user.surname}</Col>
                                <Col><label
                                    className={'font-weight-bold'}
                                >Account: </label> {props.user.cashAmount}</Col>
                                <Col></Col>
                            </Row>
                            <Row
                                className={'vt-row'}
                            >
                                <Col>
                                    <h5>Overall rating:</h5>
                                    <StarRatingComponent
                                        name={`rate ${props.user.username}`}
                                        starCount={5}
                                        value={props.overallRating}
                                        editing={false}
                                    />
                                </Col>
                                { props.loggedIn.id !== props.user.id &&
                                    <Col>
                                        <h5>Rate:</h5>
                                        <StarRatingComponent
                                            name={`rate ${props.user.username}`}
                                            starCount={5}
                                            value={(() => {
                                                console.log(props.rating);
                                                return props.rating;
                                            })()}
                                            editing={true}
                                            onStarClick={props.onRateClick.bind(this)}
                                        />
                                    </Col>
                                }
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        { (props.viewIdx === TAB_INDEXES.MY_ACCOUNT || props.user.id === props.loggedIn.id)&&
                            <Button
                                className={'vt-horiz-margin'}
                                onClick={(event) => props.onBidsShowClick(props.user.id, event)}
                            >
                                Bids history
                            </Button>
                        }
                        { (props.viewIdx === TAB_INDEXES.MY_ACCOUNT || props.user.id === props.loggedIn.id) &&
                            props.user.roles !== "ROLE_BIDDER" &&
                            <Button
                                className={'vt-horiz-margin'}
                                onClick={(event) => props.onOffersShowClick(props.user.id, event)}
                            >
                                Offers history
                            </Button>
                        }
                        {/*TODO: Check if bid is already submitted and disable editing!*/}
                        { (props.loggedIn.id === props.user.id || props.loggedIn.roles === "ROLE_ADMIN") &&
                            <Button
                                className={'vt-horiz-margin'}
                                onClick={(event) => props.onEditAttempt(props.user.id, event)}
                            >
                            Edit account
                            </Button>
                        }
                        { (props.loggedIn.roles === "ROLE_ADMIN" && props.loggedIn.id !== props.user.id) &&
                            !props.user.active &&
                            <Button
                                color={"success"}
                                className={'vt-horiz-margin'}
                                onClick={(event) => props.onActivateAccClick(props.user.id, event)}
                            >
                                Activate account
                            </Button>
                        }
                        { (props.loggedIn.roles === "ROLE_ADMIN" && props.loggedIn.id !== props.user.id) &&
                            props.user.active &&
                            <Button
                                color={"danger"}
                                className={'vt-horiz-margin'}
                                onClick={(event) => props.onDeactivateAccClick(props.user.id, event)}
                            >
                                Deactivate account
                            </Button>
                        }
                    </Row>
                </Container>
            </Container>

        </div>
    );
};