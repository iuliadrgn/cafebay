import React from "react";
import styled from "styled-components";
import {DialogContent, DialogFooter, ConfirmButton} from "../CoffeeDialog/CoffeeDialog"
import {formatPrice} from "../Data/CoffeeData";
import {getPrice} from "../CoffeeDialog/CoffeeDialog";

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

const OrderContainer = styled.div`
padding: 10px 0px;
border-bottom: 1px solid brown;
`;

const OrderItem = styled.div`
padding: 10px 0px;
display: grid;
grid-template-column: 60px 100px 10px 30px;
justify-content: space-between;
`;

export function Order({orders}){
    return <OrderStyled>
        {orders.length === 0 ?
            ( <OrderContent>
                ye kam goala komanda
            </OrderContent>
            ) : (
                <OrderContent> <OrderContainer> Your order: </OrderContainer>{""}
                    {orders.map(order => (
                      <OrderContainer>
                        <OrderItem>
                            <div>{order.quantity}</div>
                            <div>{order.name}</div>
                            <div/>
                            <div>{formatPrice(getPrice(order))}</div>
                        </OrderItem>
                      </OrderContainer>
                    ))}
                </OrderContent>
            )}
            <DialogFooter>
                <ConfirmButton>
                    checkout
                </ConfirmButton>
            </DialogFooter>

    </OrderStyled>
}