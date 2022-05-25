import React, {useState, useEffect} from "react";
import {auth,fs} from "../contexts/firebase";
import OrderItems from "./OrderItems";
import StripeCheckout from "react-stripe-checkout";

export default function Cart(){

    function GetCurrentUser(){
        const [user, setUser]=useState(null);
        useEffect(()=>{
            auth.onAuthStateChanged(user=>{
                if(user){
                    fs.collection('users').doc(user.uid).get().then(snapshot=>{
                        setUser(snapshot.data().FullName);
                    })
                }
                else{
                    setUser(null);
                }
            })
        },[])
        return user;
    }

    const user = GetCurrentUser();

    const [cartProducts, setCartProducts]=useState([]);

    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('Cart ' + user.uid).onSnapshot(snapshot=>{
                    const newCartProduct = snapshot.docs.map((doc)=>({
                        ID: doc.id,
                        ...doc.data(),
                    }));
                    setCartProducts(newCartProduct);
                })
            }
            else{
                console.log('user is not signed in to retrieve cart');
            }
        })
    },[])

    //console.log(cartProducts);

    const qty = cartProducts.map(cartProduct=>{
        return cartProduct.qty;
    })

    const reducerOfQty = (accumulator, currentValue)=>accumulator+currentValue;

    const totalQty = qty.reduce(reducerOfQty,0);


    const price = cartProducts.map((cartProduct)=>{
        return cartProduct.TotalProductPrice;
    })

    const reducerOfPrice = (accumulator,currentValue)=>accumulator+currentValue;

    const totalPrice = price.reduce(reducerOfPrice,0);

    let Product;

    const cartProductIncrease=(cartProduct)=>{
        Product=cartProduct;
        Product.qty=Product.qty+1;
        Product.TotalProductPrice=Product.qty*Product.price;

        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('Cart ' + user.uid).doc(cartProduct.ID).update(Product).then(()=>{
                    console.log('increment added');
                })
            }
            else{
                console.log('user is not logged in to increment');
            }
        })
    }

    const cartProductDecrease =(cartProduct)=>{
        Product=cartProduct;
        if(Product.qty > 1){
            Product.qty=Product.qty-1;
            Product.TotalProductPrice=Product.qty*Product.price;
            // updating in database
            auth.onAuthStateChanged(user=>{
                if(user){
                    fs.collection('Cart ' + user.uid).doc(cartProduct.ID).update(Product).then(()=>{
                        console.log('decrement');
                    })
                }
                else{
                    console.log('user is not logged in to decrement');
                }
            })
        }
    }


    return(
        <>
            {cartProducts.length > 0 && (
                <div className='container-fluid'>
                    <h1 className='text-center'>Cart</h1>
                    <div className='products-box'>

                        <OrderItems cartProducts={cartProducts}
                        cartProductIncrease={cartProductIncrease}
                        cartProductDecrease={cartProductDecrease}/>

                    </div>
                    <div className='summary-box'>
                        <h5>Cart Summary</h5>
                        <br></br>
                        <div>
                            Total No of Products: <span>{totalQty}</span>
                        </div>
                        <div>
                            Total Price to Pay: <span>{totalPrice}</span>
                        </div>
                        <br></br>
                        <StripeCheckout

                        ></StripeCheckout>
                    </div>
                </div>
            )}
            {cartProducts.length < 1 && (
                <div className='container-fluid'>No products to show</div>
            ) }
        </>
    )
}