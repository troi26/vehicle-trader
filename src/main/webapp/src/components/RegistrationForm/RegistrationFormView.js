import React from 'react';
import {Col, Container, FormFeedback, FormGroup, FormText, Input, Label, Table} from "reactstrap";
import Button from "reactstrap/es/Button";
import Form from "reactstrap/es/Form";

export const RegistrationFormView = (props) => {
    console.log(props.roles);
    const errorFields = Object.keys(props.errors);
    return (
        <div
            style={props.style}
        ><Form
            id={"vt-reg-form"}
            className={'vt-margin-auto'}
            onSubmit={props.onRegisterSubmit}
            target={"#"}
            action={"#"}
        >
            <h2>Sign up</h2>
            {/*<FormGroup
                className={'vt-margin-auto'}>
                <Label for="avatarUrl">File</Label>
                <Input type="file" name="avatarUrl" id="regAvatarUrl"
                       onChange={props.onUploadNewAvatar}
                /><Row
                    className={'vt-margin img-prev'}>
                    <CardImg
                        className={'vt-margin img-prev'}
                        src={`http://localhost:8080/uploads/${props.avatarUrl
                            ? props.avatarUrl
                            : "NO_IMAGE.png"}`}
                        alt={'Upload image'}
                    />
                </Row>
                <FormText color="muted">
                    Avatar can not be larger than 2MB
                </FormText>
            </FormGroup>*/}
            <FormGroup>
                <Label for="username">Username</Label>
                <Input type="text" name="username" id="regUsername" placeholder="Type in a username"
                    value={props.credentials.username}
                       onChange={props.onChangeTextField}
                       invalid={errorFields.includes("username")}
                />
                { errorFields.includes("username") &&
                    <FormFeedback>{props.errors["username"]}</FormFeedback>
                }
            </FormGroup>
            <FormGroup>
                <Label for="name">Name</Label>
                <Input type="text" name="name" id="regName" placeholder="Type in your Name"
                       value={props.credentials.name}
                       onChange={props.onChangeTextField}/>
            </FormGroup>
            <FormGroup>
                <Label for="surname">Surname</Label>
                <Input type="text" name="surname" id="regSurname" placeholder="Type in your Surname"
                       value={props.credentials.surname}
                       onChange={props.onChangeTextField}/>
            </FormGroup>
            <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" name="email" id="regEmail" placeholder="Type in a valid email"
                       value={props.credentials.email}
                       onChange={props.onChangeTextField}/>
            </FormGroup>
            <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="regPassword" placeholder="Type in your desired password"
                       value={props.credentials.password}
                       onChange={props.onChangeTextField}
                       invalid={errorFields.includes("password")}
                />
                { errorFields.includes("password") &&
                    <FormFeedback>{props.errors["password"]}</FormFeedback>
                }
                <FormText color="muted">
                    Password must contain at least one of lowercase, uppercase, digit, symbol(%,&,$,#)
                    and at least 6 characters long
                </FormText>
            </FormGroup>
            <FormGroup>
                <Label for="cashAmount">Deposit</Label>
                <Input type="number" name="cashAmount" id="regDebit" placeholder="Enter your starting deposit"
                       value={props.credentials.cashAmount}
                       onChange={props.onChangeNumberFieldHandler}/>
                <FormText color="muted">
                    This is the cash amount your account may be start with
                </FormText>
            </FormGroup>
            <FormGroup>
                <legend>Radio Buttons</legend>
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="roles" value={"ROLE_ADMIN"} onChange={props.onRadioButtonChange}
                               checked={props.credentials.roles === "ROLE_ADMIN"} />{'Admin'}
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="roles" value={"ROLE_DEALER"} onChange={props.onRadioButtonChange}
                               checked={props.credentials.roles === "ROLE_DEALER"} />{'Dealer'}
                    </Label>
                </FormGroup>
                <FormGroup check disabled>
                    <Label check>
                        <Input type="radio" name="roles" value={"ROLE_BIDDER"} onChange={props.onRadioButtonChange}
                               checked={props.credentials.roles === "ROLE_BIDDER"} />{'Bidder'}
                    </Label>
                </FormGroup>
            </FormGroup>
            {/*<FormGroup>
                <Label for="exampleSelect">Select</Label>
                <Input type="select" name="select" id="exampleSelect">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </Input>
            </FormGroup>*/}
           {/* <FormGroup tag="fieldset">
                <legend>Radio Buttons</legend>
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="radio1" />{' '}
                        Option one is this and that—be sure to include why it's great
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="radio1" />{' '}
                        Option two can be something else and selecting it will deselect option one
                    </Label>
                </FormGroup>
                <FormGroup check disabled>
                    <Label check>
                        <Input type="radio" name="radio1" disabled />{' '}
                        Option three is disabled
                    </Label>
                </FormGroup>
            </FormGroup>
            <FormGroup check>
                <Label check>
                    <Input type="checkbox" />{' '}
                    Check me out
                </Label>
            </FormGroup>*/}
            <Button type={"submit"}>Submit</Button>
        </Form>
        </div>
    );
};