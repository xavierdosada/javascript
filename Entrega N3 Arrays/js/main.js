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

//funcion que guardar los objetos en un array
function guardarTurno(){
     listaTurnos.push(nuevoTurno);
     console.log(listaTurnos);
}

//funcion para imprimer el turno
function imprimir(){
    for (const turno of listaTurnos) {
        alert("Felicitaciones su Turno fue guardado para " + turno.apellido + " " + turno.nombre + " el dia " + turno.dia + "/" + turno.mes + " a las " + turno.hora + " horas.");
    }
}



//////////***************************    INCIO DE PROGRAMA     *************************************************///////////
//Declaro el array
const listaTurnos = [];

//llamo a las funciones
cargarTurno();
guardarTurno();
imprimir();

