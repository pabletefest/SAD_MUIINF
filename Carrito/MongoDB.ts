import * as mongodb from 'mongodb';
import { strict as assert } from 'assert';
// const {MongoClient} = require('mongodb');
// import mongodb from 'mongodb';
// let client = mongodb.MongoClient;

let localConnectionURL : string = 'mongodb+srv://admin:root@cluster0.gxfn0.mongodb.net/ProductsDB?retryWrites=true&w=majority'; 

/**
 * Opens a connection to the MongoDB and inserts some products to it.
 * @param callback Function to be called when the DB finished adding the products.
 */
export const addProductsDB = async (callback) : Promise<any> => {
    const clientDB = await mongodb.MongoClient.connect(localConnectionURL);
    let db : any = clientDB.db('ProductsDB');
    let collection = db.collection('Product');
    collection.deleteMany({});
    collection.insertMany([{ code: 1, description: 'Portatil', price: 900, quantity: 7 },{ code: 2, description: 'Sobremesa', price: 1200, quantity: 2 }
    ,{ code: 3, description: 'Teclado', price: 30, quantity: 5 },{ code: 4, description: 'Webcam', price: 40, quantity: 2 }
    ,{ code: 5, description: 'Mouse', price: 20, quantity: 1 }
  ], function (err : any, result : any) {
    // assert.equal(err, null);
    // assert.equal(5, result.result.n);
    // assert.equal(5, result.ops.length);
    console.log("Se han insertado 5 elementos");
    callback(err, result),
    clientDB.close();
    // db.close();
    });
}

/**
 * Checks for a product stored in the MongoDB.
 * @param product The product to be checked for stock in the MongoDB.
 * @param callback The function called when finding the element in the DB finished.
 * @returns True indicating the product was found successfully in the DB, false otherwise.
 */
export const checkProductStock = async (product, callback) : Promise<void> => {
    // let stockAvailable : boolean = true;
    const clientDB = await mongodb.MongoClient.connect(localConnectionURL);
    let db : any = clientDB.db('ProductsDB');
    let collection = db.collection('Product');
    collection.findOne({
        $and:
        [
            {code:product.code}, 
			{quantity:{$gte:product.quantity}} 
        ]
    }, function(err,result){			
        if(result){
            console.log("Stock suficiente del producto " + result.code+ ": " + result.description +"\n");
            // db.close();
            clientDB.close();
            callback(err, result, true);
            // stockAvailable = true;
        }else{
            console.log("El producto " +product.code+": " + product.description + " no puede añadirse"+
             " ya que no existe en la base o no hay stock suficiente\n(Stock menor a " + product.quantity + ")\n");
            // db.close();
            clientDB.close();
            callback(err, result, false);
            // stockAvailable = false;
        }
    });

    // return stockAvailable;
}
