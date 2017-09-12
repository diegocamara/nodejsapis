'use strict';

const express = require('express');
const router = express.Router();
const custumerController = require('./../controllers/custumer-controller');

router.post('/', custumerController.post);

module.exports = router;