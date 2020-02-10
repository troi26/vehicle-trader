import React, {useState} from "react";
import {
    Collapse, DropdownItem, DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand, NavbarText,
    NavbarToggler,
    NavItem,
    NavLink,
    UncontrolledDropdown
} from "reactstrap";

export const HeaderView = (props) => {

    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">HOUDINI Trader</NavbarBrand>
                <NavbarToggler onClick={() => console.log()} />
                <Collapse isOpen={true} navbar>
                    <Nav className="mr-auto" navbar>
                        {/*<NavItem>*/}
                        {/*    <NavLink href="#">Home</NavLink>*/}
                        {/*</NavItem>*/}
                        <NavItem>
                            <NavLink href="#"
                                     onClick={props.onOffersListShowClick}>Browse offers</NavLink>
                        </NavItem>
                    </Nav>
                    <Nav className="mr-right" navbar>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                <img src={props.loggedIn.avatarUrl
                                    ? `http://localhost:8080/uploads/${props.loggedIn.avatarUrl}`
                                    : "http://localhost:8080/uploads/no_avatar.png"}
                                     className={'vt-avatar-img'}/*
                                     onClick={props.onShowAccountInfoClick}*/
                                />
                                {` ${props.loggedIn.username}`}
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem
                                    onClick={props.onShowAccountInfoClick}>
                                    {`${props.loggedIn.name} ${props.loggedIn.surname}`}
                                </DropdownItem>
                                <DropdownItem
                                    onClick={(event) => props.onOffersShowClick(props.loggedIn.id, event)}>
                                    My offers
                                </DropdownItem>
                                <DropdownItem
                                    onClick={(event) => props.onBidsShowClick(props.loggedIn.id, event)}>
                                    My bids
                                </DropdownItem>
                                <DropdownItem
                                    onClick={(event) => props.onOpenMessengerClick(props.loggedIn.id, event)}>
                                    Chat
                                </DropdownItem>
                                <DropdownItem
                                    onClick={(event) => props.onOpenForumClick(props.loggedIn.id, event)}>
                                    My posts
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem
                                    href={"http://localhost:8080/perform_logout"}
                                >
                                    Logout
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}