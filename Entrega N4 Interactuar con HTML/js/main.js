//funcon que valida los inputs del form
function formValidacion(input) {
    console.log(input);
    let valueNombre = document.getElementById(input);
    valueNombre.value = ""; //vacio el input para que se vea el placeholder
    valueNombre.className = "formularioInvalido"; //cambio a color a rojo para que se vea el error
    valueNombre.placeholder = "Es necesario " + input; ; //mensaje de error
    band = true;
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

    band = false; //Sirve para validar si entro en un if

    //Cargo las variables con los datos del usuario
    nombre = document.getElementById("Nombre").value;
    console.log(nombre);
    if (nombre == null || nombre == "") {
        nombreID = document.getElementById("Nombre").id;
        formValidacion(nombreID);
    }

    apellido = document.getElementById("Apellido").value;
    console.log(apellido);
    if (apellido == null || apellido == "") {
        apellidoID = document.getElementById("Apellido").id;
        formValidacion(apellidoID);
    }

    edad = document.getElementById("Edad").value;
    console.log(edad);
    if (edad == null || edad == "") {
        edadID = document.getElementById("Edad").id;
        formValidacion(edadID);
    }

     //Obtengo el mes ingresado en el formulario
     mes = document.getElementById("Mes").value;
     console.log(mes);
      //Valido Mes, si no es correcto creo el mensaje de error
     if (mes < 1 || mes > 12 || mes == null || mes == "") {
        mesID = document.getElementById("Mes").id;
        formValidacion(mesID);
     }

    dia = document.getElementById("Dia").value;
    console.log(dia);
    //Valido Dia, si no es correcto creo el mensaje de error
    if (dia < 1 || dia > 31 || dia == null || dia == "") {
        diaID = document.getElementById("Dia").id;
        formValidacion(diaID);
    }
    
    hora = document.getElementById("Hora").value;
    console.log(hora);
    if (hora == null || hora == "") {
        horaID = document.getElementById("Hora").id;
        formValidacion(horaID);
    }

    //Creo el Objeto con el nuevo turno, si es vacio significa que no tiene error
    if (band == false){
        nuevoTurno = new turno(nombre,apellido,edad,dia,mes,hora);
        console.log(nuevoTurno);
    }
}

//funcion que valida si el turno esta disponible
function disponibilidadYGuardado(){
    
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





