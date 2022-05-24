import React, {useState} from 'react';
import { createGlobalStyle } from "styled-components";
import NavbarComp, {Navbar} from "./Navbar";
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
import Signup from "./Signup";
import {Container} from "react-bootstrap";
import AuthProvider from "../contexts/AuthContext";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import AddProducts from "./AddProducts";
import {Products} from "./Products";
import Home from "./Home";

function App() {
    const openCoffee = useOpenCoffee();
    const orders = useOrders();
    useTitle({...openCoffee, ...orders});

  return (
      <>
        <GlobalStyle/>

          <NavbarComp/>

          <Container
              className = "d-flex align-items-center justify-content-center"
              style={{ minHeight: "100vh"}}
          >
              <Router>
                  <AuthProvider>
                      <Routes>
                          <Route path="/dashboard" element={<Dashboard />} />
                          <Route path="/"

                                 element={

                                         <Navigate to={"/dashboard"}/>

                                 }

                          ></Route>
                          <Route path="/signup" element={<Signup />} />
                          <Route path="/login" element={<Login />} />
                          <Route path="/profile" element={<Profile />} />
                          <Route path="/order" element={<Order {...orders} {...openCoffee} />} />
                          <Route path="/forgot-password" element={<ForgotPassword />} />
                          <Route path="/update-profile" element={<UpdateProfile />} />
                          <Route path="/add-products" element={<AddProducts />} />
                          <Route path="/products" element={<Products />} />

                          <Route
                              path="*"
                              element={<Navigate to="/" replace />}
                          />
                      </Routes>
                  </AuthProvider>
              </Router>

          </Container>

        </>
  );
}
export default App;
