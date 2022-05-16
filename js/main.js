class Producto {
    constructor(nombre, precio, imagen) {
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
    }
}

let listaDeProductos = [];


/* HECHO SOLO PARA LA ENTREGA */
const obtenerDatos = () =>{
    fetch("../datos.json")
    .then(response => response.json())
    .then((result) => {
        let datos = result;
        datos.forEach(prod => {
            productosDelCarritoContainer.innerHTML += `<div class="row shoppingCartItem border-bottom">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 pb-2 pt-3">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate m-2 justify-content-center">${prod.nombre}</h6>
            </div>
        </div>
        <div class="col-2 d-flex justify-content-center">
            <div class="shopping-cart-price d-flex align-items-center h-100 pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice">${prod.precio}</p>
            </div>
        </div>
        <div class="col-4">
        <div class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 pb-2 pt-3">
            <input class="shopping-cart-quantity-input cantidad" type="number"
            value="1">
            <button class="btn btn-danger" id="buttonDelete" type="button">X</button>
        </div>
    </div>`
        })
    })
    .catch(error => console.log(error));
}

const totalPrice = document.querySelector('.totalPrice');
const productosDelCarritoContainer = document.querySelector('.productosDelCarritoContainer');
const botonAgregarAlCarrito = document.querySelectorAll('#comprar');

botonAgregarAlCarrito.forEach((el) => {
    el.addEventListener('click', obtenerDatos)
});

const guardarLocal = (clave, valor) => {
    localStorage.setItem(clave, valor)
};

const eliminarLocal = (clave, valor) => {
    localStorage.removeItem(clave, valor)
}

function agregarAlCarritoClicked(event) {
    const button = event.target;
    const box = button.closest('.box');
    const prodName = box.querySelector('.product-name').textContent;
    const prodPrice = box.querySelector('.prod-price').textContent;
    const prodImg = box.querySelector('.product-img').src;
    const prod = new Producto(prodName, prodPrice, prodImg, prodID);
    listaDeProductos.push(prod);
    guardarLocal(prod.nombre, JSON.stringify(prod));
    agregarProdAlCarritoVisible(listaDeProductos);
    actualizarCarrito();
}

function agregarProdAlCarritoVisible(localStorage) {
    localStorage.forEach((el) => {
        prodName = el.nombre;
        prodPrice = el.precio;
        prodImg = el.imagen;
    });

    const filaDelCarrito = document.createElement('div');
    const contenidoDelCarrito = `
    <div class="row shoppingCartItem border-bottom">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 pb-2 pt-3">
                <img src=${prodImg} class="shopping-cart-image">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate m-2 justify-content-center">${prodName}</h6>
            </div>
        </div>
        <div class="col-2 d-flex justify-content-center">
            <div class="shopping-cart-price d-flex align-items-center h-100 pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice">${prodPrice}</p>
            </div>
        </div>
        <div class="col-4">
        <div class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 pb-2 pt-3">
            <input class="shopping-cart-quantity-input cantidad" type="number"
            value="1">
            <button class="btn btn-danger" id="buttonDelete" type="button">X</button>
        </div>
    </div>`;
    filaDelCarrito.innerHTML = contenidoDelCarrito;
    productosDelCarritoContainer.append(filaDelCarrito);
    filaDelCarrito.querySelector('.cantidad').addEventListener('change', cambiarCantidad);
    filaDelCarrito.addEventListener('click', eliminarDelCarrito);
}

const actualizarCarrito = () => {
    let precioTotal = 0;
    const cantidadDelElemento = document.querySelector('.cantidad');
    const cantidad = parseInt(cantidadDelElemento.value);
    listaDeProductos.forEach((el) => {
        let precioElementos = parseInt(el.precio.replace('$', ''));
        precioTotal = precioTotal + precioElementos * cantidad;
    });
    totalPrice.innerHTML = `TOTAL $${precioTotal}`;
}

const cambiarCantidad = (event) => {
    const cant = event.target;
    if (cant.value <= 0) {
        cant.value = 1;
    }
    actualizarCarrito();
}


const buscarEnLocalStorage = () => {
    for (let i = 0; i < localStorage.length; i++){
        let clave = localStorage.key(i);
        if (prodName == clave){
         return (localStorage.removeItem(clave))
        }
    }
}

function eliminarDelCarrito(event) {
    const button = event.target;
    button.closest('.shoppingCartItem').remove();
    const prodName = document.querySelector(".shoppingCartItemTitle").textContent;
    const index = listaDeProductos.findIndex(prod => prod.nombre === prodName);
    if (index != -1) {
        listaDeProductos.splice(index, 1)
        actualizarCarrito()
        eliminarLocal(prodName, buscarEnLocalStorage());
    };
}


