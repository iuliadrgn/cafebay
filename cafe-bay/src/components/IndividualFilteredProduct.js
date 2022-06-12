import React from "react";
import {formatPrice} from "./CoffeeData";

export default function IndividualFilteredProduct({individualFilteredProduct, addToCart}){

    const handleAddToCart=()=>{
        addToCart(individualFilteredProduct);
    }

    return (
        <div className='product'>
            <div className='product-img'>
                <img src={individualFilteredProduct.url} alt="product-img"/>
            </div>
            <div className='product-text title'>{individualFilteredProduct.productName}</div>
            <div className='product-text price'>{formatPrice(individualFilteredProduct.price)}</div>
            <div className='btn btn-danger btn-md cart-btn' onClick={handleAddToCart}>add to order</div>
        </div>
    )
}