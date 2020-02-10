import React from 'react';
import {HeaderContainer} from "../Header/HeaderContainer";
import {LoginPageContainer} from "../LoginPage/LoginPageContainer";
import {OfferPrevContainer} from "../OfferPrev/OfferPrevContainer";
import {TAB_INDEXES} from "../../NavigationConstants/constants";
import {BidsPreviewerContainer} from "../BidsPreviewer/BidsPreviewerContainer";
import {UserPrevContainer} from "../UserPrev/UserPrevContainer";
import {UserEditContainer} from "../UserEdit/UserEditContainer";
import {OffersPreviewerContainer} from "../OffersPreviewer/OffersPreviewerContainer";
import {AllOffersPrevContainer} from "../AllOffersPrev/AllOffersPrevContainer";

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
                    { (props.viewIdx === TAB_INDEXES.OFFER_PREV || props.viewIdx === TAB_INDEXES.OFFER_EDIT) &&
                        <OfferPrevContainer
                            {...props}
                            style={{
                                position: 'relative',
                                padding: '0px',
                                width: `100%`,
                                height: `100%`,
                            }}
                        />
                    }
                    { props.viewIdx === TAB_INDEXES.USER_EDIT &&
                        <UserEditContainer
                            {...props}
                            style={{
                                position: 'relative',
                                padding: '0px',
                                width: `100%`,
                                height: `100%`,
                            }}
                        />
                    }
                    { props.viewIdx === TAB_INDEXES.USER_PREV &&
                        <UserPrevContainer
                            {...props}
                            style={{
                                position: 'relative',
                                padding: '0px',
                                width: `100%`,
                                height: `100%`,
                            }}
                        />
                    }
                    { props.viewIdx === TAB_INDEXES.MY_ACCOUNT &&
                        <UserPrevContainer
                            {...props}
                            style={{
                                position: 'relative',
                                padding: '0px',
                                width: `100%`,
                                height: `100%`,
                            }}
                        />
                    }
                    { props.viewIdx === TAB_INDEXES.MY_BIDS &&
                        <BidsPreviewerContainer
                            {...props}
                            style={{
                                margin: '0.5em',
                                height: '33%',
                                minHeight: `${window.innerHeight / 3}px`,
                                overflowY: 'auto',
                            }}
                        />
                    }
                    { props.viewIdx === TAB_INDEXES.MY_OFFERS &&
                        <OffersPreviewerContainer
                            {...props}
                            style={{
                                margin: '0.5em',
                                height: '33%',
                                minHeight: `${window.innerHeight / 3}px`,
                                overflowY: 'auto',
                            }}
                        />
                    }
                    { props.viewIdx === TAB_INDEXES.OFFERS_LIST &&
                        <AllOffersPrevContainer
                            {...props}
                            style={{
                                margin: '0.5em',
                                height: '33%',
                                minHeight: `${window.innerHeight / 3}px`,
                                overflowY: 'auto',
                            }}
                        />
                    }
                </div>
            );
        }
    }

};