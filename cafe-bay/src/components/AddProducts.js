import React, { useState } from "react";
import {fs,storage} from "../contexts/firebase";

export default function AddProducts() {

    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory]=useState('');
    const [store, setStore]=useState('');
    const [image, setImage] = useState(null);
    const [imageError, setImageError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [uploadError, setUploadError] = useState('');
    const types = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG'];

    const handleProductImg = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile){

            if (selectedFile && types.includes(selectedFile.type)){
                setImage(selectedFile);
                setImageError('');
            }
            else{
                setImage(null);
                setImageError('please select a jpg or png file')
            }
        }
        else{
            console.log('please select an image file');
        }
    }

    const handleAddProducts = (e) => {

        e.preventDefault();

        const uploadTask = storage.ref(`product-images/${image.name}`).put(image);

        uploadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log(progress);
        }, error => setUploadError(error.message), () => {
            storage.ref('product-images').child(image.name).getDownloadURL().then(url => {
                fs.collection('Products').add({
                    productName,
                    description,
                    category,
                    store,
                    price: Number(price),
                    url
                }).then(() => {
                    setSuccessMsg('The product was added successfully');
                    setProductName('');
                    setDescription('');
                    setCategory('');
                    setStore('');
                    setPrice('');
                    document.getElementById('file').value = '';
                    setImageError('');
                    setUploadError('');
                    setTimeout(() => {
                        setSuccessMsg('');
                    }, 1000)
                }).catch(error => setUploadError(error.message));
            })
        })
    }

    return (
        <div className='container'>
            <br/>
            <h1>Add Products</h1>
            <hr/>
            {successMsg && <>
                <div className='success-msg'>{successMsg}</div>
                <br/>
            </>}
            <form autoComplete="off" className='form-group' onSubmit={handleAddProducts}>
                <label>Product Name</label>
                <input type="text" className='form-control' required
                       onChange={(e) => setProductName(e.target.value)} value={productName}></input>
                <br/>
                <label>Product Description</label>
                <input type="text" className='form-control' required
                       onChange={(e) => setDescription(e.target.value)} value={description}></input>
                <br/>
                <label>Price</label>
                <input type="number" className='form-control' required
                       onChange={(e) => setPrice(e.target.value)} value={price}></input>
                <br/>

                <label>Product Category</label>

                <select className='form-control' required
                        value={category} onChange={(e)=>setCategory(e.target.value)}>
                    <option value="">Select Product Category</option>
                    <option>Hot Coffee Drinks</option>
                    <option>Cold Coffee Drinks</option>
                    <option>Alcoholic Drinks</option>
                    <option>Water</option>
                    <option>Soda</option>
                    <option>Natural Fruit Juices</option>
                    <option>Dessert</option>
                    <option>Snacks</option>

                </select>
               <br/>

                <label>Store</label>
                <select className='form-control' required
                        value={store} onChange={(e)=>setStore(e.target.value)}>
                    <option value="">Select Store</option>
                    <option>Starbucks</option>
                    <option>Tucano</option>
                    <option>5 to go</option>
                </select>
                <br/>

                <label>Upload Product Image</label>
                <input type="file" id="file" className='form-control' required
                       onChange={handleProductImg}></input>

                {imageError && <>
                    <br></br>
                    <div className='error-msg'>{imageError}</div>

                </>}
                <br></br>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <button type="submit" className='btn btn-dark btn-md'>submit</button>
                </div>
            </form>
            {uploadError && <>
                <br></br>
                <div className='error-msg'>{uploadError}</div>

            </>}

        </div>
    )
}