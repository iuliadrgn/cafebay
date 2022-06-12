import React from 'react'

import IndividualProduct from "./IndividualProduct";
import styled from "styled-components";
import {Coffee} from "./CoffeeGrid";

const MenuStyled = styled.div`
border: 2px black;
height: 1000px;
margin: 30px 100px 100px 100px;
`;

export const Products = ({product, addToCart}) => {

    return product?.map((individualProduct)=>(

        <IndividualProduct key = {individualProduct.ID} individualProduct={individualProduct}
        addToCart={addToCart}
        />

    )

    )
}