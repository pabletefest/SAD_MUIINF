export class Product
{
    constructor(code, description, price = 1, quantity = 1)
    {   
        this.code = code;
        this.description = description;
        this.price = price;
        this.quantity = quantity
    }

    getCode()
    {
        return this.code;
    }

    setCode(id)
    {
        this.code = id;
    }

    getDescription()
    {
        return this.description;
    }

    setDescription(desc)
    {
        this.description = desc;
    }

    getPrice()
    {
        return this.price;
    }

    setPrice(value)
    {
        this.price = value;
    }

    getQuantity()
    {
        return this.quantity;
    }

    setQuantity(number)
    {
        this.quantity = number;
    }

    toString()
    {
        console.log('[', this.code, ': ', this.description, ']', ' with price: ', this.price, ' and quantity: ', this.quantity, '\n');
    }
}