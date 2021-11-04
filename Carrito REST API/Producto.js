"use strict";
exports.__esModule = true;
exports.Product = void 0;
/**
 * Class representing a product. It specifies an ID for the product, a description of it, its price and the quantity of the same type the user wants to add.
 */
var Product = /** @class */ (function () {
    function Product(code, description, price, quantity) {
        this.code = code;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
    }
    Product.prototype.toString = function () {
        console.log('[', this.code, ': ', this.description, ']', ' with price: ', this.price, ' and quantity: ', this.quantity, '\n');
    };
    return Product;
}());
exports.Product = Product;
