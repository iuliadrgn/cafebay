import {useState} from "react";

export function useExtras(defaultExtras){
    const [extras, setExtras] = useState(defaultExtras || getDefaultExtras())
    function checkExtra(index){
        const newExtras = [...extras];
        newExtras[index].checked = !newExtras[index].checked;
        setExtras(newExtras)
    }
    return{
        checkExtra,
        extras
    }
}

const extrasList = [
    "sugar",
    "milk",
    "whipped cream",
    "coffee sprinkles",
    "vanilla syrup",
    "caramel syrup",
    "chocolate syrup",
    "salted caramel",
    "crushed oreos",
    "cinnamon"
];

function getDefaultExtras(){
    return extrasList.map(extra => ({
        name: extra,
        checked: false
    }));
}