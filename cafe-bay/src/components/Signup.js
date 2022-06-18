import React,{useState} from 'react'
import {auth, fs} from "../contexts/firebase";
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import {Banner} from "./Banner/Banner";

export default function Signup(){

    const navigate = useNavigate();

    const [fullName, setFullname]=useState('');
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');

    const [errorMsg, setErrorMsg]=useState('');
    const [successMsg, setSuccessMsg]=useState('');
    const isAdmin = false;

    const handleSignup=(e)=>{
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email,password).then((credentials) => {
            console.log(credentials);
            fs.collection('users').doc(credentials.user.uid).set({
                FullName: fullName,
                Email: email,
                Password: password,
                isAdmin: false
            }).then( () => {
                setSuccessMsg('Signup Successful');
                setFullname('');
                setEmail('');
                setPassword('');
                setErrorMsg('');
                setTimeout(()=>{
                    setSuccessMsg('');
                    navigate('/login');
                },1000)
            }).catch(error=>setErrorMsg(error.message));
        }).catch((error)=>{
            setErrorMsg(error.message)
        })
    }

    return (
        <>
            <Banner/>
        <div className='container'>
            <br/>
            <h1>Sign Up</h1>
            <hr/>
            {successMsg&&<>
                <div className='success-msg'>{successMsg}</div>
                <br/>
            </>}
            <form className='form-group' autoComplete="off" onSubmit={handleSignup}>
                <label>name</label>
                <input type="text" className='form-control' required
                       onChange={(e)=>setFullname(e.target.value)} value={fullName}></input>
                <br/>
                <label>email</label>
                <input type="email" className='form-control' required
                       onChange={(e)=>setEmail(e.target.value)} value={email}></input>
                <br/>
                <label>password</label>
                <input type="password" className='form-control' required
                       onChange={(e)=>setPassword(e.target.value)} value={password}></input>
                <br/>
                <div>
                    <div className="w-100 text-center mt-2">
                        Already have an account? <Link to="/login">Log In</Link>
                    </div>
                    <br/>
                    <div align="center">
                    <button type="submit" className='btn btn-dark btn-md btn-box w-25'>sign up</button>
                    </div>
                </div>
            </form>
            {errorMsg&&<>
                <br/>
                <div className='error-msg'>{errorMsg}</div>
            </>}
        </div>
        </>
    )
}