import * as DB from './MongoDB';
import {Product} from './Producto';

/**
 * Class representing the shopping cart object, in charge of managing the products the user wants to add/remove.
 */
export class ShoppingCart
{
    //products : Array<string> = []; //equivalent to line below
    products : Product[] = [];

    constructor()
    {
    }

    /**
     * Adds the product into the ShoppingCart without cheking with the database.
     * @param product The product to be inserted in the shopping cart.
     */

    addProductNoDB(product: Product)
    {
        this.products.push(product);
        console.log("Product added to the shopping cart!");
    }

    /**
     * Checks for product quantity stock before inserting the product in the array.
     * If no stock is available, it is thrown an error and a message indicating inexistent stock is printed.
     * @param product The product to be inserted in the shopping cart.
     */
    async addProduct(product : Product)
    {
        await DB.checkProductStock(product, (err, result, isStock) => {
            if (err) throw err;

            if (isStock)
            {
                this.products.push(product);    
                console.log("Stock available!");
            }
            else
                console.log("No stock available!");
            // console.log(result);
        });
    }

    /**
     * Checks for the product in the array of elements and if the product was found, it deletes it from the array
     * @param product The product to insert in the shopping cart.
     */
    removeProduct(product : Product)
    {
        let indexObject : number = this.products.indexOf(product);

        if (indexObject == -1)
            // return;
            console.log("Couldn't remove the product, not present!");

        this.products.splice(indexObject, 1);
    }

    /**
     * Prints a formatted message representing every element in the array of products of the shopping cart.
     */
    toString()
    {
        console.log('Number of products in this shopping cart: ', this.products.length, '\n', '\n');
        console.log(this.products);
        // let arrayFiltered = this.products.filter(product => product != undefined);
        // this.products.forEach(product => {
        //     if (product != undefined && product !== undefined)
        //         console.log(product.toString(), '\n');
        // });
    }
}