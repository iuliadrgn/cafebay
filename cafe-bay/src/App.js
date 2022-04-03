import React, {useState} from 'react';
import { createGlobalStyle } from "styled-components";
import {Navbar} from "./Navbar/Navbar";
import {warm_white} from "./styles/colors";
import {Banner} from "./Banner/Banner";
import {Menu} from "./Menu/Menu";
import{GlobalStyle} from "./styles/GlobalStyle";
import {CoffeeDialog} from "./CoffeeDialog/CoffeeDialog";
import {Order} from "./Order/Order";
import {useOpenCoffee} from "./Hooks/useOpenCoffee";
import {useOrders} from "./Hooks/useOrders";
import {useTitle} from "./Hooks/useTitle";

function App() {
    const openCoffee = useOpenCoffee();
    const orders = useOrders();
    useTitle({...openCoffee, ...orders});

  return (
      <>
        <GlobalStyle/>
          <CoffeeDialog {...openCoffee} {...orders}/>
          <Navbar/>
          <Order {...orders} {...openCoffee} />
          <Banner/>
          <Menu {...openCoffee}/>
        </>
  );
}
export default App;
