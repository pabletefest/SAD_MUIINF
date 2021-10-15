import {Product} from './Producto';
import {ShoppingCart} from './Carrito';
import * as DB from './MongoDB';

function testCartWithoutDB() {
    let shpCart: ShoppingCart = new ShoppingCart();

    let product1 : Product =  new Product(5, 'Mouse', 20, 1);
    let product2 : Product = new Product(3, 'Teclado', 30, 1);

    setTimeout(()=>{shpCart.addProductNoDB(product1);},1000);
    setTimeout(()=>{shpCart.addProductNoDB(product2);},2000);
	setTimeout(()=>{shpCart.toString();},3000);
    setTimeout(()=>{shpCart.removeProduct(product1);},4000);
	setTimeout(()=>{shpCart.toString();},5000);
}

function testCartWithDB() {
    let shpCart: ShoppingCart = new ShoppingCart();
    DB.addProductsDB(function(err, result) {
        if (err) throw err;

        let product1 : Product =  new Product(5, 'Mouse', 20, 1);
        let product2 : Product = new Product(3, 'Teclado', 30, 1);

        setTimeout(()=>{shpCart.addProduct(product1);},1000);
        setTimeout(()=>{shpCart.addProduct(product2);},2000);
	    setTimeout(()=>{shpCart.toString();},3000);
        setTimeout(()=>{shpCart.removeProduct(product1);},4000);
	    setTimeout(()=>{shpCart.toString();},5000);
    });
}

testCartWithDB();