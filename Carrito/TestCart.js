"use strict";
exports.__esModule = true;
var Producto_1 = require("./Producto");
var Carrito_1 = require("./Carrito");
var DB = require("./MongoDB");
function testCartWithoutDB() {
    console.log('\n\n', "TESTING BASIC SHOPPING CART", '\n');
    var shpCart = new Carrito_1.ShoppingCart();
    var product1 = new Producto_1.Product(5, 'Mouse', 20, 1);
    var product2 = new Producto_1.Product(3, 'Teclado', 30, 1);
    setTimeout(function () { shpCart.addProductNoDB(product1); }, 1000);
    setTimeout(function () { shpCart.addProductNoDB(product2); }, 2000);
    setTimeout(function () { shpCart.toString(); }, 3000);
    setTimeout(function () { shpCart.removeProduct(product1); }, 4000);
    setTimeout(function () { shpCart.toString(); }, 5000);
}
function testCartWithDB() {
    console.log('\n\n', "TESTING MONGODB DATABASE INTEGRATED IN SHOPPING CART", '\n');
    var shpCart = new Carrito_1.ShoppingCart();
    DB.addProductsDB(function (err, result) {
        if (err)
            throw err;
        var product1 = new Producto_1.Product(5, 'Mouse', 20, 1);
        var product2 = new Producto_1.Product(3, 'Teclado', 30, 1);
        setTimeout(function () { shpCart.addProduct(product1); }, 1000);
        setTimeout(function () { shpCart.addProduct(product2); }, 2000);
        setTimeout(function () { shpCart.toString(); }, 3000);
        setTimeout(function () { shpCart.removeProduct(product1); }, 4000);
        setTimeout(function () { shpCart.toString(); }, 5000);
    });
}
testCartWithoutDB();
setTimeout(testCartWithDB, 6000);
