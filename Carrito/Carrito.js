var Producto = /** @class */ (function () {
    function Producto(descripcion, precio) {
        this.descripcion = descripcion;
        this.precio = precio;
    }
    Producto.prototype.toString = function () {
        console.log('[', this.descripcion, ']', ' with price: ', this.precio, '\n');
    };
    return Producto;
}());
var Carrito = /** @class */ (function () {
    function Carrito() {
        //productos : Array<string> = []; //equivalent to line below
        this.productos = [];
        this.cantidad = 0;
        // this.cantidad = 0;
    }
    Carrito.prototype.anadirProducto = function (producto) {
        this.productos[this.cantidad] = producto;
        this.cantidad++;
    };
    Carrito.prototype.quitarProducto = function (producto) {
        delete this.productos[this.cantidad];
        this.cantidad--;
    };
    Carrito.prototype.toString = function () {
        console.log('Número de productos en el carrito: ', this.cantidad, '\n', '\n');
        this.productos.forEach(function (producto) {
            console.log('[', producto.toString(), ']', '\n');
        });
    };
    return Carrito;
}());
