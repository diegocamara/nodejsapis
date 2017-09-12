'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost/nodestore');

const Product = require('./models/product');
const Custumer = require('./models/custumer');
const Order = require('./models/order');

const indexRoute = require('./routes/index-route');
const productsRoute = require('./routes/products-route');
const custumerRoute = require('./routes/custumer-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoute);
app.use('/products', productsRoute);
app.use('/custumers', custumerRoute);

module.exports = app;