class Producto
{
    descripcion : string;
    precio : number;

    constructor(descripcion : string, precio : number)
    {
        this.descripcion = descripcion;
        this.precio = precio;
    }

    toString()
    {
        console.log('[', this.descripcion, ']', ' with price: ', this.precio, '\n');
    }
}

class Carrito
{
    //productos : Array<string> = []; //equivalent to line below
    productos : Producto[] = [];
    cantidad : number = 0;

    constructor()
    {
        // this.cantidad = 0;
    }

    anadirProducto(producto : Producto)
    {
        this.productos[this.cantidad] = producto;
        this.cantidad++;
    }

    quitarProducto(producto : Producto)
    {
        delete this.productos[this.cantidad];
        this.cantidad--;
    }

    toString()
    {
        console.log('Número de productos en el carrito: ', this.cantidad, '\n', '\n');

        this.productos.forEach(producto => {
            console.log('[', producto.toString(), ']', '\n');
        });
    }
}