import React from "react";
import {Alert, Button, Col, Container, Form, FormGroup, Input, Label} from "reactstrap";

export const LoginFormView = (props) => {
    return (
        <Container className="App">
            <h2>Log In</h2>
            { props.loginErrors &&
                <Alert color="danger">
                    {props.loginErrors}
                </Alert>
            }

            <Form className="form" onSubmit={props.onSubmit}>
                <Col>
                    <FormGroup>
                        <Label>Username</Label>
                        <Input
                            type="username"
                            name="username"
                            id="username-input"
                            placeholder="Enter username"
                            value={props.username}
                            onChange={props.onUsernameChange}
                        />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            id="password-input"
                            placeholder="Enter password"
                            value={props.password}
                            onChange={props.onPasswordChange}
                        />
                    </FormGroup>
                </Col>
                <Button>Submit</Button>
            </Form>
        </Container>
    );
};