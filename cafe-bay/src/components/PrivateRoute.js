import React, {useEffect, useState} from "react";
import Navigate from "react";
import {auth, fs} from "../contexts/firebase";
import {Outlet} from "react-router-dom";
import Home from "./Home";
import {collapseToast, toast} from "react-toastify";

toast.configure();

export default function ProtectedRoutes() {

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
                        setUser(snapshot.data().isAdmin);
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

    if(user === false){
       alert("you do not have permission to access this page");
    }

    return user ? <Outlet/> : <Home/>
}




