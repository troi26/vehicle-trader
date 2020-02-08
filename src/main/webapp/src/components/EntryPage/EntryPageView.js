import React from 'react';
import {HeaderContainer} from "../Header/HeaderContainer";
import {LoginPageContainer} from "../LoginPage/LoginPageContainer";
import {BidsPreviewerContainer} from "../BidsPreviewer/BidsPreviewerContainer";
import {OffersPreviewerContainer} from "../OffersPreviewer/OffersPreviewerContainer";
import {UsersPreviewerContainer} from "../UsersPreviewer/UsersPreviewerContainer";

export const EntryPageView = (props) => {
    if (props.loading) {
        return (
            <div
                style={{
                    position: "absolute",
                    top: '50%',
                    width: '100%',
                    textAlign: 'center',
                }}
            >
                LOADING...
            </div>
        )
    } else {
        if (props.loggedIn === null) {
            return (
                <div
                    style={props.style}
                >
                    <HeaderContainer
                        {...props}
                    />
                    <LoginPageContainer
                        {...props}
                        onLogin={props.onLogin}
                    />
                </div>
            );
        } else {
            return (
                <div className="App inv-scroll" style={{
                    position: 'relative',
                    padding: '0px',
                    width: `100%`,
                    height: `100%`,
                }}>
                    <HeaderContainer
                        {...props}
                    />
                    <BidsPreviewerContainer
                        {...props}
                        style={{
                            margin: '0.5em',
                            minHeight: `${window.innerHeight / 3}px`,
                            height: '33%',
                            overflowY: 'auto',
                        }}/>
                    <OffersPreviewerContainer
                        {...props}
                        style={{
                            margin: '0.5em',
                            height: '33%',
                            minHeight: `${window.innerHeight / 3}px`,
                            overflowY: 'auto',
                        }}
                    />
                    <UsersPreviewerContainer
                        {...props}
                        style={{
                            margin: '0.5em',
                            height: '33%',
                            minHeight: `${window.innerHeight / 3}px`,
                            overflowY: 'auto',
                        }}
                    />
                </div>
            );
        }
    }

};