'use strict';

const mongoose = require('mongoose');
const Custumer = mongoose.model('Custumer');

exports.create = async (data) => {
    let custumer = new Custumer(data);
    await custumer.save();
};