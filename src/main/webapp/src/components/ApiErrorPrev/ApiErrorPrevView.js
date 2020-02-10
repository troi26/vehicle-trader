import React from 'react';
import Alert from "reactstrap/es/Alert";

export const ApiErrorPrevView = (props) => {
    console.log(props.offers);

    return (
        <div
            style={props.style}
        >
            <Alert color="danger">
                {props.error}
            </Alert>
        </div>
    );
};