import React,{useState, useEffect} from 'react'
import {Products} from "./Products";
import {auth, fs} from "../contexts/firebase";
import {Coffee, CoffeeGrid} from "./CoffeeGrid";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import IndividualFilteredProduct from "./IndividualFilteredProduct";
import {TucanoBanner} from "./Banner/TucanoBanner";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function TucanoDashboard(){

    function GetUserUid(){
        const [uid, setUid]=useState(null);
        useEffect(()=>{
            auth.onAuthStateChanged(user=>{
                if(user){
                    setUid(user.uid);
                }
            })
        },[])
        return uid;
    }

    const uid = GetUserUid();
    console.log(uid);

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
    console.log(user);

    const [product, setProducts]=useState([]);

    async function getProducts(){

        const q = query(collection(fs, "Products"), where("store", "==", "Tucano"));

        const product = await getDocs(q);
        const productsArray = []

        for (let snap of product.docs){
            let data = snap.data();
            data.ID = snap.id;

            productsArray.push({
                ...data
            })
            if(productsArray.length === product.docs.length){
                setProducts(productsArray);
            }
        }
    }

    useEffect(()=>{ getProducts()},[])

    const navigate = useNavigate()
    let Product;

    const addToCart = (product)=>{
        if(uid!==null){
            console.log(product);
            Product=product;
            Product['qty'] = 1;
            Product['TotalProductPrice'] = Product.qty * Product.price;
            fs.collection('Cart ' + uid).doc(product.ID).set(Product).then(()=>{
                console.log('product successfully added to order');
            })
        }
        else{
            navigate('/login')
        }
    }

    return (
        <>
            <TucanoBanner/>
            <div>
                <form onSubmit={getProducts}>
                    <div className='container-fluid filter-products-main-box'>

                            <>
                                {product.length > 0 && (
                                    <div className='my-products'>
                                        <h1 className='text-center'>Tucano Products</h1>
                                        <div className='products-box'>

                                            <Products product={product} addToCart={addToCart}/>

                                        </div>
                                    </div>
                                )}
                                {product.length < 1&&(
                                    <h4 className='text-center text-black-50'>
                                        <br/>
                                        Please wait...
                                    </h4>
                                )}
                            </>
                        }

                    </div>
                </form>
            </div>
        </>

    )

}
