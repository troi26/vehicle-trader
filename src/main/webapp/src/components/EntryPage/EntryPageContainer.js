import React, { Component } from 'react';

import {getAllUsers, getUserById} from '../../api/UsersFetchAPI';
import {EntryPageView} from "./EntryPageView";
import {getLoggedUser, login, logout} from "../../api/SecurityFetchAPI";

import "../../css/custom_styles.css";
import {TAB_INDEXES} from "../../NavigationConstants/constants";
import {FORUM_PAGES} from "../../NavigationConstants/ForumNavConsts";

export class EntryPageContainer extends Component {
    constructor (props) {
        super(props);

        this.state = {
            chatEn: true,
            forumEn: true,
            // loggedIn: {
            //     // id: '5e413dcdaf26cb6e279e4f4f',
            //     id: '5e3aeb10831f801e447e5eb1',
            //     // username: 'admin',
            //     // name: 'Admin',
            //     // surname: 'Adminov',
            //     // email: "admin@abv.bg",
            //     // cashAmount: 123000,
            //     // roles: "ROLE_ADMIN",
            //     // roles: "ROLE_DEALER",
            //     password: "",
            // },

            loggedIn: null,
            loading: false,

            viewIdx: TAB_INDEXES.OFFERS_LIST,

            tabProps: {
                // offerId: "5e3eb8b89f1baf3f988ac92d",
                // userId: "5e3aeb10831f801e447e5eb1",
                // chatReceiverId: "5e4147ac51f6c063ce31b1cb",
                offerId: "",
                userId: "",
                chatReceiverId: "",
                page: null,
            },

            loginErrors: null,

            // TODO GO BACK TO PREVIOUS VIEW
            viewTransitions: [],
        };

        this.interval = null;
    }

    showPagePosts (page) {
        console.log("showPagePosts", page);
        this.setState({
            viewIdx: FORUM_PAGES.POST_PREV,
            tabProps: {
                ...this.state.tabProps,
                page: page,
            },
        })
    }

    loadTestUser () {
        getUserById(this.state.loggedIn.id)
            .then(r => {
                if (r.status === 200) {
                    return r.json();
                }
                throw "User not found";
            })
            .then(resp => {
                this.setState({
                    loggedIn: {
                        ...resp,
                        ...this.state.loggedIn,
                    },
                })
            })
            .catch()
    }

    goBack () {
        this.setState({
            viewIdx: this.state.viewTransitions[this.state.viewTransitions.length - 1].viewIdx,
            tabProps: this.state.viewTransitions[this.state.viewTransitions.length - 1].tabProps,
        });
    }

    checkForSession () {
        getLoggedUser()
            .then((r) => r.status === 200
                ? r.json().then(this.setLoggedIn.bind(this))
                : r.json().then(this.setLoggedInToNull.bind(this)))
            .catch(reason => {
                this.setLoggedIn(null);
                console.log(reason);
            });
    }

    setLoggedIn (logged) {
        console.log("LOGGED: ", logged);
        this.setState({
            loggedIn: logged,
            loading: false,
            loginErrors: null,
        }, () => console.log(this.state.loginErrors));
    }

    showRegisterHandler () {
        this.setState({
            viewIdx: TAB_INDEXES.REGISTER_VIEW,
            loggedIn: null,
        });
    }

    showLoginHandler () {
        this.setState({
            viewIdx: TAB_INDEXES.LOGIN_VIEW,
            loggedIn: null,
        });
    }

    loginHandler (credentials, event) {
        login(event.target)
            .then((r) => r.status === 200
                ? r.json().then(this.setLoggedIn.bind(this))
                : r.json().then(this.setLoggedInToNull.bind(this)))
            .catch((reason) => console.log(reason));
    }

    setLoggedInToNull (response) {
        console.log("setLoggedInToNull", response);
        this.setState({
            loggedIn: null,
            loginErrors: response.exception,
        });
    }

    logoutHandler () {
        logout()
            .then(response => response.status === 200
                ? response.json().then(this.setLoggedInToNull.bind(this))
                : () => {console.log("LOGOUT FAILED")})
            .catch(reason => console.log(reason))
    }

    componentDidMount () {
        console.log("MOUNTING:");
        this.checkForSession();
        // if (this.state.loggedIn) this.loadTestUser();
    }

    componentWillUnmount() {

    }

    bidOfferClickHandler (offer) {
        this.setState({
            viewIdx: TAB_INDEXES.BID_ADDITION,
            tabProps: {
                offerId: offer.id,
            },
        });
    }

    editOfferClickHandler (offer) {
        this.setState({
            viewIdx: TAB_INDEXES.OFFER_EDIT,
            tabProps: {
                offerId: offer.id
            },
        });
    }

    submitOfferHandler (offer) {
        console.log("submitOfferHandler");
        this.setState({
            viewIdx: TAB_INDEXES.OFFER_PREV,
            tabProps: {
                ...this.state.tabProps,
                offerId: offer.id
            },
        }, () => {
            console.log(offer.id);
            console.log(this.state.offerId);
            console.log(offer.id);
        });
    }

