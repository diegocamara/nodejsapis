'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ItemValidator = require('./../validators/item-validator');


exports.get = (req, res, next) => {

    Product.find({ active: true }, 'title slug price').then(data => {
        res.status(200).send(data);
    }).catch(error => {
        res.status(400).send(error);
    });

};

exports.getBySlug = (req, res, next) => {
    Product.findOne({ slug: req.params.slug, active: true }, 'title slug description price').then(data => {
        res.status(200).send(data);
    }).catch(error => {
        res.status(400).send(error);
    });
};

exports.getById = (req, res, next) => {
    Product.findById(req.params.id).then(data => {
        res.status(200).send(data);
    }).catch(error => {
        res.status(400).send(error);
    });
};

exports.getByTag = (req, res, next) => {
    Product.find({ tags: req.params.tag }, 'title slug description price tags').then(data => {
        res.status(200).send(data);
    }).catch(error => {
        res.status(400).send(error);
    });
};

exports.post = (req, res, next) => {

    let itemValidator = new ItemValidator();

    itemValidator.hasMaxLen(req.body.title, 10, 'O título deve conter no máximo 10 caracteres.');
    
    if(!itemValidator.isValid()){
        res.status(400).send(itemValidator.errors());
        return;
    }

    let product = new Product(req.body);

    product.save().then(item => {
        res.status(201).send({
            message: 'Produto cadastrado com sucesso!'
        });
    }).catch(error => {
        res.status(400).send({
            message: 'Falha ao cadastrar produto!',
            data: error
        });
    });

};

exports.put = (req, res, next) => {

    Product.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            desciption: req.body.description,
            price: req.body.price,
            slug: req.body.slug
        }
    }).then(item => {

        res.status(200).send({
            message: 'Produto atualizado com sucesso!'
        });

    }).catch(error => {

        res.status(400).send({
            message: 'Falha ao atualizar produto!',
            data: error
        });

    });


};

exports.delete = (req, res, mext) => {

    Product.findOneAndRemove(req.body.id).then(item => {
        res.status(200).send({
            message: 'Produto removido com sucesso!'
        });
    }).catch(error => {
        res.status(400).send({
            message: 'Falha ao remover produto!',
            data: error
        });
    });

};