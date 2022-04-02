import React from "react";
import styled from "styled-components";
import {DialogContent, DialogFooter, ConfirmButton} from "../CoffeeDialog/CoffeeDialog";

const OrderStyled = styled.div`
position: fixed;
right: 0px;
top: 55px;
width: 340px;
background-color: white;
height: 100%;
box-shadow: 3px 0px 3px 3px brown;
z-index: 10;
display: flex;
flex-direction: column;
`;

const OrderContent = styled(DialogContent)`
padding: 20px;
height: 77%;
`;

export function Order(){
    return <OrderStyled>

            <OrderContent>
                ye kam goala komanda
            </OrderContent>
            <DialogFooter>
                <ConfirmButton>
                    checkout
                </ConfirmButton>
            </DialogFooter>

    </OrderStyled>
}