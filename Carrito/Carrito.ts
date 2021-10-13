import * as DB from './MongoDB';

/**
 * Class representing a product. It specifies an ID for the product, a description of it, its price and the quantity of the same type the user wants to add.
 */
class Product
{
    code: number;
    description : string;
    price : number;
    quantity : number;

    constructor(code : number, description : string, price : number, quantity : number)
    {   
        this.code = code;
        this.description = description;
        this.price = price;
        this.quantity = quantity
    }

    toString()
    {
        console.log('[', this.code, ': ', this.description, ']', ' with price: ', this.price, ' and quantity: ', this.quantity, '\n');
    }
}

/**
 * Class representing the shopping cart object, in charge of managing the products the user wants to add/remove.
 */
class ShoppingCart
{
    //products : Array<string> = []; //equivalent to line below
    products : Product[] = [];

    constructor()
    {
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

function testCart() {
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

testCart();