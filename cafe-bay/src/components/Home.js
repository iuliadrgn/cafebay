import React,{useState, useEffect} from 'react'
import Navbar from './Navbar'
import {Products} from "./Products";
import {auth, fs} from "../contexts/firebase";
import {useNavigate} from "react-router-dom";
import IndividualFilteredProduct from "./IndividualFilteredProduct";
import {Banner} from "./Banner/Banner";


export default function Home(props){

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

        const product = await fs.collection('Products').get()
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

    const[coffees, setCoffees] = useState([]);
    const[search, setSearch] = useState("");

    const searchCoffee=(e)=>{
        e.preventDefault();
        setCoffees(coffees.filter((coffee)=>
        coffees.title.toLowerCase().includes(search.toLowerCase())
        ));

    };


    const navigate = useNavigate()
    let Product;

    const addToCart = (product)=>{
        if(uid!==null){
             console.log(product);
            Product=product;
            Product['qty']=1;
            Product['TotalProductPrice']=Product.qty*Product.price;
            fs.collection('Cart ' + uid).doc(product.ID).set(Product).then(()=>{
                console.log('successfully added to cart');
            })

        }
        else{
         navigate('/login')

        }

    }

    const [spans]=useState([
        {id: 'Hot Coffee Drinks', text: 'Hot Coffee Drinks'},
        {id: 'Cold Coffee Drinks', text: 'Cold Coffee Drinks'},
        {id: 'Alcoholic Drinks', text: 'Alcoholic Drinks'},
        {id: 'Water', text: 'Water'},
        {id: 'Soda', text: 'Soda'},
        {id: 'Natural Fruit Juices', text: 'Natural Fruit Juices'},
        {id: 'Dessert', text: 'Dessert'},
        {id: 'Snacks', text: 'Snacks'},
    ])

    const [active, setActive]=useState('');

    const [category, setCategory]=useState('');

    const handleChange=(individualSpan)=>{
        setActive(individualSpan.id);
        setCategory(individualSpan.text);
        filterFunction(individualSpan.text);
    }

    const filterFunction = (text)=>{
        if(product.length>1){
            const filter=product.filter((product)=>product.category===text);
            setFilteredProducts(filter);
        }
        else{
            console.log('no products to filter')
        }
    }

    const [filteredProducts, setFilteredProducts]=useState([]);



    const returntoAllProducts=()=>{
        setActive('');
        setCategory('');
        setFilteredProducts([]);

    }



    return (
        <>
            <div>
            <div className='container-fluid filter-products-main-box'>

                <div className='filter-box'>
                    <h6>Filter by category</h6>
                    {spans.map((individualSpan,index)=>(
                        <span key={index} id={individualSpan.id}
                              onClick={()=>handleChange(individualSpan)}
                              className={individualSpan.id===active ? active:'deactive'}>{individualSpan.text}</span>
                    ))}
                </div>
                {filteredProducts.length > 0&&(
                    <div className='my-products'>
                        <h1 className='text-center'>{category}</h1>
                        <a href="javascript:void(0)" onClick={returntoAllProducts}>Return to All Products</a>
                        <div className='products-box'>
                            {filteredProducts.map(individualFilteredProduct=>(
                                <IndividualFilteredProduct key={individualFilteredProduct.ID}
                                                           individualFilteredProduct={individualFilteredProduct}
                                                           addToCart={addToCart}/>
                            ))}
                        </div>
                    </div>
                )}
                {filteredProducts.length < 1&&(
                    <>
                        {product.length > 0&&(
                            <div className='my-products'>
                                <h1 className='text-center'>All Products</h1>
                                <div className='products-box'>
                                    <Products product={product} addToCart={addToCart}/>

                                </div>
                            </div>
                        )}
                        {product.length < 1&&(
                            <div className='my-products please-wait'>Please wait...</div>
                        )}
                    </>
                )}

            </div>

            </div>
        </>

    )

}
