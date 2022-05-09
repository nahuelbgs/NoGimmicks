/*Tengo que agregar que no se puedan duplicar los productos en el carrito, que se quede guardado el carrito
con el local storage y arreglar el removeItem del local storage ya que a veces elimina 2 items cuando hay 
que eliminar 1 solo y el precio total del carrito que nunca queda en 0, siempre queda con el precio del
ultimo producto eliminado.
*/

class Producto {
    constructor(nombre, precio, imagen) {
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
    }
}

let listaDeProductos = [];

const totalPrice = document.querySelector('.totalPrice');
const productosDelCarritoContainer = document.querySelector('.productosDelCarritoContainer');
const botonAgregarAlCarrito = document.querySelectorAll('#comprar');

botonAgregarAlCarrito.forEach((el) => {
    el.addEventListener('click', agregarAlCarritoClicked)
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
    const prod = new Producto(prodName, prodPrice, prodImg);
    listaDeProductos.push(prod);
    guardarLocal(prod.nombre, JSON.stringify(prod));
    swal("¡Producto agregado al carrito con éxito!", `${prodName}`, "success");
    agregarProdAlCarritoVisible(listaDeProductos);
    actualizarCarrito();
}

function agregarProdAlCarritoVisible(localStorage) {
    localStorage.forEach((el) => {
        prodName = el.nombre;
        prodPrice = el.precio;
        prodImg = el.imagen;
    });

    // ------------------------------- NO FUNCIONA -----------------------------------------------
    // const nombreDelProducto = document.querySelectorAll('.shoppingCartItemTitle').textContent;
    // const nombreDeLosProductos = productosDelCarritoContainer.getElementsByClassName('shoppingCartItemTitle');
    
    // for (let i = 0; i < nombreDeLosProductos.length; i++) {
    //     if (nombreDeLosProductos[i].innerText === nombreDelProducto) {
    //         let cantidadDelMismoElemento = nombreDeLosProductos[i
    //         ].parentElement.parentElement.parentElement.querySelector('.cantidad');
    //         cantidadDelMismoElemento.value++;
    //         actualizarCarrito();
    //         return;
    //     }
    // }
    // ---------------------------------------------------------------------------------------------
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

// NO FUNCIONA
const verSiElCarritoEstaVacio = () => { 
    if (listaDeProductos == []){
        totalPrice.innerHTML = `TOTAL $0`;
    }
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
    verSiElCarritoEstaVacio(); // NO FUNCIONA
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
        swal("¡Producto eliminado del carrito!", `${prodName}`, "error");
    };
}