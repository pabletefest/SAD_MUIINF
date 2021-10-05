class Carrito
{
    //productos : Array<string> = []; //equivalent to line below
    productos : string[] = [];
    cantidad : number = 0;

    constructor()
    {
        // this.cantidad = 0;
    }

    anadirProducto(producto : string)
    {
        this.productos[this.cantidad] = producto;
        this.cantidad++;
    }

    quitarProducto(producto :string)
    {
        delete this.productos[this.cantidad];
        this.cantidad--;
    }

    toString()
    {
        console.log('Número de productos en el carrito: ', this.cantidad, '\n', '\n');

        this.productos.forEach(producto => {
            console.log('[', producto, ']', '\n');
        });
    }
}