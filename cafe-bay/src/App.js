import React from 'react';
import { createGlobalStyle } from "styled-components";
import {Navbar} from "./Navbar/Navbar";
import {warm_white} from "./styles/colors";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color: #fff6ed;
    font-family: 'Comfortaa', cursive;
    }
    
    h1, h2, h3 {
     font-family: 'Abril Fatface', cursive;
  }
`


function App() {
  return (
      <>

        <GlobalStyle/>
          <Navbar/>
        <div>coffee</div>
        </>

  );
}

export default App;
