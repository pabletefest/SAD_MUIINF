const express = require('express');
const service = express();
const axios = require('axios');
const Producto = require('./../Producto');

/**
 * Class representing the shopping cart object, in charge of managing the products the user wants to add/remove.
 */
module.exports = class ShoppingCart
{
    products = [];
    mongoDbPort = 0;

    constructor()
    {
        var that = this; //take reference to this instance for assigning the port later on (this keyword can't be used directly inside then() callback)
        axios.get(`http://localhost:3000/find/MongoDB/1.0.0`).then(function(response){
            let mongoDbInfo = response.data
            that.mongoDbPort = mongoDbInfo.port;
        });
    }

    /**
     * Checks for product quantity stock before inserting the product in the array.
     * If no stock is available, it is thrown an error and a message indicating inexistent stock is printed.
     * @param product The product to be inserted in the shopping cart.
     */
    addProduct(product)
    {
        console.log("\nAdding product...\n");
        let isThereStock = true;

        axios.get(`http://localhost:${this.mongoDbPort}/mongodb/stock/${product.getCode()}/${product.getDescription()}/${product.getPrice()}/${product.getQuantity()}`)
        .then(function (response) {

            if (response.data.result)
            {
                isThereStock = true;       
            }
            else
            {
                console.log("No stock available!\n");
                isThereStock = false;
            }
        });

        if (isThereStock)
        {
            this.products.push(product);
            console.log("Stock available!\n");
            console.log("Product added correctly!\n");
        }
        
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

    getProducts(code)
    {
        const productsFiltered = this.products.filter(product => product.code == code);

        return productsFiltered;
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
// const launchService = () => {
//     let cart = new ShoppingCart();

//     service.get('/carrito/get/:code', (req, res) => {
//         const { code } = req.params;

//         const products = cart.getProducts(code);
//         return res.json(products);
//     });

//     service.put('/carrito/add/:code/:description/:price/:quantity', (req, res) => {
//         const { code, description, price, quantity } = req.params;

//         let productObject = new Producto(code, description, price, quantity);
//         const productAdded = cart.addProduct(productObject);
//         return res.json(productAdded);
//     });

//     service.delete('/carrito/remove/:code/:description/:price/:quantity', (req, res) => {
//         const { code, description, price, quantity } = req.params;

//         const product = cart.removeProduct(new Product(code, description, price, quantity));
//         return res.json(product);
//     });

//     const server = service.listen(0, function(){
//         const registerService = () => axios.put(`http://localhost:3000/register/${serviceName}/${version}/${server.address().port}`);
//         setInterval(registerService, 5000);
//         console.log(`Carrito listening in port: ${server.address().port}`); 
        
//         axios.get(`http://localhost:3000/find/MongoDB/1.0.0`).then(function(response){
//             let mongoDbInfo = response.data
//             mongoDbPort = mongoDbInfo.port;
//         });
//     }); 
// }

// launchService();
