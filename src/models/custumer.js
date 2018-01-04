'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let bcrypt = require('bcrypt');

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

schema.pre('save', function (next) {
    let custumer = this;

    bcrypt.hash(custumer.password, global.SALT_ROUNDS, (err, hash) => {
        if (err) {
            return next(err);
        }
        custumer.password = hash;
        next();
    });
});

module.exports = mongoose.model('Custumer', schema);