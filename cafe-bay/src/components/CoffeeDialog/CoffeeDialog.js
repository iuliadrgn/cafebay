import React from "react";
import styled from "styled-components";
import {CoffeeLabel} from "../Menu/CoffeeGrid";
import {caramel} from "../../styles/colors";
import {formatPrice} from "../../Data/CoffeeData";
import {QuantityInput} from "./QuantityInput";
import {useQuantity} from "../Hooks/useQuantity";
import {Extras} from "./Extras";
import {useExtras} from "../Hooks/useExtras";

const Dialog = styled.div`
width: 500px;
background-color: white;
position: fixed;
left: calc(50% - 250px);
max-height: calc(100% - 100px);
top 150px;
z-index: 5;

display: flex;
flex-direction:column;
`;

export const DialogContent = styled.div`
overflow: auto;
min-height: 100px;
padding: 0px 40px;
`;

export const DialogFooter = styled.div`
box-shadow: 0px -2px 7px 0px brown;
height: 60px;
display: flex;
justify-content: center;
`;

export const ConfirmButton = styled.div`
margin: 10px;
color: white;
height: 20px;
border-radius: 5px;
padding: 10px;
text-align: center;
width: 200px;
cursor: pointer;
background-color: ${caramel};
`;

const DialogShadow = styled.div`
position: fixed;
height: 100%;
width: 100%;
top: 0px;
background-color: black;
opacity: 0.7;
z-index: 4;
`;

const DialogBanner = styled.div`
min-height: 200px;
margin-bottom: 20px;
${({img}) => `background-image: url(${img});`}
background-position: center;
background-size: cover;
`;

const DialogBannerName = styled(CoffeeLabel)`
top: 50px;
font-size: 30px;
padding: 5px 40px;
`;

export function getPrice(order){
return order.quantity * order.price;
}

function hasExtras(coffee){
    return coffee.section === 'Hot Beverage';
}

function CoffeeDialogContainer({openCoffee, setOpenCoffee, setOrders, orders}){
    const quantity = useQuantity(openCoffee && openCoffee.quantity);
    const extras = useExtras(openCoffee.extras);
    const isEditing = openCoffee.index > -1;

    function close() {
        setOpenCoffee();
    }
    if (!openCoffee) return null;

    const order = {
        ...openCoffee,
        quantity: quantity.value,
        extras: extras.extras
    };

    function editOrder(){
        const newOrders = [...orders];
        newOrders[openCoffee.index] = order;
        setOrders(newOrders);
        close();
    }

    function addToOrder(){
        setOrders([...orders, order]);
        close();
    }

    return (
     <>
        <DialogShadow onClick={close} />
        <Dialog>
            <DialogBanner img={openCoffee.img}>
                <DialogBannerName>{openCoffee.name}</DialogBannerName>
            </DialogBanner>
            <DialogContent>
                <QuantityInput quantity={quantity}/>
                {hasExtras(openCoffee) && (
                <>
                    <h3>Would you like something extra?</h3>
                   <Extras {...extras} />
                </>
                )}
            </DialogContent>
            <DialogFooter>
                <ConfirmButton onClick={isEditing ? editOrder : addToOrder}>
                    {isEditing ? `update order: ` : `add to order:`}
                    {formatPrice(getPrice(order))}
                </ConfirmButton>
            </DialogFooter>

        </Dialog>

     </>

    );
}

export function CoffeeDialog(props){
    if (!props.openCoffee) return null;
    return <CoffeeDialogContainer {...props}/>
}