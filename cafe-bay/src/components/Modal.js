import React, {useState} from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {auth, fs} from "../contexts/firebase";
import { useNavigate } from 'react-router-dom'

toast.configure();

export default function Modal({TotalPrice, totalQty, hideModal}){

    const [cell, setCell]=useState(null);
    const [residentialAddress, setResidentialAddress]=useState('');
    const [cartPrice]=useState(TotalPrice);
    const [cartQty]=useState(totalQty);
    const navigate = useNavigate();

    //to close the pay cash pop up
    const handleCloseModal = () => {
        hideModal();
    }

    const handlePaymentOnDelivery = async(e) => {
        e.preventDefault();
        const uid = auth.currentUser.uid;
        const userData = await fs.collection('users').doc(uid).get();
        await fs.collection('Buyer-Personal-Info').add({
            Name: userData.data().FullName,
            Email: userData.data().Email,
            CellNo: cell,
            ResidentialAddress: residentialAddress,
            CartPrice: cartPrice,
            CartQty: cartQty
        })
        const cartData = await fs.collection('Cart ' + uid).get();
        for ( let snap of cartData.docs ){
            let data = snap.data();
            data.ID = snap.id;
            await fs.collection('Buyer-Cart ' + uid).add(data);
            await fs.collection('Cart ' + uid).doc(snap.id).delete();
        }

        hideModal();
        navigate('/');

        toast.success('Your order has been placed successfully', {
            position: 'top-left',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
        });
    }

    return(
        <div className='shade-area'>
            <div className='modal-container'>
                <form className='form-group' onSubmit={handlePaymentOnDelivery}>
                    <input type="number"
                           className='form-control'
                           placeholder='Phone Number'
                           required onChange={(e)=>setCell(e.target.value)} value={cell}
                    />
                    <br/>
                    <input type="text"
                           className='form-control'
                           placeholder='Delivery Address'
                           required onChange={(e)=>setResidentialAddress(e.target.value)}
                           value={residentialAddress}
                    />
                    <br/>
                    <label>Total Quantity</label>
                    <input type="text"
                           className='form-control' readOnly
                           required value={cartQty}
                    />
                    <br/>
                    <label>Total Price</label>
                    <input type="text"
                           className='form-control' readOnly
                           required value={cartPrice}
                    />
                    <br/>
                    <button type='submit' className='btn btn-dark btn-md'>submit</button>
                </form>
                <div className='delete-icon' onClick={handleCloseModal}>x</div>
            </div>
        </div>
    )
}