import React,{useState, useEffect} from 'react'
import Navbar from './Navbar'
import {Products} from "./Products";
import {auth, fs} from "../contexts/firebase";
import {Coffee, CoffeeGrid} from "./CoffeeGrid";
import styled from "styled-components";


const MenuStyled = styled.div`
border: 2px black;
height: 1000px;
margin: 30px 100px 100px 100px;
`;

export default function Home(){

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

    return (
        <MenuStyled>
        <>
            {product.length > 0 && (
                <div className='container-fluid'>
                    <h1 className='text-center'>Products</h1>
                        <CoffeeGrid>

                        <Products product={product}/>

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
