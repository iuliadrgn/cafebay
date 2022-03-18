import React from 'react';
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #facdaa;
    font-family: 'Comfortaa', cursive;
    }
    
    h1, h2, h3 {
     font-family: 'Abril Fatface', cursive;
  }
`


function App() {
  return (
      <>
          <h1>Cafe Bay</h1>
        <GlobalStyle/>
        <div>coffee</div>
        </>

  );
}

export default App;
