export function formatPrice(price){
    return price.toLocaleString('en-US',{
        style: 'currency',
        currency: 'RON'
    })
}

export const coffeeItems = [
    {
        name: 'Espresso',
        img: 'images/espresso.jpg',
        section: "Hot Beverage",
        price: 6
    },
    {
        name: 'Americano',
        img: 'images/americano.jpg',
        section: "Hot Beverage",
        price: 8
    },
    {
        name: 'Latte',
        img: 'images/latte.jpg',
        section: "Hot Beverage",
        price: 9
    },
    {
        name: 'Latte Macchiato',
        img: 'images/special.jpg',
        section: "Hot Beverage",
        price: 9
    }
    ,
    {
        name: 'Flat White',
        img: 'images/flatwhite.jpg',
        section: "Hot Beverage",
        price: 8
    },
    {
        name: 'Frappe',
        img: 'images/frappe.jpg',
        section: "Cold Beverage",
        price: 10
    },
    {
        name: 'Iced Coffee',
        img: 'images/iced.jpg',
        section: "Cold Beverage",
        price: 9
    },
    {
        name: 'Irish Coffee',
        img: 'images/irish.jpg',
        section: "Hot Beverage",
        price: 16
    },
    {
        name: 'Mocha',
        img: 'images/mocha.JPG',
        section: "Hot Beverage",
        price: 12
    },
    {
        name: 'Salted Caramel Frappe',
        img: 'images/salted.png',
        section: "Cold Beverage",
        price: 13
    },
    {
        name: 'Cappuccino',
        img: 'images/cappuccino.jpg',
        section: "Hot Beverage",
        price: 8
    },
    {
        name: 'Decaf Coffee',
        img: 'images/decaf.jpg',
        section: "Hot Beverage",
        price: 7
    }
];

export const coffees = coffeeItems.reduce((res, coffee) => {
    if(!res[coffee.section]){
        res[coffee.section] = [];
    }
    res[coffee.section].push(coffee);
    return res;
}, {});