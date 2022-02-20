//  import express from 'express';
//  import { render } from 'express/lib/response';

// const app = express();
// //const axios = require('axios')
// //import fetch from 'node-fetch';
// //import 'node-fetch' f fetch;
// // const fs = require('fs');

// // const dummyjson = require('dummy-json');

// // const template = fs.readFileSync('template.hbs', { encoding: 'utf8' });

// import axios from 'axios';


// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));



//  app.get('/api/p', async(req, res) =>{
     
// // fetch('https://dummyjson.com/products')
// // .then(res => res.json())
// // .then(console.log);
// //  const product =  await axios.get(`https://dummyjson.com/products/`);
// //   console.log(res.json(product.json)) ;
// axios.get('https://dummyjson.com/products')
//   .then(function (response) {
//     // handle success
//     console.log(response);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .then(function () {
//     // always executed
//   });
//  var data = axios.get('');
    
// res.json(data);

// });




// app.set('view engine','ejs');

// app.use(express.static('public'));
// const port = process.env.PORT || 3000 ;

// app.get("/", (req,res)=>{
//     // var product =  
//     res.render("index");
//     res.end();
// });


// app.listen(port);
// console.log('server started');


const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

