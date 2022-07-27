import React, { useState } from "react";
import {Alert, Button, Card} from "react-bootstrap";
import { useAuth} from "../contexts/AuthContext";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Banner} from "./Banner/Banner";

export default function Profile() {
    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()

    async function handleLogout() {
        setError('')

        try {

            await logout();
            navigate(-1);
            window.location.reload(false);

        } catch {
            setError('failed to log out')
        }
    }
    return(
        <>
            <Banner/>
            <Card>
                <Card.Body>
                <div align="center">
                <h2 className="text-center mb-4">Profile</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <strong>email: </strong> {currentUser.email}
                <br/>
                <Link to="/update-profile" className="btn btn-dark w-10 mt-3 btn-box">update profile</Link>
                </div>
                </Card.Body>

                <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={handleLogout}> log out </Button>
              </div>
                <br/>
            </Card>
        </>
    )
}