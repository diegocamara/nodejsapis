'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');

const mongoose = require('mongoose');
const app = express();

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB_CONNECTION_URL, {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE,
    useMongoClient: true
});

const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

const indexRoute = require('./routes/index-route');
const productsRoute = require('./routes/products-route');
const customerRoute = require('./routes/customer-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoute);
app.use('/products', productsRoute);
app.use('/customers', customerRoute);

module.exports = app;