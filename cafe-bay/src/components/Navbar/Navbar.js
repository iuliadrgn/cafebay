import React from "react";
import styled from 'styled-components';
import {caramel} from "../../styles/colors";
import {Title} from "../../styles/titles";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

const NavbarStyled = styled.div`
background-color: ${caramel};
padding: 8px;
position: fixed;
width: 100%;
z-index: 999;
`
const Logo = styled(Title)`
font-size: 30px;
color: white;
text-shadow: 1px 2px black;
`;
const Login = styled(Title)`
font-size: 25px;
color: white;
position: absolute;
right: 60px;
top: 8px;
`;

const Cart = styled(Title)`
font-size: 25px;
color: white;
position: absolute;
right: 20px;
top: 8px;
`;

export function Navbar(){

    return <NavbarStyled>
     <Logo>
         Cafe Bay<span role="img" aria-label="coffee">☕</span>
     </Logo>
        <Login>login</Login>
        <Cart>🛒</Cart>
    </NavbarStyled>
}
