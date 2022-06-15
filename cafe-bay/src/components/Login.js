import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {auth, fs} from "../contexts/firebase";
import {Banner} from "./Banner/Banner";


export default function Login(){

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
    console.log(uid);

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
    console.log(user);

    let [userLoggedOut] = useState(false);
    const navigate = useNavigate();

    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');

    const [errorMsg, setErrorMsg]=useState('');
    const [successMsg, setSuccessMsg]=useState('');

    const handleLogin=(e)=>{
        e.preventDefault();
        auth.signInWithEmailAndPassword(email,password).then(()=>{
            setSuccessMsg('Login Successful. You will get redirected to the Home page');
            setEmail('');
            setPassword('');
            setErrorMsg('');
            setTimeout(()=>{
                setSuccessMsg('');
                navigate('/');
            },1000)
        }).catch(error=>setErrorMsg(error.message));
    }

    return (

        <>
            <Banner/>
        <div className='container'>

            <br></br>
            <br></br>
            <h1>Login</h1>
            <hr></hr>

            {successMsg&&<>
                <div className='success-msg'>{successMsg}</div>
                <br></br>
            </>}
            <form className='form-group' autoComplete="off"
                  onSubmit={handleLogin}>
                <label>Email</label>
                <input type="email" className='form-control' required
                       onChange={(e)=>setEmail(e.target.value)} value={email}></input>
                <br></br>
                <label>Password</label>
                <input type="password" className='form-control' required
                       onChange={(e)=>setPassword(e.target.value)} value={password}></input>
                <br></br>
                <div className='btn-box'>
                    <div className="w-100 text-center mt-2">
                        Need an account? <Link to="/signup">Sign In</Link>
                    </div>
                    <button type="submit" className='btn btn-dark btn-md btn-md'>log in</button>

                </div>
            </form>
            <div className="w-100 text-center mt-3">
                <Link to="/forgot-password">forgot password?</Link>
            </div>
            {errorMsg&&<>
                <br></br>
                <div className='error-msg'>{errorMsg}</div>
            </>}
        </div>
        </>
    )
}