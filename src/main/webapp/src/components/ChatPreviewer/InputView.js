import React from "react";
import { Button, Input, Form} from 'reactstrap';

export const InputView = (props) => {
    return (
        <Form onSubmit = {props.handleSend}>
            <Input type="textarea" name="text" id="messageToSend" />
            <Button >Send</Button>
        </Form>
        
    );
};