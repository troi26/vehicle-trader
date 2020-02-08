import React from "react";
import { Button, Input, Form} from 'reactstrap';

export const InputView = (props) => {
    return (
        <Form c onSubmit = {props.handleSend}>
            <Input className="vk-chat-form-input" type="textarea" name="text" id="messageToSend" />
            <Button className="vk-chat-form-button">Send</Button>
        </Form>
        
    );
};