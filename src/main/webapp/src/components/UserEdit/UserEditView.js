import React from 'react';
import {Col, Container, FormGroup, Label, Row, Table} from "reactstrap";
import {ApiErrorPrevView} from "../ApiErrorPrev/ApiErrorPrevView";
import Spinner from "reactstrap/es/Spinner";
import CardImg from "reactstrap/es/CardImg";
import Button from "reactstrap/es/Button";
import Input from "reactstrap/es/Input";
import "react-datepicker/dist/react-datepicker.css";

export const UserEditView = (props) => {
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
                                width: "100%",
                            }}
                        >
                            <FormGroup check>
                                <Label check
                                       className={'vt-full-width'}
                                >
                                    {`PROFILE EDITING`}
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
                                        src={`http://localhost:8080/uploads/${props.user.avatarUrl
                                            ? props.user.avatarUrl
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
                                    <legend className="font-weight-bold col-form-label col-sm-12">Username: </legend>
                                    <FormGroup check>
                                        <Label check
                                               className={'vt-full-width'}
                                        >{props.user.username}
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <legend className="font-weight-bold col-form-label col-sm-12">Email: </legend>
                                    <FormGroup check>
                                        <Label check
                                               className={'vt-full-width'}
                                        >
                                            <Input
                                                type={'text'}
                                                value={props.user.email}
                                                name={'email'}
                                                onChange={props.onChangeTextField}
                                            />
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <legend className="font-weight-bold col-form-label col-sm-12">Role: </legend>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                type={'radio'}
                                                value={"ROLE_ADMIN"}
                                                name={'roles'}
                                                checked={props.user.roles.replace("ROLE_", "") === "ADMIN"}
                                                onChange={props.onChangeRadioField}
                                            />{'Admin'}
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                type={'radio'}
                                                value={"ROLE_DEALER"}
                                                name={'roles'}
                                                checked={props.user.roles.replace("ROLE_", "") === "DEALER"}
                                                onChange={props.onChangeRadioField}
                                            />{'Dealer'}
                                        </Label>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row
                                className={'vt-row'}
                            >
                                <Col>
                                    <legend className="font-weight-bold col-form-label col-sm-12">Name: </legend>
                                    <FormGroup check>
                                        <Label check
                                               className={'vt-full-width'}
                                        >
                                            <Input
                                                type={'text'}
                                                value={props.user.name}
                                                name={'name'}
                                                onChange={props.onChangeTextField}
                                            />
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <legend className="font-weight-bold col-form-label col-sm-12">Surname: </legend>
                                    <FormGroup check>
                                        <Label check
                                               className={'vt-full-width'}
                                        >
                                            <Input
                                                type={'text'}
                                                value={props.user.surname}
                                                name={'surname'}
                                                onChange={props.onChangeTextField}
                                            />
                                        </Label>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Button
                            className={'vt-horiz-margin'}
                            onClick={(event) => props.onSubmitUser(props.user, event)}
                        >
                            Submit
                        </Button>
                        <Button
                            className={'vt-horiz-margin'}
                            onClick={(event) => props.onFinishUserEditClick(props.user.id, event)}
                        >
                            Close editing
                        </Button>
                    </Row>
                </Container>
            </Container>

        </div>
    );
};

UserEditView.defaultProps = {
    onSubmitUser: (user, event) => {console.log(user)},
};