    updateUserGloballyHandler (user) {
        this.setState({
            loggedIn: user,
        });
    }

    userEditClickHandler (userId) {
        this.setState({
            viewIdx: TAB_INDEXES.USER_EDIT,
            tabProps: {
                ...this.state.tabProps,
                userId: userId
            },
        });
    }

    userBidsShowClickHandler (userId) {
        this.setState({
            viewIdx: TAB_INDEXES.MY_BIDS,
            tabProps: {
                ...this.state.tabProps,
                userId: userId
            },
        });
    }

    userOffersShowClickHandler (userId) {
        this.setState({
            viewIdx: TAB_INDEXES.MY_OFFERS,
            tabProps: {
                ...this.state.tabProps,
                userId: userId
            },
        });
    }

    finishEditingUserHandler (userId) {
        console.log("onFinishUserEditClick");
        this.setState({
            viewIdx: TAB_INDEXES.USER_PREV,
            tabProps: {
                ...this.state.tabProps,
                userId: userId
            },
        });
    }

    openOfferHandler (offer) {
        console.log("OPEN Offer", offer);
        this.submitOfferHandler(offer);
    }


    showAccountInfoHandler () {
        console.log("LoggedID", this.state.loggedIn.id);
        this.setState({
            viewIdx: TAB_INDEXES.MY_ACCOUNT,
            tabProps: {
                ...this.state.tabProps,
                userId: this.state.loggedIn.id,
            },
        });
    }

    showAllOffersHandler () {
        console.log("showAllOffersHandler");
        this.setState({
            viewIdx: TAB_INDEXES.OFFERS_LIST,
        });
    }

    openMessengerHandler () {
        console.log("openMessengerHandler");
        this.setState({
            viewIdx: TAB_INDEXES.CHAT_VIEW,
        });
    }

    openForumHandler () {
        console.log("openForumHandler");
        this.setState({
            viewIdx: TAB_INDEXES.FORUM_VIEW,
        });
    }

    pendingAccountsShowHandler () {
        console.log("pendingAccountsShowClick");
        this.setState({
            viewIdx: TAB_INDEXES.PENDING_ACCOUNTS_LIST,
        });
    }

    allAccountsShowHandler () {
        console.log("allAccountsShowClick");
        this.setState({
            viewIdx: TAB_INDEXES.ALL_USERS_LIST,
        });
    }

    chatOpenHandler (userId) {
        console.log("chatOpenHandler");
        this.setState({
            viewIdx: TAB_INDEXES.CHAT_VIEW,
            tabProps: {
                ...this.state.tabProps,
                chatReceiverId: userId,
            },
        });
    }

    forumOpenHandler () {
        console.log("forumOpenHandler");
        this.setState({
            viewIdx: TAB_INDEXES.FORUM_VIEW,
        });
    }

    openUserProfile (userId) {
        this.setState({
            viewIdx: TAB_INDEXES.USER_PREV,
            tabProps: {
                ...this.state.tabProps,
                userId: userId,
            },
        })
    }

    navigateToNewOfferForm () {
        this.setState({
            viewIdx: TAB_INDEXES.ADD_OFFER,
        });
    }

    render() {

        return (
            <EntryPageView
                {...this.state}
                style={{
                    ...this.props.style,
                }}

                onUpdateUserGlobally={this.updateUserGloballyHandler.bind(this)}
                onBidOfferAttempt={this.bidOfferClickHandler.bind(this)}
                onEditAttempt={this.editOfferClickHandler.bind(this)}
                onSubmitOffer={this.submitOfferHandler.bind(this)}

                onShowRegister={this.showRegisterHandler.bind(this)}
                onShowLogin={this.showLoginHandler.bind(this)}
                onLogin={this.loginHandler.bind(this)}
                onLogout={this.logoutHandler.bind(this)}


                onUserEditClick={this.userEditClickHandler.bind(this)}
                onBidsShowClick={this.userBidsShowClickHandler.bind(this)}
                onOffersShowClick={this.userOffersShowClickHandler.bind(this)}
                onFinishUserEditClick={this.finishEditingUserHandler.bind(this)}

                onOpenOfferClick={this.openOfferHandler.bind(this)}

                onBackClick={this.goBack.bind(this)}

                onShowAccountInfoClick={this.showAccountInfoHandler.bind(this)}

                onOffersListShowClick={this.showAllOffersHandler.bind(this)}

                onOpenMessengerClick={this.openMessengerHandler.bind(this)}
                onOpenForumClick={this.openForumHandler.bind(this)}

                onPendingAccountsShowClick={this.pendingAccountsShowHandler.bind(this)}
                onAllAccountsShowClick={this.allAccountsShowHandler.bind(this)}

                onChatOpenClick={this.chatOpenHandler.bind(this)}
                onForumOpenClick={this.forumOpenHandler.bind(this)}


                onOpenUserProfile={this.openUserProfile.bind(this)}

                openAddOffer={this.navigateToNewOfferForm.bind(this)}

                onShowPagePosts={this.showPagePosts.bind(this)}

            />
        );

    }
}

EntryPageContainer.defaultProps = {
};