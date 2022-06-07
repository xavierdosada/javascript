//Function que valida que los datos ingresados sean validos.
function validacionFecha (mes, dia){
    if (mes >= 1 && mes <= 12) {
        if (dia >= 1 && dia <= 31){
            respuestaValidacion = "Felicitaciones su turno fue guardado para la fecha: ";
        } else {
            console.log("Disculpe, pero el día ingresado es invalido");
        }
    } else {
        console.log("Disculpe, pero el mes ingresado es invalido");
    }
}

//Modifico el numero del mes por el nombre del mes para que quede mejor visualmente
function nombreMes (nombreMes){
    switch(nombreMes){
        case "1":
            nombreMes = "Enero";
            return nombreMes;
        case "2":
            nombreMes = "Febrero";
                return nombreMes;
        case "3":
            nombreMes = "Marzo";
                return nombreMes;
        case "4":
            nombreMes = "Abril";
                return nombreMes;
        case "5":
            nombreMes = "Mayo";
                return nombreMes;
        case "6":
            nombreMes = "Junio";
                return nombreMes;
        case "7":
            nombreMes = "Julio";
                return nombreMes;
        case "8":
            nombreMes = "Agosto";
                return nombreMes;
        case "9":
            nombreMes = "Septiembre";
                return nombreMes;
        case "10":
            nombreMes = "Octubre";
                return nombreMes;
        case "11":
            nombreMes = "Noviembre";
                return nombreMes;
        case "12":
            nombreMes = "Diciembre";
                return nombreMes;
    }
}

//Funcion que valida si el turno elegido esta disponible.
/*function turnoDisponible(){

}*/

//Calendario de turnos
//INICIO PROGRAMA

let respuestaValidacion;

//Pido los datos del mes y el día
turnoMes = prompt("Reserve su turno! Para eso ingrese el mes que quiere reservar en forma númerica");
turnoDia = prompt("Ingrese el día que quiere reservar en forma númerica");

//llamo a las funciones
validacionFecha(turnoMes, turnoDia);
console.log(respuestaValidacion + turnoDia + " de " + nombreMes(turnoMes));
alert(respuestaValidacion + turnoDia + " de " + nombreMes(turnoMes));


