import React from "react";
import {HeaderContainer} from "../Header/HeaderContainer";
import {LoginFormContainer} from "../LoginForm/LoginFormContainer";
import {LoginFormView} from "../LoginForm/LoginFormView";

export const LoginPageView = (props) => {
    return (
        <div>
            <LoginFormContainer {...props}/>
        </div>
    );
}