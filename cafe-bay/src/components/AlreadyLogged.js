import React, { useState } from "react";
import {Alert, Button, Card} from "react-bootstrap";
import { useAuth} from "../contexts/AuthContext";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Banner} from "./Banner/Banner";

export default function AlreadyLogged() {
    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()


    async function handleLogout() {
        setError('')

        try {
            navigate('/login');
            await logout()

        } catch {
            setError('failed to log out')
        }
    }
    return(
        <>
            <Banner/>
            <Card>
                <Card.Body>
                    <div className="alert-success">You are already logged in as:</div>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>email: </strong> {currentUser.email}
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button type="btn btn-dark" onClick={handleLogout}> Log out </Button>
            </div>

        </>
    )
}