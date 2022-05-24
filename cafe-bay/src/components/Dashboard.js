import React, {useState} from 'react';
import { createGlobalStyle } from "styled-components";
import {Navbar} from "./Navbar";
import {Banner} from "./Banner/Banner";
import {Menu} from "./Menu/Menu";
import{GlobalStyle} from "../styles/GlobalStyle";
import {CoffeeDialog} from "./CoffeeDialog/CoffeeDialog";
import {Order} from "./Order/Order";
import {useOpenCoffee} from "./Hooks/useOpenCoffee";
import {useOrders} from "./Hooks/useOrders";
import {useTitle} from "./Hooks/useTitle";
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";


function App() {
    const openCoffee = useOpenCoffee();
    const orders = useOrders();
    useTitle({...openCoffee, ...orders});

    return (
        <>

            <CoffeeDialog {...openCoffee} {...orders}/>

            <Banner/>
            <Menu {...openCoffee}/>
        </>
    );
}
export default App;
