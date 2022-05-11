import React, {useRef, useState} from "react";
import { Form, Card, Button, Alert } from "react-bootstrap";
import { useAuth} from "../contexts/AuthContext";
import {Link, useNavigate} from "react-router-dom";


export default function Signup(){
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signin } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSignin(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('passwords do not match')
        }
        try {
            //setLoading(true)
            setError('')
            await signin(emailRef.current.value, passwordRef.current.value)
            navigate("/login")
        } catch {
            setError('failed to create an account')
        }
        //setLoading(false)
       // history.push("/")
    }

    return(
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign In</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSignin}>
                        <Form.Group id="email">
                          <Form.Label>email</Form.Label>
                          <Form.Control type="email" ref={emailRef} required/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required/>
                        </Form.Group>
                        <Form.Group id="password-confirm">
                        <Form.Label>password confirmation</Form.Label>
                        <Form.Control type="password" ref={passwordConfirmRef} required/>
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">Sign In</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login">Log In</Link>
            </div>
        </>
    )
}