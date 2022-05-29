import React, {useState, useEffect} from "react";
import {auth,fs} from "../contexts/firebase";
import OrderItems from "./OrderItems";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from "./Modal";

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

    //credit card payment
    const navigate = useNavigate();
    const handleToken = async(token) => {
      //  console.log(token)
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
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
            const uid = auth.currentUser.uid;
            const carts = await fs.collection('Cart ' + uid).get();
            for(let snap of carts.docs){
                await fs.collection('Cart ' + uid).doc(snap.id).delete();
            }
        }else{
            alert('something went wrong in checkout')
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
                        stripeKey='pk_test_51L3e1PBJ6d9Rh1UOyowfB4XJSuwvHZU2YiEGXGkCCH1CKtTCBsp2jiBm22wNAbfAbTXCaKK2i89TjJZIb4JDugvG00TcG4l0HP'
                        token={handleToken}
                        billingAddress
                        shippingAddress
                        name='All Products'
                        amount={totalPrice * 100}
                        ></StripeCheckout>
                        <h6 className='text-center'
                            style={{marginTop: 7+'px'}}>OR</h6>
                        <button className='btn btn-secondary btn-md'
                                onClick={()=>triggerModal()}>pay cash on delivery</button>
                    </div>
                </div>
            )}
            {cartProducts.length < 1 && (
                <div className='container-fluid'>No products to show</div>
            ) }

            {showModal===true&&(
                <Modal TotalPrice={totalPrice} totalQty={totalQty}
                       hideModal={hideModal}
                />
            )}
        </>
    )
}