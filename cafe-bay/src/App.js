import React from 'react';
import { createGlobalStyle } from "styled-components";
import {Navbar} from "./Navbar/Navbar";
import {warm_white} from "./styles/colors";
import {Banner} from "./Banner/Banner";
import {Menu} from "./Menu/Menu";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color: #fff6ed;
    font-family: 'Comfortaa', cursive;
    }
    
    h1, h2, h3 {
     font-family: 'Lobster Two', cursive;
  }
`


function App() {
  return (
      <>

        <GlobalStyle/>
          <Navbar/>
          <Banner></Banner>
          <Menu/>
        <div>coffee</div>
        </>

  );
}

export default App;
