import React, { useState } from "react";
import {Alert, Button, Card} from "react-bootstrap";
import { useAuth} from "../contexts/AuthContext";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Banner} from "./Banner/Banner";

export default function AlreadyLogged() {
    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()

    return(
        <>
            <Banner/>
            <Card>
                <Card.Body>
                    <div className="alert-info">You are already logged in as:</div>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>email: </strong> {currentUser.email}
                </Card.Body>
            </Card>

                <div className="w-100 text-center mt-3">
                    <Link to="/profile">navigate to your profile</Link>
                </div>


        </>
    )
}