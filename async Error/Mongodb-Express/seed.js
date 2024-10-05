const Product=require('./models/product');
const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/farmStand')
   .then(() => {
      console.log("COnnection open connected to mongo");
   })
   .catch(err => {
      console.log("ohh no error");
      console.log(err);
   });

//    const p=new Product({
//     name:'Ruby Grapefruit',
//     price:1.99,
//     category:'fruit'
//    })
const seedProducts = [
    {
        name: "Fairy Eggplant",
        price: 1.00,
        category: 'vegetable'
    },
    {
        name: "Organic Goddess Melon",
        price: 4.99,
        category: 'fruit'
    },
    {
        name: "Mini Seedless Watermelon",
        price: 3.99,
        category: 'fruit'
    },
    {
        name: "Organic Celery",
        price: 1.50,
        category: 'vegetable'
    },
    {
        name: "Chocolate Whole Milk",
        price: 2.99,
        category: 'dairy'
    },
    {
        name: "Spicy Red Chili Peppers",
        price: 0.99,
        category: 'vegetable'
    }
];
Product.insertMany(seedProducts)
 .then(p=>{
        console.log(p)
   })
   .catch(err=>{
    console.log(err);
   })

// Product.deleteMany({}).then(msg=>console.log(msg));