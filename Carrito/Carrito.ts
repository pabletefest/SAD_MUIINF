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

class ShoppingCart
{
    //products : Array<string> = []; //equivalent to line below
    products : Product[] = [];
    count : number = 0;

    constructor()
    {
        // this.count = 0;
    }

    addProduct(product : Product)
    {
        this.products[this.count] = product;
        this.count++;
    }

    removeProduct(product : Product)
    {
        delete this.products[this.count];
        this.count--;
    }

    toString()
    {
        console.log('Number of products in this shopping cart: ', this.count, '\n', '\n');

        this.products.forEach(product => {
            console.log('[', product.toString(), ']', '\n');
        });
    }
}