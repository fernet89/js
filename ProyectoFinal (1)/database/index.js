const db_cash= 10000;
const db_productos =[
    {id: 1, name:"Manzana", stored:1500, price:15 },
    {id: 2, name:"Pera", stored:1500, price:13 },
    {id: 3, name:"Sandias", stored:1500, price:14 },
   {id: 4, name:"Durazno", stored:1500, price:15 } 
];
const db_sales= [
    {product:1,
        date:new Date(2022,04,10),
        quantity:100,
        totalPrice:1500,
        },
];
const db_purchase = [
  { product:2,
    date: new Date(2022,04,10),
    quantity:50,
    price:7.50,
    totalPrice:375
  } 

]

const db_delete = [
  { 
    id:100,
    name:"producto eliminado",
    date: new Date(2022,04,10),
    stored:60,
    price:9.50,
    reason:"producto fuera de stock"
  } 

]