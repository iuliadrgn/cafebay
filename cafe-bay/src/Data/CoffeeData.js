export const coffeeItems = [
    {
        name: 'Espresso',
        img: 'images/espresso.jpg',
        section: "Hot Beverage"
    },
    {
        name: 'Americano',
        img: 'images/americano.jpg',
        section: "Hot Beverage"
    },
    {
        name: 'Latte',
        img: 'images/latte.jpg',
        section: "Hot Beverage"
    },
    {
        name: 'Latte Macchiato',
        img: 'images/special.jpg',
        section: "Hot Beverage"
    }
    ,
    {
        name: 'Flat White',
        img: 'images/flatwhite.jpg',
        section: "Hot Beverage"
    },
    {
        name: 'Frappe',
        img: 'images/frappe.jpg',
        section: "Cold Beverage"
    },
    {
        name: 'Iced Coffee',
        img: 'images/iced.jpg',
        section: "Cold Beverage"
    },
    {
        name: 'Irish Coffee',
        img: 'images/irish.jpg',
        section: "Hot Beverage"
    },
    {
        name: 'Mocha',
        img: 'images/mocha.JPG',
        section: "Hot Beverage"
    },
    {
        name: 'Salted Caramel Frappe',
        img: 'images/salted.png',
        section: "Cold Beverage"
    },
    {
        name: 'Cappuccino',
        img: 'images/cappuccino.jpg',
        section: "Hot Beverage"
    },
    {
        name: 'Decaf Coffee',
        img: 'images/decaf.jpg',
        section: "Hot Beverage"
    }
];

export const coffees = coffeeItems.reduce((res, coffee) => {
    if(!res[coffee.section]){
        res[coffee.section] = [];
    }
    res[coffee.section].push(coffee);
    return res;
}, {});