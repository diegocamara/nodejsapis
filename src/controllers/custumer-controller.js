'use strict';

const mongoose = require('mongoose');
const ItemValidator = require('./../validators/item-validator');
const CustumerRepository = require('../repositories/custumer-repository');

exports.post = async (req, res, next) => {
    let itemValidator = new ItemValidator();

    itemValidator.hasMinLen(req.body.name, 2, 'O nome deve conter pelo menos 2 caracteres.');

    if (!itemValidator.isValid()) {        
        res.status(400).send(itemValidator.errors());
        return;
    }

    try {        
        await CustumerRepository.create(req.body);
        res.status(201).send({
            message: 'Cliente cadastrado com sucesso!'
        });
    } catch (e) {        
        res.status(500).send({
            message: 'Falha ao cadastrar cliente!',
            data: e
        });
    }

};