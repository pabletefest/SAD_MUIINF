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
exports.checkProductStock = exports.addProductsDB = void 0;
var mongodb = require("mongodb");
var assert_1 = require("assert");
// const {MongoClient} = require('mongodb');
// import mongodb from 'mongodb';
// let client = mongodb.MongoClient;
var localConnectionURL = 'mongodb://localhost:8000/productsDB';
/**
 * Opens a connection to the MongoDB and inserts some products to it.
 * @param callback Function to be called when the DB finished adding the products.
 */
var addProductsDB = function (callback) { return __awaiter(void 0, void 0, void 0, function () {
    var clientDB, db, collection;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, mongodb.MongoClient.connect(localConnectionURL)];
            case 1:
                clientDB = _a.sent();
                db = clientDB.db('productsDB');
                collection = db.collection('products');
                collection.insertMany([{ code: 1, description: 'Portatil', price: 900, quantity: 7 }, { code: 2, description: 'Sobremesa', price: 1200, quantity: 2 },
                    { code: 3, description: 'Teclado', price: 30, quantity: 5 }, { code: 4, description: 'Webcam', price: 40, quantity: 2 },
                    { code: 5, description: 'Mouse', price: 20, quantity: 1 }
                ], function (err, result) {
                    assert_1.strict.equal(err, null);
                    assert_1.strict.equal(5, result.result.n);
                    assert_1.strict.equal(5, result.ops.length);
                    console.log("Se han insertado 5 elementos");
                    callback(err, result),
                        db.close();
                });
                return [2 /*return*/];
        }
    });
}); };
exports.addProductsDB = addProductsDB;
/**
 * Checks for a product stored in the MongoDB.
 * @param product The product to be checked for stock in the MongoDB.
 * @param callback The function called when finding the element in the DB finished.
 * @returns True indicating the product was found successfully in the DB, false otherwise.
 */
var checkProductStock = function (product, callback) { return __awaiter(void 0, void 0, void 0, function () {
    var stockAvailable, clientDB, db, collection;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, mongodb.MongoClient.connect(localConnectionURL)];
            case 1:
                clientDB = _a.sent();
                db = clientDB.db('productsDB');
                collection = db.collection('products');
                collection.findOne({
                    $and: [
                        { code: product.code },
                        { quantity: { $gte: product.quantity } }
                    ]
                }, function (err, result) {
                    if (result) {
                        console.log("Stock suficiente del producto " + result.code + ": " + result.description + "\n");
                        db.close();
                        callback(err, result);
                        stockAvailable = true;
                    }
                    else {
                        console.log("El producto " + product.code + ": " + product.description + " no puede añadirse" +
                            " ya que no existe en la base o no hay stock suficiente\n(Stock menor a " + product.quantity + ")\n");
                        db.close();
                        callback(err, result);
                        stockAvailable = false;
                    }
                });
                return [2 /*return*/, stockAvailable];
        }
    });
}); };
exports.checkProductStock = checkProductStock;
