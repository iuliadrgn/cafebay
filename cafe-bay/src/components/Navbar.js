import React, {Component, useEffect, useState} from "react";
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from "react-bootstrap";
import {Container} from "react-bootstrap";
import {BrowserRouter as Router, Navigate, Route, Routes, Link, useNavigate} from "react-router-dom";
import Login from "./Login";
import Profile from "./Profile";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import Signup from "./Signup";
import AddProducts from "./AddProducts";
import Home from "./Home";
import {auth, fs} from "../contexts/firebase";
import {Icon} from 'react-icons-kit'
import {shoppingCart} from 'react-icons-kit/feather/shoppingCart'
import AuthProvider from "../contexts/AuthContext";
import {Products} from "./Products";
import Cart from "./Cart";
import TucanoDashboard from "./TucanoDashboard";
import {warm_white} from "../styles/colors";
import ProtectedRoutes from "./PrivateRoute";
import AlreadyLogged from "./AlreadyLogged";
import StarbucksDashboard from "./StarbucksDashboard";
import FiveToGoDashboard from "./FiveToGoDashboard";

export default function NavbarComp({totalProducts}){
    let [userLoggedOut] = useState(true);
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

    if(uid!==null){
        userLoggedOut=false;
    }else{
        userLoggedOut=true;
    }

    const user = GetCurrentUser();
    console.log(user);
        return(
            <Router>
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" totalProducts={totalProducts}>
                    <Container>
                        <Navbar.Brand href="/home">Cafe Bay<span role="img" aria-label="coffee">☕</span></Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to={"/home"}>Home</Nav.Link>
                                <Nav.Link as={Link} to={"/signup"}>Signup</Nav.Link>
                                <Nav.Link as={Link} to={"/login"}>Login</Nav.Link>
                                <Nav.Link as={Link} to={"/profile"}>Profile</Nav.Link>
                                <Nav.Link as={Link} to={"/add-products"}>Add Products</Nav.Link>
                                <NavDropdown title="coffee shop" id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="/starbucks">Starbucks</NavDropdown.Item>
                                    <NavDropdown.Item href="/5togo">5 to go</NavDropdown.Item>
                                    <NavDropdown.Item href="/tucano">Tucano</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <Nav>
                                <div className='cart-menu-btn'>
                                    <Link className='navlink' to="/cart">
                                        <Icon icon={shoppingCart} size={25} background-color={warm_white}/>
                                    </Link>
                                    <span className='cart-indicator'>{totalProducts}</span>
                                </div>

                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>

                <div>
                    <AuthProvider>
                        <Routes>
                            <Route path="/home" element={<Home />} />
                            <Route path="/" element={<Navigate to={"/home"}/>}></Route>
                            <Route path="/signup" element={<Signup />} />
                            <Route
                                path="/login"
                                element={!userLoggedOut ? <Navigate to="/already-logged"/> : <Login/>} />
                            <Route
                                path="/profile"
                                element={userLoggedOut ? <Navigate to="/login"/> : <Profile/>}/>
                            <Route path="/forgot-password" element={<ForgotPassword />} />
                            <Route
                                path="/update-profile"
                                element={userLoggedOut ? <Navigate to="/home"/> : <UpdateProfile/>}
                            />
                            <Route element={<ProtectedRoutes />}>
                                <Route path="/add-products" element={<AddProducts />} />
                            </Route>
                            <Route path="/products" element={<Products />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route
                                path="/already-logged"
                                element={userLoggedOut ? <Navigate to="/home"/> : <AlreadyLogged/>} />
                            <Route path="/tucano" element={<TucanoDashboard />} />
                            <Route path="/starbucks" element={<StarbucksDashboard />} />
                            <Route path="/5togo" element={<FiveToGoDashboard />} />
                            <Route
                                path="*"
                                element={<Navigate to="/" replace />}
                            />
                        </Routes>
                    </AuthProvider>
                </div>
            </Router>
        )

}

