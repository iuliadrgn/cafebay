import React from "react";
import styled from "styled-components";
import {coffees} from "../Data/CoffeeData";
import {Coffee, CoffeeGrid, CoffeeLabel} from "./CoffeeGrid";

const MenuStyled = styled.div`
border: 2px black;
height: 1000px;
margin: 15px 1000px 15px 20px;
`

export function Menu(){
return <MenuStyled>
    <h1>Menu</h1>
    <CoffeeGrid>
    {coffees.map(coffee => (
        <Coffee image={coffee.img}>
            <CoffeeLabel>
                {coffee.name}
            </CoffeeLabel>
          </Coffee>
    ))}
    </CoffeeGrid>

</MenuStyled>
}