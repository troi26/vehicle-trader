import React from 'react';
import {Col, Container, FormGroup, Label, Row, Table} from "reactstrap";
import {ApiErrorPrevView} from "../ApiErrorPrev/ApiErrorPrevView";
import Spinner from "reactstrap/es/Spinner";
import CardImg from "reactstrap/es/CardImg";
import Button from "reactstrap/es/Button";
import Input from "reactstrap/es/Input";
import DatePicker from "react-datepicker/es";
import "react-datepicker/dist/react-datepicker.css";

export const BidInputView = (props) => {

    return (
        <div
            style={props.style}
        >
            <Container
                className={'vt-offer-container'}
            >
                <Container
                    className={'inner-container'}
                >
                    <Row>
                        <Col
                            className={'vt-margin-auto'}
                        >
                            {/*<label>{props.offer.title}</label>*/}
                            <Col>
                                <Label check
                                       className={'vt-full-width'}
                                       style={{
                                           fontWeight: 'bolder',
                                       }}
                                >Bid value:</Label>
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            type={'number'}
                                            min={0}
                                            value={props.value}
                                            onChange={props.onValueChange}
                                        />
                                    </Label>
                                </FormGroup>
                                <Button
                                    className={'vt-margin'}
                                    onClick={(event) => props.onSubmitBid({
                                        value: props.value,
                                        offerId: props.offer.id,
                                        userId: props.logged.id,
                                    }, event)}
                                >
                                    Submit
                                </Button>
                            </Col>
                        </Col>
                    </Row>
                </Container>
            </Container>

        </div>
    );
};

BidInputView.defaultProps = {
    onSubmitBid: (bid, event) => {console.log(bid)},
};



// private LocalDateTime created_at = LocalDateTime.now();
// private LocalDateTime modified_at = LocalDateTime.now();
// @URL
// private String photoUrl;