import React,{useState, useEffect} from 'react'
import Navbar from './Navbar'
import {Products} from "./Products";
import {auth, fs} from "../contexts/firebase";
import {Coffee, CoffeeGrid} from "./CoffeeGrid";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";


const MenuStyled = styled.div`
border: 2px black;
height: 1000px;
margin: 30px 100px 100px 100px;
`;

export default function Home(props){

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

        const product = await fs.collection('Products').get()
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

    const [totalProducts, setTotalProducts]=useState(0);

    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('Cart ' + user.uid).onSnapshot(snapshot=>{
                    const qty = snapshot.docs.length;
                    setTotalProducts(qty);
                })
            }
        })
    },[])

    const navigate = useNavigate()
    let Product;

    const addToCart = (product)=>{
        if(uid!==null){
             console.log(product);
            Product=product;
            Product['qty']=1;
            Product['TotalProductPrice']=Product.qty*Product.price;
            fs.collection('Cart ' + uid).doc(product.ID).set(Product).then(()=>{
                console.log('successfully added to cart');
            })

        }
        else{
         navigate('/login')

        }

    }

    return (
        <MenuStyled>
        <>
            {product.length > 0 && (
                <div className='container-fluid'>
                    <h1 className='text-center'>Products</h1>
                        <CoffeeGrid>

                        <Products product={product} addToCart={addToCart}/>

                        </CoffeeGrid>

                </div>
            )}
            {product.length < 1 && (
                <CoffeeGrid>Please wait....</CoffeeGrid>
            )}
        </>
        </MenuStyled>
    )

}
