import React from 'react'
import {Coffee, CoffeeGrid, CoffeeLabel} from "./CoffeeGrid";
import {formatPrice} from "./CoffeeData";
import styled from "styled-components";

export default function IndividualProduct({individualProduct, addToCart}){
   // console.log(individualProduct);
    const handleAddToCart=()=>{
        addToCart(individualProduct)
    }
    return (
            <Coffee>
                <CoffeeLabel>
                    <div className='product-text productName'>{individualProduct.productName}</div>
                    <div className='product-text price'>{formatPrice(individualProduct.price)}</div>
                </CoffeeLabel>
                <img src={individualProduct.url} alt="product-img"/>
                <div className='product-text description'>{individualProduct.description}</div>

            <div className='btn btn-danger btn-md cart-btn' onClick={handleAddToCart}>add to order</div>
            </Coffee>

    )
}