import React, {useEffect, useState} from 'react';
import{GlobalStyle} from "../styles/GlobalStyle";
import "firebase/compat/auth";
import Signup from "./Signup";
import {Container} from "react-bootstrap";
import NavbarComp, {Navbar} from "./Navbar";
import {auth, fs} from "../contexts/firebase";

function App() {

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

    const [totalProducts, setTotalProducts]=useState(0);

    //adding products from the cart into the db
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

  return (
      <>
        <GlobalStyle/>
          <NavbarComp totalProducts={totalProducts}/>
          <Container
              className = "d-flex align-items-center justify-content-center"
              style={{ minHeight: "100vh"}}
          >
          </Container>

        </>
  );
}
export default App;
