class Product
{
    description : string;
    price : number;

    constructor(description : string, price : number)
    {
        this.description = description;
        this.price = price;
    }

    toString()
    {
        console.log('[', this.description, ']', ' with price: ', this.price, '\n');
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