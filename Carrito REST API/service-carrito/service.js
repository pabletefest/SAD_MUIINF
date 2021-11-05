const express = require('express');
const service = express();
const ShoppingCart = require('./Carrito.js');
let Product = require('./../Producto');

module.exports = () => {
    let cart = new ShoppingCart();

    service.get('/carrito/get/:code', (req, res) => {
        const { code } = req.params;

        const products = cart.getProducts(code);
        return res.json(products);
    });

    service.put('/carrito/add/:code/:description/:price/:quantity', (req, res) => {
        const { code, description, price, quantity } = req.params;

        let productObject = new Product(code, description, price, quantity);
        const productAdded = cart.addProduct(productObject);
        return res.json(productAdded);
    });

    service.delete('/carrito/remove/:code/:description/:price/:quantity', (req, res) => {
        const { code, description, price, quantity } = req.params;

        let productObject = new Product(code, description, price, quantity);
        const product = cart.removeProduct(productObject);
        return res.json(product);
    });

    return service;
}