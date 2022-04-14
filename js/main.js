/*Calcula las cuotas (sin interes) dado un precio del producto y la cantidad de cuotas*/

// function calcularCuotas(precioProducto, cantidadCuotas){
//     return(precioProducto / cantidadCuotas)
// }


class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

let listaDeProductos = [];

const agregarAlCarrito = () => {
    let nombre = prompt("Nombre del producto");
    let precio = parseInt(prompt("Precio del producto"));
    let prod = new Producto(nombre, precio);
    listaDeProductos.push(prod);
}

const sumarCarrito = () => {
    let precioTotal = 0;
    listaDeProductos.forEach((el) => {
        precioTotal = precioTotal + el.precio;
    })
    console.log(precioTotal);
}

const aplicarDescuento = (precioActual, descuento) => {
    descontar = precioActual * descuento / 100;
    precioNuevo = precioActual - descontar;
    console.log(precioNuevo);
}

// NO FUNCIONA

const eliminarDelCarrito = (producto) => {
    let index = listaDeProductos.indexOf(producto);
    if (index != -1) {
        listaDeProductos.splice(index, 1)
    }
    console.log(listaDeProductos)
}

listaDeProductos.push (new Producto("tele", 2000));

console.log(listaDeProductos.indexOf("tele"));

