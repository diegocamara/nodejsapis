'use strict';

const mongoose = require('mongoose');
const ItemValidator = require('./../validators/item-validator');
const ProductRepository = require('../repositories/product-repository');

exports.get = async (req, res, next) => {
    try {
        let data = await ProductRepository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar a requisição'
        });
    }
};

exports.getBySlug = async (req, res, next) => {
    try {
        let data = await ProductRepository.getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send(error);
    }
};

exports.getById = async (req, res, next) => {
    try {
        let data = await ProductRepository.getById(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send(error);
    }
};

exports.getByTag = async (req, res, next) => {
    try {
        let data = await ProductRepository.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send(error);
    }
};

exports.post = async (req, res, next) => {
    let itemValidator = new ItemValidator();

    itemValidator.hasMaxLen(req.body.title, 10, 'O título deve conter no máximo 10 caracteres.');

    if (!itemValidator.isValid()) {
        res.status(400).send(itemValidator.errors());
        return;
    }

    try {
        await ProductRepository.create(req.body);
        res.status(201).send({
            message: 'Produto cadastrado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao cadastrar produto!',
            data: error
        });
    }

};

exports.put = async (req, res, next) => {
    try {
        await ProductRepository.update(req.params.id, {
            title: req.body.title,
            desciption: req.body.description,
            price: req.body.price,
            slug: req.body.slug
        });
        res.status(200).send({
            message: 'Produto atualizado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao atualizar produto!',
            data: error
        });
    }
};

exports.delete = async (req, res, mext) => {
    try {
        await ProductRepository.delete(req.body.id);
        res.status(200).send({
            message: 'Produto removido com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao remover produto!',
            data: error
        });
    }
};