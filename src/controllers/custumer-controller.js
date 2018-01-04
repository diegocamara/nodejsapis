'use strict';

// const mongoose = require('mongoose');
const ItemValidator = require('./../validators/item-validator');
const CustomerRepository = require('../repositories/custumer-repository');
const authService = require('./../services/auth-service');
let bcrypt = require('bcrypt');

exports.post = async (req, res, next) => {
    let itemValidator = new ItemValidator();

    itemValidator.hasMinLen(req.body.name, 2, 'O nome deve conter pelo menos 2 caracteres.');

    if (!itemValidator.isValid()) {
        res.status(400).send(itemValidator.errors());
        return;
    }

    try {
        await CustomerRepository.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
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

exports.authenticate = async (req, res, next) => {

    try {
        const customer = await CustomerRepository.authenticate({
            email: req.body.email
        });

        if (customer) {

            bcrypt.compare(req.body.password, customer.password, function (err, result) {

                if (result) {
                    
                    let data = {
                        name: customer.name,
                        email: customer.email
                    };

                    const token = await authService.generateToken(data);

                    res.status(201).send({
                        token: token,
                        data: data
                    });


                } else {
                    res.status(401).send({
                        message: 'Senha inválida'
                    });
                    return;
                }


            });

            console.log(customer);

        } else {
            res.status(404).send({
                message: 'Usuário inválido'
            });
            return;
        }


    } catch (e) {
        res.status(500).send({
            message: 'Falha ao cadastrar cliente!',
            data: e
        });
    }

};