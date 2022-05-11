import {useState} from "react";

export function useOpenCoffee(){
    const[openCoffee, setOpenCoffee] = useState();
    return {
        openCoffee,
        setOpenCoffee
    }
}