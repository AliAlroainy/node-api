const express = require('express');
const router = express.Router();
const axios = require('axios').default;

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Product' });
});

/* GET home page. */
router.get('/products', async (req, res, next) => {
  try {
    let response = await axios.get('https://dummyjson.com/products');

    res.render('products', {
      products: response.data.products,
    });
  } catch (err) {
    console.log(err);
  }
});


router.get('/products/search', async (req, res, next) => {
  try {
    const query = req.query.q;
    let response = await axios.get(
      `https://dummyjson.com/products/search?q=${query}`
    );

    res.render('search', {
      products: response.data.products,
    });
  } catch (err) {
    console.log(err);
    res.send('sorry , we have error')
  }
});

router.get('/products/:id', async (req, res, next) => {
  try {
    const productId = req.params.id;
    let response = await axios.get(
      `https://dummyjson.com/products/${productId}`
    );

    res.render('product', {
      product: response.data,
    });
  } catch (err) {
    console.log(err);
    res.send('sorry , we have error')
  }
});
router.get('/products/categories', async (req, res, next) => {
  try {
    
    let response = await axios.get(
      `https://dummyjson.com/products/${productId}`
    );

    res.render('catogray', {
      products: response.data.products,
    });
  } catch (err) {
    console.log(err);
    res.send('sorry , we have error')
  }
});
router.get('/products/categories:categoryName', async (req, res, next) => {
  try {
    
    let response = await axios.get(
      `https://dummyjson.com/products/categories`
    );

    res.render('catogray', {
      products: response.data.products,
    });
  } catch (err) {
    console.log(err);
    res.send('sorry , we have error')
  }
});
module.exports = router;
