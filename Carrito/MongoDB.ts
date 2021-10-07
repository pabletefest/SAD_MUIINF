import {MongoClient} from 'mongodb';
// const {MongoClient} = require('mongodb');
// import mongodb from 'mongodb';
// let client = mongodb.MongoClient;

let localConnectionURL : string = 'mongodb://localhost:8000/productsDB'; 

export const addProductDB = async (product : Product) : Promise<any> => {
    const clientDB : MongoClient = await MongoClient.connect(localConnectionURL);
    let db = clientDB.db('productsDB');
    let collection = db.collection('products');
    collection.findOne(JSON.);
    return clientDB;
}

export const checkProductStock = async (product : Product) : Promise<any> => {
    const clientDB : MongoClient = await MongoClient.connect(localConnectionURL);
    let db = clientDB.db('productsDB');
    db.collection('products');


}
