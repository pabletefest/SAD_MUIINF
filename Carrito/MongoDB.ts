import {MongoClient} from 'mongodb';
// const {MongoClient} = require('mongodb');
// import mongodb from 'mongodb';
// let client = mongodb.MongoClient;

let localConnectionURL : string = 'mongodb://localhost:8000/productsDB'; 

export const addProductDB = async (productJSON : string) : Promise<T> => {
    const clientDB : MongoClient = await MongoClient.connect(localConnectionURL);

}

export const checkProductStock = async (productJSON : string) : Promise<T> => {

}
