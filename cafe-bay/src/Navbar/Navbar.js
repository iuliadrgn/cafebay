import React from "react";
import styled from 'styled-components';
import {caramel} from "../styles/colors";
import {Title} from "../styles/titles";

const NavbarStyled = styled.div`
background-color: ${caramel};
padding: 15px;
`
const Logo = styled(Title)`
font-size: 30px;
color: white;
text-shadow: 1px 2px black;
`
export function Navbar(){
    return <NavbarStyled>
     <Logo>
         Cafe Bay☕
     </Logo>
    </NavbarStyled>
}
