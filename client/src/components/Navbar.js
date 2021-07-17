import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/custom.scss";
import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

const Navigationbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="yellow" light expand="md">
        <NavbarBrand href="/">명지대 총동아리연합회</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem className="dropdown">
              <NavLink href="#">총동연 소개</NavLink>
              <div className="dropdown-submenu1">
                <a href="#none">ALL</a>
                <a href="#none">OTHER</a>
                <a href="#none">HIGHLIGHT</a>
              </div>
            </NavItem>
            <NavItem className="dropdown">
              <NavLink href="#">동아리 소개</NavLink>
              <div className="dropdown-submenu1">
                <a href="#none">ALL</a>
                <a href="#none">OTHER</a>
                <a href="#none">HIGHLIGHT</a>
              </div>
            </NavItem>
            <NavItem>
              <NavLink href="#">동아리 홍보</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">시설대관</NavLink>
            </NavItem>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle>문의사항</DropdownToggle>
              <DropdownMenu>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Button color="warning">Sign up</Button>{" "}
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Navigationbar;
