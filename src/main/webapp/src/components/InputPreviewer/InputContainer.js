import React, { Component } from "react";
import {InputView} from "./InputView";

export class InputContainer extends Component{
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <InputView {...this.props}
            />
        );
    }
}

InputContainer.defaultProps = {

};