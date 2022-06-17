//Funciones que validan que los datos ingresados sean validos.

function validacionDia (dia){
    if (dia >= 1 && dia <= 31){
        band = true;
        console.log(band);
    } else {
        alert("Disculpe, pero el día ingresado es invalido");
    }
}

function validacionMes (mes){
    if (mes >= 1 && mes <= 12) {
        band = true;
        console.log(band);
    } else {
        alert("Disculpe, pero el mes ingresado es invalido");
    }
}

//funcion para cargar los turnos 
function cargarTurno(){
    function turno(nombre,apellido,edad,dia,mes,hora){
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.dia = dia;
        this.mes = mes;
        this.hora = hora;
    }

    //Cargo las variables con los datos del usuario
    nombre = prompt("Ingrese nombre");
    console.log(nombre);
    apellido = prompt("Ingrese Apellido");
    console.log(apellido);
    edad = prompt("Ingrese Edad");
    console.log(edad);

    //Valido el dia ingresado, mientras no sea correcto vuelve a pedir el dia
    do {
        band = new Boolean(false);
        dia = prompt("Ingrese Dia para su Turno");
        console.log(dia);
        validacionDia(dia);
    } while(band != true);
   

    //Valido el mes ingresado, mientras no sea correcto vuelve a pedir el mes
    do {
        band = new Boolean(false);
        mes = prompt("Ingrese mes para su Turno");
        console.log(mes);
        validacionMes(mes);
    } while(band != true);
    
    hora = prompt("Ingrese la Hora que quiere reservar");
    console.log(hora);

    //Creo el Objeto con el nuevo turno
    nuevoTurno = new turno(nombre,apellido,edad,dia,mes,hora);
    console.log(nuevoTurno);
}

//funcion que valida si el turno esta disponible
function disponibilidadYGuardado(){
    debugger;
    if (listaTurnos.length != 0){ //Si es el primer turno, pasa directo a guardar el turno
        listaTurnos.forEach((item) => {  // recorre el array y en cada posicion comparo el dia, mes y hora, si todas coinciden significa que ya existe el turno por lo tanto NO esta disponible
            if (item.mes == nuevoTurno.mes){
                if (item.dia == nuevoTurno.dia){
                    if (item.hora == nuevoTurno.hora){
                        alert("Error turno NO disponible, vuelva a intentarlo");
                    }
                }
            } else {
                guardarTurno();
            }
        });
    } else {
        guardarTurno();
    }
}

//funcion que guardar los objetos en un array
function guardarTurno(){
     listaTurnos.push(nuevoTurno);
     console.log(listaTurnos);
     // Imprimo el mensaje de guardado.
     alert("Felicitaciones su turno fue guardado para " + nuevoTurno.nombre + " " + nuevoTurno.nombre + " el dia " + nuevoTurno.dia + "/" + nuevoTurno.mes + " a las " + nuevoTurno.hora + " horas.");
}

//////////***************************    INCIO DE PROGRAMA     *************************************************///////////
//Declaro el array
const listaTurnos = [];

//Pido la cantidad de turnos para luego recorrer el bucle for.
let cantTurnos = parseInt(prompt("Cuando turnos quiere agendar: "));

//llamo a las funciones
for (let i = 0; i < cantTurnos; i++) {
    cargarTurno();
    disponibilidadYGuardado(); //verifica la disponibilidad de los turnos y guarda
}

//Pido el mes que quiere filtrar los turnos
let numeroMes = parseInt(prompt("Ingrese el numero del mes para filtrar los turnos."));
const filtroPorMes = listaTurnos.filter(el => el.mes == numeroMes); //metodo filter
console.log("Sus turnos para el mes " + numeroMes + " son: ");

//imprimo el objeto
for (const turnos of filtroPorMes) {
    console.log(turnos);
}




