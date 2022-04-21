class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

let listaDeProductos = [];

const boton = document.getElementById("comprar");
boton.addEventListener('click', e => {
    agregarAlCarrito(e);
})

// boton.onclick = (e) => {agregarAlCarrito(e)}


const agregarAlCarrito = () => {
    let nombre = document.querySelector(".prod-name").textContent;
    let precio = document.querySelector (".prod-price").textContent;
    let prod = new Producto(nombre, precio);
    listaDeProductos.push(prod);
    console.log(listaDeProductos)
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
}


const eliminar = document.getElementById("eliminar");
eliminar.addEventListener('click', e => {
    eliminarDelCarrito(e);
})

const eliminarDelCarrito = () => {
    let target = document.querySelector(".prod-name").textContent;
    const index = listaDeProductos.findIndex(prod => prod.nombre === target);
    if (index != -1) {
        listaDeProductos.splice(index, 1)
    }
    console.log(listaDeProductos)
}


