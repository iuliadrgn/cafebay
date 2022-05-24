import React, {useRef, useState} from "react";
import { Form, Card, Button, Alert } from "react-bootstrap";
import { useAuth} from "../contexts/AuthContext";
import {Link, useNavigate} from "react-router-dom";


export default function UpdateProfile(){
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updatePassword, updateEmail} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('passwords do not match')
        }

        const promises = []
        setError("")
        if(emailRef.current.value !== currentUser.email){
            promises.push(updateEmail(emailRef.current.value))
        }
        if(passwordRef.current.value){
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(() =>{
            navigate("/")
        }).catch(() => {
            setError("failed to update account")
        }).finally(() => {

        })

        try {
            //setLoading(true)
            setError('')
            //await signin(emailRef.current.value, passwordRef.current.value)
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
                    <h2 className="text-center mb-4">Update Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email}/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} placeholder="Leave blank to keep the same"/>
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>password confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} placeholder="Leave blank to keep the same"/>
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">update</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
               <Link to="/">cancel</Link>
            </div>
        </>
    )
}