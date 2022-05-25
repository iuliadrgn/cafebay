import React from "react";
import Icon from "react-icons-kit";
import {plus} from 'react-icons-kit/feather/plus'
import {minus} from 'react-icons-kit/feather/minus'
import styled from "styled-components";
import {caramel} from "../styles/colors";
import {warm_white} from "../styles/colors";
import {formatPrice} from "./CoffeeData";
import {auth, fs} from "../contexts/firebase";


const IncrementButton = styled.div`
width: 23px;
color: ${caramel};
font-size: 20px;
text-align: center;
cursor: pointer;
line-height: 23px;

${({disabled}) =>
    disabled &&
    `opacity: 0.5;
    pointer-events: none;`
}
&:hover {
background-color: ${warm_white};
}
`;


export default function IndividualOrderItem({cartProduct, cartProductIncrease, cartProductDecrease}){

    const handleCartProductIncrease=()=>{
        cartProductIncrease(cartProduct);
    }

     const handleCartProductDecrease=()=>{
         cartProductDecrease(cartProduct);
     }

    const handleCartProductDelete=()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('Cart ' + user.uid).doc(cartProduct.ID).delete().then(()=>{
                    console.log('successfully deleted');
                })
            }
        })
    }

    return(
        <div className='product'>
            <div className='product-img'>
                <img src={cartProduct.url} alt="product-img"/>
            </div>
            <div align="center" className='product-text title'>{cartProduct.productName}</div>

            <div align="center" className='product-text price'>{formatPrice(cartProduct.price)}</div>

            <div align="center">
            <h6>Quantity</h6>
                <div className='product-text quantity-box'>
                <div className='action-btns minus' align="center" >
                    <IncrementButton onClick={handleCartProductDecrease}>-</IncrementButton>
                </div>
                <div>{cartProduct.qty}</div>
                <div className='action-btns plus' >
                    <IncrementButton onClick={handleCartProductIncrease}>+</IncrementButton>
                </div>
                </div>
            <div className='product-text cart-price'>{formatPrice(cartProduct.TotalProductPrice)}</div>
            <div className='btn btn-danger btn-md cart-btn' onClick={handleCartProductDelete}>remove</div>
            </div>
        </div>
    )
}