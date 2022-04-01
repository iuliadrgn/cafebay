import React from "react";
import styled from "styled-components";
import {coffees} from "../Data/CoffeeData";
import {Coffee, CoffeeGrid, CoffeeLabel} from "./CoffeeGrid";

const MenuStyled = styled.div`
border: 2px black;
height: 1000px;
margin: 15px 1000px 15px 20px;
`;

export function Menu({setOpenCoffee}){
return (
    <MenuStyled>
    {Object.entries(coffees).map(([sectionName, coffees]) => (
        <>
            <h1> {sectionName} </h1>
            <CoffeeGrid>
                {coffees.map(coffee => (
                <Coffee image={coffee.img}
                onClick={() => {
                    setOpenCoffee(coffee);
                }}>
                  <CoffeeLabel>{coffee.name}</CoffeeLabel>
                </Coffee>
            ))}
            </CoffeeGrid>
        </>
       ))}
    </MenuStyled>
    );
}

