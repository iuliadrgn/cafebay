import React from "react";
import styled from "styled-components";
import {Title} from "../styles/titles";

export const CoffeeGrid = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
gap: 15px;
`
export const CoffeeLabel = styled.div`
position: absolute;
background-color: #ffffff6e;
padding: 5px;
`

export const Coffee = styled.div`
height: 250px;
width: 250px;
padding: 10px;
font-size: 20px;
background-image: ${({image}) => `url(${image});`}
background-size: cover;
background-position: center;
border-radius : 7px;
box-shadow: 0px 0px 3px 0px #542a1a;
&:hover {
cursor: pointer;
opacity: 0.7;
}
`