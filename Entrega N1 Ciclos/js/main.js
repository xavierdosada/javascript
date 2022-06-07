//Primera entrega, Algoritmo utilizando ciclos
let precioTotal = 0;
let nuevoMensaje = 0;

//Pido el nombre del usuario
let nombre = prompt("Esta es una prueba de Ciclos en JavaScript, Porfavor Ingrese su nombre");
//Obligo al usuario a ingresar si o si un dato.
if (nombre != "" && nombre != null) {
    console.log("Hola " + nombre + " ¡Bienvenido!");
} else {
    do {
        if (nuevoMensaje <= 0){
            nombre = prompt("Es necesario que ingrese su nombre");
            nuevoMensaje += 1;
        }
        if (nuevoMensaje == 1){
            nombre = prompt("Debe ingrese su nombre para continuar");
            nuevoMensaje += 1;
        }
        if (nuevoMensaje == 2){
            nombre = prompt("LEAME!!!!! ingrese su nombre para continuar");
            nuevoMensaje += 1;
        }
        if ( nuevoMensaje >=3){
            nombre = prompt("INGRESE SU NOMBRE!!!!!! -.-");
            nuevoMensaje += 1;
        }
    }while (nombre == "" || nombre == null);
    console.log("Hola " + nombre + " ¡Bienvenido!");
}

//Pido la cantidad de productos a sumar
let productos = parseInt(prompt("Ahora, porfavor ingrese la cantidad de productos a sumar"));
let vacio = isNaN(productos);

if (productos != 0 && vacio != true) {
    for (let i = 1; i <= productos; i++ ) {
        let precioProd = parseInt(prompt("Ingrese el precio del producto numero " + i + ": "));
        precioTotal += precioProd;
    }
    console.log("La suma total de todos los productos es: " + precioTotal);
} else {
    console.log("No tiene productos para sumar");
}
