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
        const isStock : boolean = await DB.checkProductStock(product, (err, result) => {
            if (err) throw err;
            console.log(result);
        });

        if (isStock)
            this.products.push(product);    
        else
            console.log("No stock available!");
    }

    /**
     * Checks for the product in the array of elements and if the product was found, it deletes it from the array
     * @param product The product to insert in the shopping cart.
     */
    removeProduct(product : Product)
    {
        let indexObject : number = this.products.indexOf(product);

        if (indexObject == -1)
            return;

        this.products.splice(indexObject, 1);
    }

    /**
     * Prints a formatted message representing every element in the array of products of the shopping cart.
     */
    toString()
    {
        console.log('Number of products in this shopping cart: ', this.products.length, '\n', '\n');

        this.products.forEach(product => {
            console.log('[', product.toString(), ']', '\n');
        });
    }
}

function testCart() {
    let shpCart: ShoppingCart = new ShoppingCart();
    DB.addProductsDB(function(err, result) {
        if (err) throw err;
        setTimeout(()=>{shpCart.addProduct(new Product(5, 'Mouse', 20, 1));},1000);
        setTimeout(()=>{shpCart.addProduct(new Product(3, 'Teclado', 30, 1));},1000);
	    setTimeout(()=>{shpCart.toString();},1500);
        setTimeout(()=>{shpCart.removeProduct(new Product(5, 'Mouse', 20, 1));},1000);
	    setTimeout(()=>{shpCart.toString();},1500);
    });
}

testCart();
