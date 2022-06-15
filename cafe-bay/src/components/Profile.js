import React, { useState } from "react";
import {Alert, Button, Card} from "react-bootstrap";
import { useAuth} from "../contexts/AuthContext";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Banner} from "./Banner/Banner";

export default function Profile() {
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
                <h2 className="text-center mb-4">Profile</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <strong>email: </strong> {currentUser.email}
                <Link to="/update-profile" className="btn btn-primary w-100 mt-3">update profile</Link>
            </Card.Body>
        </Card>
            <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={handleLogout}  > Log out </Button>
            </div>

        </>
    )
}