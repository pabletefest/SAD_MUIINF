import {Product} from './Producto';

const express = require('express');
const service = express();
const axios = require('axios');
const { Product } = require('./Producto');

let serviceName = "Carrito";
let version = "1.0.0";

let mongoDbPort;

/**
 * Class representing the shopping cart object, in charge of managing the products the user wants to add/remove.
 */
class ShoppingCart
{
    products = [];

    constructor()
    {
    }

    /**
     * Adds the product into the ShoppingCart without cheking with the database.
     * @param product The product to be inserted in the shopping cart.
     */

    addProductNoDB(product)
    {
        this.products.push(product);
        console.log("Product added to the shopping cart!\n");
    }

    /**
     * Checks for product quantity stock before inserting the product in the array.
     * If no stock is available, it is thrown an error and a message indicating inexistent stock is printed.
     * @param product The product to be inserted in the shopping cart.
     */
    addProduct(product)
    {
        console.log("\nAdding product...\n");

        const registerService = 
        () => axios.put(`http://localhost:${mongoDbPort}/mongodb/get/${product.getCode()}/${product.getDescription()}
        /${product.getPrice()}/${product.getQuantity()}`)
        .then(function (response) {
            if (response.data.result)
                this.products.push(product);   
            else
                console.log("No stock available!\n");
          });

        return product;
    }

    /**
     * Checks for the product in the array of elements and if the product was found, it deletes it from the array
     * @param product The product to insert in the shopping cart.
     */
    removeProduct(product)
    {
        console.log("\nRemoving product...\n");

        let indexObject = this.products.indexOf(product);

        if (indexObject == -1)
            console.log("Couldn't remove the product, not present!\n");

        this.products.splice(indexObject, 1);

        return product;
    }

    getProduct(code)
    {
        const products = this.products.filter(product => product.code === code);

        return products;
    }

    /**
     * Prints a formatted message representing every element in the array of products of the shopping cart.
     */
    toString()
    {
        console.log('Number of products in this shopping cart: ', this.products.length, '\n', '\n');
        console.log(this.products);
    }
}

const launchService = () => {
    let cart = new ShoppingCart();

    service.get('/carrito/get/:code', (req, res) => {
        const { code } = req.params;

        const products = cart.getProduct(code);
        return res.json(products);
    });

    service.put('/carrito/add/:code/:description/:price/:quantity', (req, res) => {
        const { code, description, price, quantity } = req.params;

        const product = cart.addProduct(new Product(code, description, price, quantity));
        return res.json(product);
    });

    service.delete('/carrito/remove/:code/:description/:price/:quantity', (req, res) => {
        const { code, description, price, quantity } = req.params;

        const product = cart.removeProduct(new Product(code, description, price, quantity));
        return res.json(product);
    });

    const server = service.listen(0, function(){
        const registerService = () => axios.put(`http://localhost:3000/register/${serviceName}/${version}/${server.address().port}`);
        setInterval(registerService, 5000);

        let mongoDbInfo = axios.get(`http://localhost:3000/find/mongodb/1.0.0/`);

        mongoDbPort = mongoDbInfo.port;
    }); 
}

launchService();
