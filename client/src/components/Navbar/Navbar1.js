import React from 'react';
import Dropdown from './Dropdown';
import { 
    Nav, 
    NavLink, 
    Bars, 
    NavMenu, 
    NavBtn, 
    NavBtnLink 
} from './NavbarElements';

const Navbar1 = () => {
    return (
        <div>
          <Nav>
              <NavLink to="/">
                  <h1>명지대 총동아리연합회</h1>
              </NavLink>
              <Bars />
              <NavMenu>
                  <NavLink to='/about' activeStyle>
                      총동연 소개
                  </NavLink>
                  <NavLink to='/club' activeStyle>
                      동아리 소개
                  </NavLink>
                  <NavLink to='/club-promote' activeStyle>
                      동아리 홍보
                  </NavLink>
                  <NavLink to='/club-place' activeStyle>
                      시설대관
                  </NavLink>
                  <NavLink to='/sign-up' activeStyle>
                      Sign up
                  </NavLink>
              </NavMenu>
              <NavBtn>
                  <NavBtnLink to='/signin'>Sign In</NavBtnLink>
              </NavBtn>
          </Nav>  
        </div>
    );
};

export default Navbar1;