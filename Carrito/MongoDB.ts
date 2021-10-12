import {MongoClient} from 'mongodb';
import { strict as assert } from 'assert';
// const {MongoClient} = require('mongodb');
// import mongodb from 'mongodb';
// let client = mongodb.MongoClient;

let localConnectionURL : string = 'mongodb://localhost:8000/productsDB'; 

export const addProductsDB = async (product : Product) : Promise<any> => {
    const clientDB : MongoClient = await MongoClient.connect(localConnectionURL);
    let db = clientDB.db('productsDB');
    let collection = db.collection('products');
    collection.insertMany([{ code: 1, description: 'Portatil', price: 900, quantity: 7 },{ code: 2, description: 'Sobremesa', price: 1200, quantity: 2 }
    ,{ code: 3, description: 'Teclado', price: 30, quantity: 5 },{ code: 4, description: 'Webcam', price: 40, quantity: 2 }
    ,{ code: 5, description: 'Mouse', price: 20, quantity: 1 }
  ], function (err, result) {
    assert.equal(err, null);
    assert.equal(5, result.result.n);
    assert.equal(5, result.ops.length);
    console.log("Se han insertado 5 elementos");
    
    db.close();
    });
}

export const checkProductStock = async (product : Product) : Promise<any> => {
    const clientDB : MongoClient = await MongoClient.connect(localConnectionURL);
    let db = clientDB.db('productsDB');
    let collection = db.collection('products');
    collection.findOne({
        $and:
        [
            {code:product.code}, 
			{quantity:{$gte:product.quantity}} 
        ]
    }, function(err,result){			
        if(result){
            console.log("Stock suficiente del producto " + result.code+ ": " + result.description +"\n");
            db.close();

        }else{
            console.log("El producto " +product.code+": " + product.description + " no puede añadirse"+
             " ya que no existe en la base o no hay stock suficiente\n(Stock menor a " + product.quantity + ")\n");
            db.close();
        }
    });

}
