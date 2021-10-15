/**
 * Class representing a product. It specifies an ID for the product, a description of it, its price and the quantity of the same type the user wants to add.
 */
export class Product
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