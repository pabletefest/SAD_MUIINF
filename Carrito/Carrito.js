"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var DB = require("./MongoDB");
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
/**
 * Class representing the shopping cart object, in charge of managing the products the user wants to add/remove.
 */
var ShoppingCart = /** @class */ (function () {
    function ShoppingCart() {
        //products : Array<string> = []; //equivalent to line below
        this.products = [];
    }
    /**
     * Checks for product quantity stock before inserting the product in the array.
     * If no stock is available, it is thrown an error and a message indicating inexistent stock is printed.
     * @param product The product to be inserted in the shopping cart.
     */
    ShoppingCart.prototype.addProduct = function (product) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, DB.checkProductStock(product, function (err, result, isStock) {
                            if (err)
                                throw err;
                            if (isStock) {
                                _this.products.push(product);
                                console.log("Stock available!");
                            }
                            else
                                console.log("No stock available!");
                            // console.log(result);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Checks for the product in the array of elements and if the product was found, it deletes it from the array
     * @param product The product to insert in the shopping cart.
     */
    ShoppingCart.prototype.removeProduct = function (product) {
        var indexObject = this.products.indexOf(product);
        if (indexObject == -1)
            // return;
            console.log("Couldn't remove the product, not present!");
        this.products.splice(indexObject, 1);
    };
    /**
     * Prints a formatted message representing every element in the array of products of the shopping cart.
     */
    ShoppingCart.prototype.toString = function () {
        console.log('Number of products in this shopping cart: ', this.products.length, '\n', '\n');
        console.log(this.products);
        // let arrayFiltered = this.products.filter(product => product != undefined);
        // this.products.forEach(product => {
        //     if (product != undefined && product !== undefined)
        //         console.log(product.toString(), '\n');
        // });
    };
    return ShoppingCart;
}());
function testCart() {
    var shpCart = new ShoppingCart();
    DB.addProductsDB(function (err, result) {
        if (err)
            throw err;
        var product1 = new Product(5, 'Mouse', 20, 1);
        var product2 = new Product(3, 'Teclado', 30, 1);
        setTimeout(function () { shpCart.addProduct(product1); }, 1000);
        setTimeout(function () { shpCart.addProduct(product2); }, 2000);
        setTimeout(function () { shpCart.toString(); }, 3000);
        setTimeout(function () { shpCart.removeProduct(product1); }, 4000);
        setTimeout(function () { shpCart.toString(); }, 5000);
    });
}
testCart();
