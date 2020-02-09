import React from 'react';
import {Col, Container, FormGroup, Label, Row, Table} from "reactstrap";
import {ApiErrorPrevView} from "../ApiErrorPrev/ApiErrorPrevView";
import Spinner from "reactstrap/es/Spinner";
import CardImg from "reactstrap/es/CardImg";
import Button from "reactstrap/es/Button";
import Input from "reactstrap/es/Input";
import DatePicker from "react-datepicker/es";
import "react-datepicker/dist/react-datepicker.css";

export const OfferEditView = (props) => {

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
                                        value={props.editedValues.title}
                                        name={'title'}
                                        onChange={props.onChangeTitle}
                                    />
                                </Label>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col
                            className={'img-prev'}
                        >
                            <Col>
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            type={'file'}
                                            onChange={props.onLoadNewImage}
                                        />
                                    </Label>
                                    <CardImg
                                        className={'vt-margin'}
                                        src={`http://localhost:8080/uploads/${props.editedValues.photoUrl
                                            ? props.editedValues.photoUrl
                                            : "NO_IMAGE.png"}`}
                                        alt={'Upload image'}
                                    />
                                </FormGroup>
                            </Col>

                        </Col>
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
                                                min={0}
                                                value={props.editedValues.startingPrice}
                                                onChange={props.onChangeStartPrice}
                                            />
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
                                                checked={props.editedValues.usedStatus}
                                                onChange={props.onChangeUseStatus}
                                            />{'Used'}
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                type={'radio'}
                                                value={"New"}
                                                name={'usedStatus'}
                                                checked={!props.editedValues.usedStatus}
                                                onChange={props.onChangeUseStatus}
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
                                                checked={props.editedValues.transmissionType === "AUTO"}
                                                onChange={props.onChangeTransmissionT}
                                            /> {'Auto'}
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                type={'radio'}
                                                value={"MANUAL"}
                                                name={'transmissionType'}
                                                checked={props.editedValues.transmissionType === "MANUAL"}
                                                onChange={props.onChangeTransmissionT}
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
                                                min={0}
                                                value={props.editedValues.kmRun}
                                                onChange={props.onChangeRun}
                                            />
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <legend className="font-weight-bold col-form-label col-sm-12">Manuf. date: </legend>
                                    <FormGroup check>
                                        <Label check>
                                            <DatePicker
                                                selected={props.editedValues.manufactured}
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
                                                checked={props.editedValues.engineType === "Diesel"}
                                                onChange={props.onChangeEngineT}
                                            /> {'Diesel'}
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                type={'radio'}
                                                value={"Gasoline"}
                                                name={'engineType'}
                                                checked={props.editedValues.engineType === "Gasoline"}
                                                onChange={props.onChangeEngineT}
                                            /> {'Gasoline'}
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                type={'radio'}
                                                value={"GasolineG"}
                                                name={'engineType'}
                                                checked={props.editedValues.engineType === "GasolineG"}
                                                onChange={props.onChangeEngineT}
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
                                                min={0}
                                                value={props.editedValues.horsePower}
                                                onChange={props.onChangeHorseP}
                                            />
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
                                                value={props.editedValues.brand}
                                                onChange={props.onChangeBrand}
                                            />
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <legend className="font-weight-bold col-form-label col-sm-12">Model: </legend>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                type={'text'}
                                                value={props.editedValues.model}
                                                onChange={props.onChangeModel}
                                            />
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
                                                checked={props.editedValues.climatic}
                                                name={'climatic'}
                                                value={props.editedValues.climatic}
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
                                                checked={props.editedValues.leatherSeats}
                                                name={'leatherSeats'}
                                                value={props.editedValues.leatherSeats}
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
                                                checked={props.editedValues.electronicWindows}
                                                name={'electronicWindows'}
                                                value={props.editedValues.electronicWindows}
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
                                                checked={props.editedValues.electronicMirrors}
                                                name={'electronicMirrors'}
                                                value={props.editedValues.electronicMirrors}
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
                            onClick={(event) => props.onSubmitOffer(props.editedValues, event)}
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

OfferEditView.defaultProps = {
    onSubmitOffer: (offer, event) => {console.log(offer)},
};



// private LocalDateTime created_at = LocalDateTime.now();
// private LocalDateTime modified_at = LocalDateTime.now();
// @URL
// private String photoUrl;