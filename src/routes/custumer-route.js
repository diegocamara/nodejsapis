'use strict';

const express = require('express');
const router = express.Router();
const customerController = require('./../controllers/custumer-controller');

router.post('/', customerController.post);

router.post('/authenticate', customerController.authenticate);

module.exports = router;