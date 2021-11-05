const express = require('express');
const service = express();
const MongoDB = require('./MongoDB.js');
let Product = require('./../Producto');

module.exports = () => {
    MongoDB.addProductsDB();
    
    service.get('/mongodb/stock/:code/:description/:price/:quantity', async (req, res) => {
        const { code, description, price, quantity } = req.params;

        console.log('Checking for product stock...');
        let product = new Product(code, description, price, quantity);
        let isThereStock = await MongoDB.checkProductStock(product);
        return res.json({ result: isThereStock });
    });

    return service;
}