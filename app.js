import express from 'express' ;
import fetch from 'node-fetch';

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.set('views', 'views');

async function fechHome(req, response) {
    var category = null;
    var allCategory = null;
    var smart = null;
    var lighting = null;



    await  fetch('https://dummyjson.com/products/category/smartphones')
    .then(res0 => res0.json())
    .then(res0 => allCategory = res0.products)

    await  fetch('https://dummyjson.com/products/category/laptops')
    .then(res01 => res01.json())
    .then(res01 => smart = res01.products)

    
    await  fetch('https://dummyjson.com/products/category/lighting')
    .then(res011 => res011.json())
    .then(res011 => lighting = res011.products)


    await fetch('https://dummyjson.com/products/categories')
    .then(res => res.json())
    .then(res => category = res)

    await fetch('https://dummyjson.com/products?limit=30&skip=15&select=title,price,rating,discountPercentage,thumbnail')
        .then(res1 => res1.json())
        .then(res1 => response.render('index', { Products: res1.products , cat:category , catall : allCategory , laptops : smart , light : lighting }))
}



app.get(['/', '/home'],(req,res)=>{
    fechHome(req, res);
    // cat(req,res);
});

app.get('/product/:id?',(req,res)=>{
    
    res.render('product');
   
});

app.get('/:prod_id([0-9]{0,10})', async (req, response) => {
    var category = null;
   

    if(req.params.prod_id) {
        await fetch('https://dummyjson.com/products/categories')
        .then(res => res.json())
        .then(res => category = res)

        fetch('https://dummyjson.com/products/'+req.params.prod_id)
        .then(res => res.json())
        .then(res => response.render('product', {cat:category , products: res}));
    }
    else{
        fetch('https://dummyjson.com/products/')
        .then(res => res.json())
        .then(res => response.render('product', {  products: res.products}));
    }
});



app.get('/search/:name', async (req,res)=>{
    if(req.params.name){
  await  fetch('https://dummyjson.com/posts/search?q='+ req.params.name)
    .then(res => res.json())
    .then(res => response.render('store', {search: res.post}));
    } 
});

 
app.get('/checkout',(req,res)=>{
    
    res.render('checkout');  
});


app.get('/search',(req,res)=>{
    
    res.render('search');
   
});
 

app.use(function(req, res) {
    res.render("404");
    });



const PORT = process.env.PORT || 2000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
