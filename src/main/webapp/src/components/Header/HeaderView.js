import React, {useState} from "react";
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";
import Col from "reactstrap/es/Col";
import Dropdown from "reactstrap/es/Dropdown";

export const HeaderView = (props) => {

    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed);

    return (
        <Navbar color="faded" light>
            <NavbarBrand href="/" className="mr-auto">HODINI Trader</NavbarBrand>
            <Col>
                {/*<Dropdown>*/}
                    <img src={props.loggedIn.avatarUrl
                        ? `http://localhost:8080/uploads/${props.loggedIn.avatarUrl}`
                        : "http://localhost:8080/uploads/no_avatar.png"}
                        className={'vt-avatar-img'}
                    />
                {/*</Dropdown>*/}

            </Col>
            <Col>{props.loggedIn.username}</Col>
            <Col>{`${props.loggedIn.name} ${props.loggedIn.surname}`}</Col>
            <NavbarToggler onClick={toggleNavbar} className="mr-2" />
            <Collapse isOpen={!collapsed} navbar>
                <Nav navbar>
                    <NavItem>
                        <NavLink onClick={props.onLoginClick} href={"#"}>Login</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={props.onHomeClick} href={"#"}>Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={props.onLogoutClick} href={"#"}>Logout</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    )
}