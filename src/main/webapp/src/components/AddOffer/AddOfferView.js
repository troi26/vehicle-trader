import React from 'react';
import {Col, Container, FormFeedback, FormGroup, Label, Row, Table} from "reactstrap";
import {ApiErrorPrevView} from "../ApiErrorPrev/ApiErrorPrevView";
import Spinner from "reactstrap/es/Spinner";
import CardImg from "reactstrap/es/CardImg";
import Button from "reactstrap/es/Button";
import Input from "reactstrap/es/Input";
import DatePicker from "react-datepicker/es";
import "react-datepicker/dist/react-datepicker.css";

export const AddOfferView = (props) => {
    const errorFields = Object.keys(props.errors);
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
                                width: "100%",
                            }}
                        >
                            <FormGroup check>
                                <Label check
                                       className={'vt-full-width'}
                                >
                                    <Input
                                        type={'text'}
                                        value={props.offer.title}
                                        name={'title'}
                                        onChange={props.onSetTextField}
                                        invalid={errorFields.includes("title")}
                                    />
                                    { errorFields.includes("title") &&
                                    <FormFeedback
                                        style={{
                                            fontSize: '0.5em',
                                        }}
                                    >{props.errors["title"]}</FormFeedback>
                                    }
                                </Label>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Row
                                className={'vt-row'}
                            >
                                <Col>
                                    <legend className="font-weight-bold col-form-label col-sm-12">Starting price: </legend>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                type={'number'}
                                                name={"startingPrice"}
                                                min={0}
                                                value={props.offer.startingPrice}
                                                onChange={props.onSetNumberField}
                                                invalid={errorFields.includes("startingPrice")}
                                            />
                                            { errorFields.includes("startingPrice") &&
                                            <FormFeedback>{props.errors["startingPrice"]}</FormFeedback>
                                            }
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <legend className="font-weight-bold col-form-label col-sm-12">Used/new: </legend>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                type={'radio'}
                                                value={"Used"}
                                                name={'usedStatus'}
                                                checked={props.offer.usedStatus}
                                                onChange={() => props.onChangeRadio({
                                                    target: {
                                                        name: "usedStatus",
                                                        value: true,
                                                    }
                                                })}
                                            />{'Used'}
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                type={'radio'}
                                                value={"New"}
                                                name={'usedStatus'}
                                                checked={!props.offer.usedStatus}
                                                onChange={() => props.onChangeRadio({
                                                    target: {
                                                        name: "usedStatus",
                                                        value: false,
                                                    }
                                                })}
                                            />{'New'}
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <legend className="font-weight-bold col-form-label col-sm-12">Transmission: </legend>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                type={'radio'}
                                                value={"AUTO"}
                                                name={'transmissionType'}
                                                checked={props.offer.transmissionType === "AUTO"}
                                                onChange={props.onChangeRadio}
                                            /> {'Auto'}
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                type={'radio'}
                                                value={"MANUAL"}
                                                name={'transmissionType'}
                                                checked={props.offer.transmissionType === "MANUAL"}
                                                onChange={props.onChangeRadio}
                                            /> {'Manual'}
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col></Col>
                            </Row>
                            <Row
                                className={'vt-row'}
                            >
                                <Col>
                                    <legend className="font-weight-bold col-form-label col-sm-12">Run (km): </legend>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                type={'number'}
                                                name={"kmRun"}
                                                min={0}
                                                value={props.offer.kmRun}
                                                onChange={props.onSetNumberField}
                                                invalid={errorFields.includes("kmRun")}
                                            />
                                            { errorFields.includes("kmRun") &&
                                            <FormFeedback>{props.errors["kmRun"]}</FormFeedback>
                                            }
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <legend className="font-weight-bold col-form-label col-sm-12">Manuf. date: </legend>
                                    <FormGroup check>
                                        <Label check>
                                            <DatePicker
                                                selected={props.offer.manufactured
                                                    ? props.offer.manufactured
                                                    : new Date()}
                                                onChange={props.onChangeManufactDate}
                                            />
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <legend className="font-weight-bold col-form-label col-sm-12">Fuel: </legend>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                type={'radio'}
                                                value={"Diesel"}
                                                name={'engineType'}
                                                checked={props.offer.engineType === "Diesel"}
                                                onChange={props.onChangeRadio}
                                            /> {'Diesel'}
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                type={'radio'}
                                                value={"Gasoline"}
                                                name={'engineType'}
                                                checked={props.offer.engineType === "Gasoline"}
                                                onChange={props.onChangeRadio}
                                            /> {'Gasoline'}
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                type={'radio'}
                                                value={"GasolineG"}
                                                name={'engineType'}
                                                checked={props.offer.engineType === "GasolineG"}
                                                onChange={props.onChangeRadio}
                                            /> {'Gasoline + gas'}
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <legend className="font-weight-bold col-form-label col-sm-12">HP: </legend>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                type={'number'}
                                                name={"horsePower"}
                                                min={0}
                                                value={props.offer.horsePower}
                                                onChange={props.onSetNumberField}
                                                invalid={errorFields.includes("horsePower")}
                                            />
                                            { errorFields.includes("horsePower") &&
                                            <FormFeedback>{props.errors["horsePower"]}</FormFeedback>
                                            }
                                        </Label>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row
                                className={'vt-row'}
                            >
                                <Col>
                                    <legend className="font-weight-bold col-form-label col-sm-12">Brand: </legend>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                type={'text'}
                                                name={"brand"}
                                                value={props.offer.brand}
                                                onChange={props.onSetTextField}
                                                invalid={errorFields.includes("brand")}
                                            />
                                            { errorFields.includes("brand") &&
                                            <FormFeedback>{props.errors["brand"]}</FormFeedback>
                                            }
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <legend className="font-weight-bold col-form-label col-sm-12">Model: </legend>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                type={'text'}
                                                name={"model"}
                                                value={props.offer.model}
                                                onChange={props.onSetTextField}
                                                invalid={errorFields.includes("model")}
                                            />
                                            { errorFields.includes("model") &&
                                            <FormFeedback>{props.errors["model"]}</FormFeedback>
                                            }
                                        </Label>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row
                                className={'vt-row'}
                            >
                                <Col>
                                    <legend className="font-weight-bold col-form-label col-sm-12">Climatic: </legend>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                type={'checkbox'}
                                                checked={props.offer.climatic}
                                                name={'climatic'}
                                                value={props.offer.climatic}
                                                onChange={props.onChangeIncludedExcluded}
                                            /> {'Included'}
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <legend className="font-weight-bold col-form-label col-sm-12">Leather: </legend>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                type={'checkbox'}
                                                checked={props.offer.leatherSeats}
                                                name={'leatherSeats'}
                                                value={props.offer.leatherSeats}
                                                onChange={props.onChangeIncludedExcluded}
                                            /> {'Included'}
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <legend className="font-weight-bold col-form-label col-sm-12">El. windows: </legend>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                type={'checkbox'}
                                                checked={props.offer.electronicWindows}
                                                name={'electronicWindows'}
                                                value={props.offer.electronicWindows}
                                                onChange={props.onChangeIncludedExcluded}
                                            /> {'Included'}
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <legend className="font-weight-bold col-form-label col-sm-12">El. mirrors: </legend>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                type={'checkbox'}
                                                checked={props.offer.electronicMirrors}
                                                name={'electronicMirrors'}
                                                value={props.offer.electronicMirrors}
                                                onChange={props.onChangeIncludedExcluded}
                                            /> {'Included'}
                                        </Label>
                                    </FormGroup>
                                </Col>

                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Button
                            onClick={(event) => props.onSubmit(props.offer, event)}
                        >
                            Submit
                        </Button>
                    </Row>
                </Container>
            </Container>
            }

        </div>
    );
};

AddOfferView.defaultProps = {
    onSubmitOffer: (offer, event) => {console.log(offer)},
};



// private LocalDateTime created_at = LocalDateTime.now();
// private LocalDateTime modified_at = LocalDateTime.now();
// @URL
// private String photoUrl;