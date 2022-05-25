import React, {Component} from "react";
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from "react-bootstrap";
import {Container} from "react-bootstrap";
import {BrowserRouter as Router, Navigate, Route, Routes, Link, useNavigate} from "react-router-dom";
import Login from "./Login";
import Profile from "./Profile";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import Signup from "./Signup";
import AddProducts from "./AddProducts";
import {Banner} from "./Banner/Banner";
import Home from "./Home";
import {auth} from "../contexts/firebase";
import {Icon} from 'react-icons-kit'
import {shoppingCart} from 'react-icons-kit/feather/shoppingCart'
import AuthProvider from "../contexts/AuthContext";
import {Products} from "./Products";
import Cart from "./Cart";

export default function NavbarComp({totalProducts}){

        return(
            <Router>

            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" totalProducts={totalProducts}>
                    <Container>
                        <Navbar.Brand href="#home">Cafe Bay<span role="img" aria-label="coffee">☕</span></Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to={"/home"}>Home</Nav.Link>
                                <Nav.Link as={Link} to={"/login"}>Login</Nav.Link>
                                <Nav.Link as={Link} to={"/profile"}>Profile</Nav.Link>
                                <Nav.Link as={Link} to={"/add-products"}>Add Products</Nav.Link>
                                <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <Nav>
                                <div className='cart-menu-btn'>
                                    <Link className='navlink' to="/cart">
                                        <Icon icon={shoppingCart} size={20}/>
                                    </Link>
                                    <span className='cart-indicator'>{totalProducts}</span>
                                </div>
                                <Nav.Link eventKey={2} href="#memes">
                                    Dank memes
                                </Nav.Link>
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
                            <Route path="/login" element={<Login />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/forgot-password" element={<ForgotPassword />} />
                            <Route path="/update-profile" element={<UpdateProfile />} />
                            <Route path="/add-products" element={<AddProducts />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/cart" element={<Cart />} />

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

