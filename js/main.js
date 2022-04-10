// let tipoDeProducto = prompt("¿Que tipo de producto queres comprar? (remera / hoodie)");
// let cantidad = parseInt(prompt("¿Cuantos productos querés comprar? (1, 2, 3...)"));
// let precioHoodies = 8990;
// let precioRemeras = 2990;
// let resultado = 0;

/*Calcula el precio total segun el tipo de producto y la cantidad ingresada*/

// switch (tipoDeProducto) {
//     case "hoodie":
//         resultado = precioHoodies * cantidad;
//         alert(resultado);
//         break;
//     case "remera":
//         resultado = precioRemeras * cantidad;
//         alert(resultado);
//         break;
//     default:
//         alert("No ingresaste un tipo de producto válido");
// }

/*Calcula las cuotas (sin interes) dado un precio del producto y la cantidad de cuotas*/

// function calcularCuotas(precioProducto, cantidadCuotas){
//     return(precioProducto / cantidadCuotas)
// }

// ------------------------------------- DESAFIO INCORPORAR ARRAYS ----------------------------------------

class Producto{
    constructor (nombre, precio){
        this.nombre = nombre;
        this.precio = precio;
    }
}

let listaDeProductos = [];

const agregarAlCarrito = () => {
    let nombre = prompt("Nombre del producto");
    let precio = parseInt(prompt("Precio del producto"));
    let prod = new Producto(nombre,precio);
    listaDeProductos.push(prod);
}

const eliminarDelCarrito = (prod) => {
    let index = listaDeProductos.indexOf(prod);
    if(index != -1) {
        listaDeProductos.splice(index, 1)
    }
}

const estaEnElCarrito = (prod) => {
    listaDeProductos.includes(prod);
}