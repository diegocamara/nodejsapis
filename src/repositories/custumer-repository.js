'use strict';

const mongoose = require('mongoose');
const Custumer = mongoose.model('Custumer');

exports.create = async (data) => {
    let custumer = new Custumer(data);
    await custumer.save();
};

exports.authenticate = async (data) => {
    let res = await Custumer.findOne({
        email: data.email
    });
    return res;
};