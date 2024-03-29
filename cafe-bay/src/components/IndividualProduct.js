import React from 'react'
import {Coffee, CoffeeGrid, CoffeeLabel} from "./CoffeeGrid";
import {formatPrice} from "./CoffeeData";
import styled from "styled-components";

export default function IndividualProduct({individualProduct, addToCart}){

    const handleAddToCart = () => {
        addToCart(individualProduct)
    }
    return (
            <div className='product'>
                <CoffeeLabel>
                    <div className='product-text title'>{individualProduct.productName}</div>
                    <div className='product-text price'>{formatPrice(individualProduct.price)}</div>
                </CoffeeLabel>
                <img src={individualProduct.url} alt="product-img"/>
                <div className='product-text description'>{individualProduct.description}</div>

            <div className='btn btn-danger btn-md cart-btn btn-box' onClick={handleAddToCart}>add to order</div>
            </div>

    )
}