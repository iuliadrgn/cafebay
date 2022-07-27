import React, {useRef, useState} from "react";
import { Form, Card, Button, Alert } from "react-bootstrap";
import { useAuth} from "../contexts/AuthContext";
import {Link, useNavigate} from "react-router-dom";
import {Banner} from "./Banner/Banner";

export default function ForgotPassword(){

    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)


    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setMessage('')
            setError('')
            await resetPassword(emailRef.current.value)
            setMessage('check your email for more instructions')
        } catch {
            setError('failed to reset the password')
        }
    }

    return(
        <>
            <Banner/>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Password Reset</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required/>
                        </Form.Group>
                        <br/>
                            <div align="center">
                        <Button disabled={loading} type='submit' className='btn btn-dark btn-md btn-box w-25'>reset password</Button>
                            </div>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/login">login</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to="/signup">Sign Up</Link>
            </div>
        </>
    )
}