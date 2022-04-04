// let tipoDeProducto = prompt("¿Que tipo de producto queres comprar? (remera / hoodie)");
// let cantidad = parseInt(prompt("¿Cuantos productos querés comprar? (1, 2, 3...)"));
// let precioHoodies = 8990;
// let precioRemeras = 2990;
// let resultado = 0;

/*Calcula el precio total segun el tipo de producto y la cantidad ingresada*/

switch (tipoDeProducto) {
    case "hoodie":
        resultado = precioHoodies * cantidad;
        alert(resultado);
        break;
    case "remera":
        resultado = precioRemeras * cantidad;
        alert(resultado);
        break;
    default:
        alert("No ingresaste un tipo de producto válido");
}

/*Calcula las cuotas (sin interes) dado un precio del producto y la cantidad de cuotas*/

function calcularCuotas(precioProducto, cantidadCuotas){
    return(precioProducto / cantidadCuotas)
}


/* Dada una hora calcula las horas en las que tenés que tomar agua */

// let hora = prompt("¿A que hora te despertas?")
// let contador = 0

function cuandoTomarAgua(hora){
    while(contador < 12){
        hora = hora + 1;
        console.log(hora, "Toma agua");
        contador = contador + 1;
    }
    return(console.log("Ya tomaste 2.5 litros!"));
}

