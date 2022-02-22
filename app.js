import express from 'express' ;
import fetch from 'node-fetch';

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.set('views', 'views');

async function fechHome(req, response) {
    var category = null;
    var allCategory = null;


    await  fetch('https://dummyjson.com/products/category/smartphones')
    .then(res0 => res0.json())
    .then(res0 => allCategory = res0.products)

    await fetch('https://dummyjson.com/products/categories')
    .then(res => res.json())
    .then(res => category = res)

    await fetch('https://dummyjson.com/products?limit=30&skip=15&select=title,price,rating,discountPercentage,thumbnail')
        .then(res1 => res1.json())
        .then(res1 => response.render('index', { Products: res1.products , cat:category , catall : allCategory  }))
}

function cat(req,res){
    fetch('https://dummyjson.com/products/categories')
.then(res => res.json())
.then(res => response.render('index', { cat: res }))
}

app.get(['/', '/home'],(req,res)=>{
    fechHome(req, res);
    // cat(req,res);
});

app.get('/product',(req,res)=>{
    
    res.render('product');
   
});
 
app.get('/checkout',(req,res)=>{
    
    res.render('checkout');  
});


app.get('/store',(req,res)=>{
    
    res.render('store');
   
});
 

app.use(function(req, res) {
    res.render("404");
    });



const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
