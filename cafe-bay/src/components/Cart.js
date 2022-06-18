import React, {useState, useEffect} from "react";
import {auth,fs} from "../contexts/firebase";
import OrderItems from "./OrderItems";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from "./Modal";
import {Banner} from "./Banner/Banner";
import {formatPrice} from "./CoffeeData";

toast.configure();

export default function Cart(){

    const [showModal, setShowModal]=useState(false);
    const triggerModal=()=>{
        setShowModal(true);
    }
    const hideModal=()=>{
        setShowModal(false);
    }

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

    const [cartProducts, setCartProducts]=useState([]);
    const user = GetCurrentUser();

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


    const qty = cartProducts.map(cartProduct=>{
        return cartProduct.qty;
    })

    const reducerOfQty = (accumulator, currentValue)=>accumulator+currentValue;
    const totalQty = qty.reduce(reducerOfQty,0);

    const price = cartProducts.map((cartProduct)=>{
        return cartProduct.TotalProductPrice;
    })

    const priceReducer = (accumulator,currentValue)=>accumulator+currentValue;

    const totalPrice = price.reduce(priceReducer, 0);

    let Product;

    const cartProductIncrease = (cartProduct) => {
        Product = cartProduct;
        Product.qty = Product.qty + 1;
        Product.TotalProductPrice = Product.qty * Product.price;

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
                        console.log('reducing the number of products');
                    })
                }
                else{
                    console.log('the user is not logged to reduce the number of products');
                }
            })
        }
    }

    //for credit card payment
    const navigate = useNavigate();
    const handleToken = async(token) => {

        const cart = {name: 'All Products', totalPrice}
        const response = await axios.post('http://localhost:8080/checkout', {
            token,
            cart
        })
        console.log(response);
        let {status}=response.data;
        if(status==='success'){
            navigate('/');
            toast.success('Your order has been placed successfully', {

                position: 'top-left',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                progress: undefined,
                draggable: false,

            });
            const uid = auth.currentUser.uid;
            const carts = await fs.collection('Cart ' + uid).get();
            for(let snap of carts.docs){
                await fs.collection('Cart ' + uid).doc(snap.id).delete();
            }
        }else{
            alert('something went wrong in the checkout process')
        }
    }

    return(
        <>
            <Banner/>
            {cartProducts.length > 0 && (
                <div className='container-fluid'>
                    <h1 className='text-center'>Cart</h1>
                    <div className='products-box'>

                        <OrderItems cartProducts={cartProducts}
                        cartProductIncrease={cartProductIncrease}
                        cartProductDecrease={cartProductDecrease}/>

                    </div>
                    <div className='order-summary'>
                        <h4>Order Summary</h4>
                        <hr/><br/>
                        <div>
                            quantity of products: <span>{totalQty}</span>
                        </div>
                        <div>
                            total price: <span>{formatPrice(totalPrice)}</span>
                        </div>
                        <br/>
                        <StripeCheckout
                        stripeKey='pk_test_51L3e1PBJ6d9Rh1UOyowfB4XJSuwvHZU2YiEGXGkCCH1CKtTCBsp2jiBm22wNAbfAbTXCaKK2i89TjJZIb4JDugvG00TcG4l0HP'
                        token={handleToken}
                        billingAddress
                        shippingAddress
                        name = 'Order'
                        amount={formatPrice(totalPrice * 100)}
                        ></StripeCheckout>
                        <h6 className='text-center'
                            style={{marginTop: 10+'px'}}>
                            or
                        </h6>
                        <button className='btn btn-secondary btn-dark btn-md'
                                onClick={() => triggerModal()}>
                                pay cash on delivery
                        </button>
                    </div>
                </div>
            )}
            {cartProducts.length < 1 && (
                <div className='container-fluid'>
                    <br/>
                    <div className="alert-info">It seems like your cart is empty...</div>
                </div>
            ) }

            {showModal === true && (
                <Modal
                    TotalPrice = {formatPrice(totalPrice)} totalQty = {totalQty}
                    hideModal = {hideModal}
                />
            )}
        </>
    )
}