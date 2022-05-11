import React from "react";
import styled from "styled-components";
import {coffees} from "../../Data/CoffeeData";
import {Coffee, CoffeeGrid, CoffeeLabel} from "./CoffeeGrid";
import {formatPrice} from "../../Data/CoffeeData";

const MenuStyled = styled.div`
border: 2px black;
height: 1000px;
margin: 30px 100px 100px 100px;
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
                    <CoffeeLabel>
                        <div>{coffee.name}</div>
                        <div>{formatPrice(coffee.price)}</div>
                    </CoffeeLabel>
                </Coffee>
            ))}
            </CoffeeGrid>
        </>
       ))}
    </MenuStyled>
    );
}

