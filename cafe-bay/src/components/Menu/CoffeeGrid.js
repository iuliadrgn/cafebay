import React from "react";
import styled from "styled-components";

export const CoffeeGrid = styled.div`
display: grid;
margin-left: 5px;
grid-align: center;
grid-template-columns: repeat(5, 1fr);
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
margin-top:5px;
transition-property: box-shadow margin-top filter;
transition-duration: .1s
box-shadow: 0px 0px 3px 0px #542a1a;
&:hover {
cursor: pointer;
filter: contrast(80%);
margin-top: 0px;
box-shadow: 0px 0px 2px 0px #542a1a;
}
`