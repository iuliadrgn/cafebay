import React, {useState} from 'react';
import { createGlobalStyle } from "styled-components";
import {Navbar} from "./Navbar/Navbar";
import {warm_white} from "./styles/colors";
import {Banner} from "./Banner/Banner";
import {Menu} from "./Menu/Menu";
import{GlobalStyle} from "./styles/GlobalStyle";
import {CoffeeDialog} from "./CoffeeDialog/CoffeeDialog";
import {Order} from "./Order/Order";

function App() {
    const[openCoffee, setOpenCoffee] = useState();

  return (
      <>
        <GlobalStyle/>
          <CoffeeDialog openCoffee={openCoffee} setOpenCoffee={setOpenCoffee}></CoffeeDialog>
          <Navbar/>
          <Order/>
          <Banner/>

          <Menu setOpenCoffee={setOpenCoffee}/>

        </>

  );
}

export default App;
