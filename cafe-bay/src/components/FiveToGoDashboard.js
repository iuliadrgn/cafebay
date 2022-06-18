import React,{useState, useEffect} from 'react'
import {Products} from "./Products";
import {auth, fs} from "../contexts/firebase";
import {useNavigate} from "react-router-dom";
import {FiveToGoBanner} from "./Banner/FiveToGoBanner";
import {collection, getDocs, query, where} from "firebase/firestore";


export default function FiveToGoDashboard(){
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

    const [product, setProducts]=useState([]);

    async function getProducts(){

        const q = query(collection(fs, "Products"), where("store", "==", "5 to go"));

        const product = await getDocs(q);
        const productsArray = []

        for (let snap of product.docs){
            let data = snap.data();
            data.ID = snap.id;

            productsArray.push({
                ...data
            })
            if(productsArray.length === product.docs.length){
                setProducts(productsArray);
            }
        }
    }

    useEffect(()=>{ getProducts()},[])

    const navigate = useNavigate()
    let Product;

    const addToCart = (product)=>{
        if(uid!==null){
            console.log(product);
            Product=product;
            Product['qty'] = 1;
            Product['TotalProductPrice'] = Product.qty * Product.price;
            fs.collection('Cart ' + uid).doc(product.ID).set(Product).then(()=>{
                console.log('product successfully added to order');
            })
        }
        else{
            navigate('/login')
        }
    }

    return (
        <>
            <FiveToGoBanner/>
            <div>
                <form onSubmit={getProducts}>
                    <div className='container-fluid filter-products-main-box'>

                        <>
                            {product.length > 0 && (
                                <div className='my-products'>
                                    <h1 className='text-center'>5 To Go Products</h1>
                                    <div className='products-box'>

                                        <Products product={product} addToCart={addToCart}/>

                                    </div>
                                </div>
                            )}
                            {product.length < 1&&(
                                <h4 className='text-center text-black-50'>
                                    <br/>
                                    Please wait...
                                </h4>
                            )}
                        </>
                        }
                    </div>
                </form>
            </div>
        </>

    )

}
