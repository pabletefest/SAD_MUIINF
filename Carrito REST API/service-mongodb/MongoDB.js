let mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let Product = require('./../Producto');
const axios = require('axios');

let localConnectionURL = 'mongodb+srv://admin:root@cluster0.gxfn0.mongodb.net/ProductsDB?retryWrites=true&w=majority'; 

/**
 * Opens a connection to the MongoDB and inserts some products to it.
 * @param callback Function to be called when the DB finished adding the products.
 */
const addProductsDB = async (callback = () => {}) => {
    const clientDB = await MongoClient.connect(localConnectionURL);
    let db = clientDB.db('ProductsDB');
    let collection = db.collection('Product');
    collection.deleteMany({});
    collection.insertMany([{ code: '1', description: 'Portatil', price: '900', quantity: '7' },{ code: '2', description: 'Sobremesa', price: '1200', quantity: '2' }
    ,{ code: '3', description: 'Teclado', price: '30', quantity: '5' },{ code: '4', description: 'Webcam', price: '40', quantity: '2' }
    ,{ code: '5', description: 'Mouse', price: '20', quantity: '1' }
  ], function (err , result) {
    console.log("Se han insertado los elementos\n");
    callback(err, result),
    clientDB.close();
    // db.close();
    });
}

module.exports = addProductsDB;

/**
 * Checks for a product stored in the MongoDB.
 * @param product The product to be checked for stock in the MongoDB.
 * @param callback The function called when finding the element in the DB finished.
 * @returns True indicating the product was found successfully in the DB, false otherwise.
 */
const checkProductStock = async (product, callback = () => {}) => {
    let stockAvailable = true;
    const clientDB = await MongoClient.connect(localConnectionURL);
    let db = clientDB.db('ProductsDB');
    let collection = db.collection('Product');
    collection.findOne({
        $and:
        [
            {code:product.getCode()}, 
			{quantity:{$gte:product.getQuantity()}} 
        ]
    }, function(err,result){			
        if(result){
            console.log("Stock suficiente del producto " + result.code+ ": " + result.description +"\n");
            // db.close();
            clientDB.close();
            callback(err, result, true);
            // return true;
            stockAvailable = true;
        }else{
            console.log("El producto " +product.getCode()+": " + product.getDescription() + " no puede añadirse"+
             " ya que no existe en la base o no hay stock suficiente\n(Stock menor a " + product.getQuantity() + ")\n");
            // db.close();
            clientDB.close();
            callback(err, result, false);
            // return false;
            stockAvailable = false;
        }
    });

    return stockAvailable;
}

module.exports = {addProductsDB, checkProductStock};
// const launchService = () => {
    
//     service.get('/mongodb/stock/:code/:description/:price/:quantity', async (req, res) => {
//         const { code, description, price, quantity } = req.params;

//         console.log('Checking for product stock...');
//         let product = new Product(code, description, price, quantity);
//         let isThereStock = await checkProductStock(product);
//         return res.json({ result: isThereStock });
//     });

//     // service.put('/mongodb/add', (req, res) => {
//     //     return res.status(201).json({ result: 'Placeholder products added to the database' });
//     // });

//     const server = service.listen(0, function(){
//         const registerService = () => axios.put(`http://localhost:3000/register/${serviceName}/${version}/${server.address().port}`);
//         setInterval(registerService, 5000);
//         addProductsDB();
//         console.log(`MongoDB listening in port: ${server.address().port}`);
//     }); 
// }

// launchService();