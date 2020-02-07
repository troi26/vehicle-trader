import React, {useState} from "react";
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";

export const HeaderView = (props) => {

    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed);

    return (
        <Navbar color="faded" light>
            <NavbarBrand href="/" className="mr-auto">reactstrap</NavbarBrand>
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