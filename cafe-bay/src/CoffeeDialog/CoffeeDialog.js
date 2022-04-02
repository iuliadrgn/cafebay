import React from "react";
import styled from "styled-components";
import {CoffeeLabel} from "../Menu/CoffeeGrid";
import {caramel} from "../styles/colors";

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
`

export function CoffeeDialog({openCoffee, setOpenCoffee, setOrders, orders}){
    function close() {
        setOpenCoffee();
    }
    if (!openCoffee) return null;

    const order = {
        name: openCoffee.name
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

            </DialogContent>
            <DialogFooter>
                <ConfirmButton onClick={addToOrder}>
                    add to order
                </ConfirmButton>
            </DialogFooter>

        </Dialog>

     </>

    );
}