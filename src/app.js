'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost/nodestore');

const Product = require('./models/product');

const indexRoute = require('./routes/index-route');
const productsRoute = require('./routes/products-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoute);
app.use('/products', productsRoute);

module.exports = app;