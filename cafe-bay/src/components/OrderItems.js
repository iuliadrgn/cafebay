import React from "react";
import IndividualOrderItem from "./IndividualOrderItem";

export default function OrderItems({cartProducts, cartProductIncrease, cartProductDecrease}){
    return cartProducts.map((cartProduct)=>(
        <IndividualOrderItem key={cartProduct.ID} cartProduct={cartProduct}
                             cartProductIncrease={cartProductIncrease}
                             cartProductDecrease={cartProductDecrease}/>
    ))
}