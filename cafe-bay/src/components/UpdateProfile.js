import React, {useEffect, useRef, useState} from "react";
import { Form, Card, Button, Alert } from "react-bootstrap";
import { useAuth} from "../contexts/AuthContext";
import {Link, useNavigate} from "react-router-dom";
import {auth, fs} from "../contexts/firebase";
import {Banner} from "./Banner/Banner";


export default function UpdateProfile(){
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updatePassword, updateEmail} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

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

    const user = GetCurrentUser();


    function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('passwords do not match')
        }

        const promises = []
        setError("")
        if(emailRef.current.value !== currentUser.email){

          currentUser.updateEmail(emailRef.current.value);
            fs.collection('users').doc(user.uid).set({
                Email: emailRef}
            )}

        if(passwordRef.current.value){

            currentUser.updatePassword(passwordRef.current.value)
        }

        Promise.all(promises).then(() =>{
            navigate("/")
        }).catch(() => {
            setError("failed to update account")
        }).finally(() => {

        })

        try {
            setError('')
            navigate("/login")
        } catch {
            setError('failed to create an account')
        }

    }

    return(
        <>
            <Banner/>
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
                        <br/>
                        <div align="center">
                        <Button disabled={loading} className="btn btn-dark btn-md btn-box w-25" type="submit">update</Button>
                        </div>
                    </Form>
                </Card.Body>

            <div className="w-100 text-center mt-2">
               <Link to="/">cancel</Link>
            </div>
                <br/>
            </Card>
        </>
    )
}