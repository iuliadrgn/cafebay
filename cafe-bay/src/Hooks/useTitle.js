import {useEffect} from "react";

export function useTitle({openCoffee, orders}){
    useEffect(() =>{
        if(openCoffee){
            document.title = openCoffee.name;
        }else {
            document.title = orders.length === 0 ? `Cafe Bay` : `[${orders.length}] items in your order`;
        }
    });
}