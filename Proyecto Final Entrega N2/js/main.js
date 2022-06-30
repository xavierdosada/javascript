function crearFilasYCeldas(i) {
    //Creo las filas y celdas
    fila = document.createElement("tr");
    cellEditar = document.createElement("td");
    cellConfirmAsist = document.createElement("td");
    cellHora = document.createElement("td");
    cellFecha = document.createElement("td");
    cellNombre = document.createElement("td"); 
    cellApellido = document.createElement("td"); 
    cellEdad = document.createElement("td");
    cellModalidad = document.createElement("td");
    cellMedioDePago = document.createElement("td");
    cellConfirmPago = document.createElement("td");
    cellEliminar = document.createElement("td");

    //Creo los nodos de texto, que va a estar dentro de cada celda
    nodoEditar = document.createElement("button");
    nodoEditar.textContent = "Editar";
    nodoConfirm = document.createElement("input");
    nodoAsist = document.createElement("input");
    nodoHora = document.createTextNode(nuevoTurnoArray[i].hora); 
    nodoFecha = document.createTextNode(nuevoTurnoArray[i].fecha); 
    nodoNombre = document.createTextNode(nuevoTurnoArray[i].nombre); 
    nodoApellido = document.createTextNode(nuevoTurnoArray[i].apellido); 
    nodoEdad = document.createTextNode(nuevoTurnoArray[i].edad);

    selectModalidad = document.createElement("select");
    optionPresencial = document.createElement("option");
    optionPresencial.textContent = "Presencial";
    optionOnline = document.createElement("option");
    optionOnline.textContent = "Online";
    selectMedioDePago = document.createElement("select"); 
    optionEfectivo = document.createElement("option");
    optionEfectivo.textContent = "Efectivo";
    optionTransferencia = document.createElement("option");
    optionTransferencia.textContent = "Transferencia";
    nodoConfirmPago = document.createElement("input"); 
    nodoEliminar = document.createElement("button");
    nodoEliminar.textContent = "Eliminar";

    //Agrego como hijos los nodos de texto a las celdas
    cellEditar.appendChild(nodoEditar);
    cellConfirmAsist.appendChild(nodoConfirm);
    cellConfirmAsist.appendChild(nodoAsist);
    cellHora.appendChild(nodoHora);
    cellFecha.appendChild(nodoFecha);
    cellNombre.appendChild(nodoNombre);
    cellApellido.appendChild(nodoApellido);
    cellEdad.appendChild(nodoEdad);
    cellModalidad.appendChild(selectModalidad);
    cellMedioDePago.appendChild(selectMedioDePago);
    cellConfirmPago.appendChild(nodoConfirmPago);
    cellEliminar.appendChild(nodoEliminar);

    //Agrego los option al select
    selectModalidad.appendChild(optionPresencial);
    selectModalidad.appendChild(optionOnline);
    selectMedioDePago.appendChild(optionEfectivo);
    selectMedioDePago.appendChild(optionTransferencia);

    // Agrego las celdas como hijos de las filas
    fila.appendChild(cellEditar);
    fila.appendChild(cellConfirmAsist);
    fila.appendChild(cellHora);
    fila.appendChild(cellFecha);
    fila.appendChild(cellNombre); 
    fila.appendChild(cellApellido); 
    fila.appendChild(cellEdad);
    fila.appendChild(cellModalidad);
    fila.appendChild(cellMedioDePago);
    fila.appendChild(cellConfirmPago);
    fila.appendChild(cellEliminar);
}

function agregarInputType(){
    //añado el atributo checkbox a los inputs
    //me guardo el lugar donde quiero agregar el type checkbox
    inputType = document.querySelectorAll("#turnosTable td input");
    
    //Recorro todos los inputs encontrandos agregando el atributo checkbox
    inputType.forEach((element, i) => {
        inputType[i].setAttribute("type", "checkbox");
    });
}

function insertarTurnosEnTabla(){
    //guardo el array del local Storage
    arrayTurnosLocalStorage = JSON.parse(localStorage.getItem("Turnos"));
    //Si hay datos, CARGO mi array de turnos con el array guardado en el storage.
    if (arrayTurnosLocalStorage != null) {
        arrayTurnosLocalStorage.forEach((element, i) => {
            nuevoTurnoArray[i] = element;

            //Cargo la tabla con los turnos del día
            //Primero me guardo la tabla
            tbody = document.querySelector("#turnosTable tbody");
            
            crearFilasYCeldas(i);
            tbody.appendChild(fila);
        });
        agregarInputType();
    }
}

function insertarUltimoTurnoEnTabla() {
    let ultimaPos = nuevoTurnoArray.length-1; //guardo la ultima posicion del arreglo
    crearFilasYCeldas(ultimaPos); // agrego los ultimos datos cargados
    tbody.appendChild(fila);
    agregarInputType();
}

function eliminarTurno(){
    
}

//cargo el arreglo vacio con el storage
function cargar_storage(){
    getListaTurnos = localStorage.getItem(listaTurnosJSON);
    listaTurnos = JSON.parse(getListaTurnos);
}

//valida luego de presionar submit 
function formValidacion(input) {
    let valueNombre = document.getElementById(input);
    valueNombre.value = ""; //vacio el input para que se vea el placeholder
    valueNombre.className = "formularioInvalido"; //cambio a color a rojo para que se vea el error
    valueNombre.placeholder = "Es necesario " + input; ; //mensaje de error
    band = true;
}


//funcion para cargar los turnos 
function cargarTurno(e){
    function turno(nombre,apellido,edad,fecha,hora){
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.fecha = fecha;
        this.hora = hora;
    }

    e.preventDefault();
    band = false; //Sirve para validar si entro en un if

    //Cargo las variables con los datos del usuario
    nombre = document.getElementById("Nombre").value;
    console.log(nombre);
    if (nombre == null || nombre == "") {
        nombreID = document.getElementById("Nombre").id;
        formValidacion(nombreID);
    } else {
        let valueNombre = document.getElementById("Nombre");
        valueNombre.className = "formulario"; //Cambio al color original por esta bien la validacion
    } 

    apellido = document.getElementById("Apellido").value;
    console.log(apellido);
    if (apellido == null || apellido == "") {
        apellidoID = document.getElementById("Apellido").id;
        formValidacion(apellidoID);
    } else { 
        let valueApellido = document.getElementById("Apellido");
        valueApellido.className = "formulario"; //Cambio al color original por esta bien la validacion
    } 

    edad = document.getElementById("Edad").value;
    console.log(edad);
    if (edad == null || edad == "") {
        edadID = document.getElementById("Edad").id;
        formValidacion(edadID);
    } else { 
        let valueEdad = document.getElementById("Edad");
        valueEdad.className = "formulario"; //Cambio al color original por esta bien la validacion
    }

    //Obtengo la fecha ingresada en el formulario
    nuevaFecha = document.getElementById("Fecha").value;
    console.log(nuevaFecha);
    if (nuevaFecha == null || nuevaFecha == ""){
        fechaID = document.getElementById("Fecha").id;
        formValidacion(fechaID);
    } else {
        let valueFecha = document.getElementById("Fecha");
        valueFecha.className = "formulario";
    }
    
    hora = document.getElementById("Hora").value;
    console.log(hora);
    if (hora == null || hora == "") {
        horaID = document.getElementById("Hora").id;
        formValidacion(horaID);
    } else { 
        let valueHora = document.getElementById("Hora");
        valueHora.className = "formulario"; //Cambio al color original por esta bien la validacion
    }

    //Creo el Objeto con el nuevo turno, si es vacio significa que no tiene error
    if (band == false){
        nuevoTurno = new turno(nombre,apellido,edad,nuevaFecha,hora);
        disponibilidadYGuardado();
    }
}


//funcion que valida si el turno esta disponible
function disponibilidadYGuardado(){
    if (nuevoTurnoArray.length != 0){ //Si es el primer turno, pasa directo a guardar el turno
        turnoHabilitado = true;
        nuevoTurnoArray.forEach((item) => {  // recorre el array y en cada posicion comparo el dia, mes y hora, si todas coinciden significa que ya existe el turno por lo tanto NO esta disponible
            if (item.fecha == nuevoTurno.fecha){
                if (item.hora == nuevoTurno.hora){
                    turnoHabilitado = false;
                } else {
                    bandera = true;
                }
            } else {
                bandera = true;
            }
        });
    } else {
        bandera = true;
    }
    //Si bandera es true significa que no es compatible
    if (bandera == true && turnoHabilitado == true) {
        guardarTurno();
    } else {
        alert("Lo lamento, pero el turno ya NO esta disponible");
    }

}


//guardar los objetos en un array y llama a la funcion localstorage para guardar ahi tambien.
function guardarTurno(){
    
    nuevoTurnoArray.push(nuevoTurno);
    //Convierto el array a JSON
    nuevoTurnoArrayJSON = JSON.stringify(nuevoTurnoArray);
    //Guardo mi array de transacciones en la localStorage en formato JSON
    localStorage.setItem("Turnos",nuevoTurnoArrayJSON);
    // Imprimo el mensaje de guardado.
    alert("Felicitaciones su turno fue guardado para " + nuevoTurno.apellido + " " + nuevoTurno.nombre + " el dia " + nuevoTurno.fecha + " a las " + nuevoTurno.hora + " horas.");
    insertarUltimoTurnoEnTabla();
}

//////////***************************    INCIO DE PROGRAMA     *************************************************///////////
//Declaro el array y variables globales
const form = document.getElementById("form");
let nuevoTurnoArray = [];
let listaTurnosJSON;
let getListaTurnos;
let arrayTurnosLocalStorage;
let fila, cellEditar, cellConfirmAsist, cellHora, cellFecha, cellNombre, cellApellido, cellEdad, cellModalidad, cellMedioDePago, cellConfirmPago, cellEliminar;
let nodoEditar, nodoAsist, nodoHora, nodoFecha, nodoNombre, nodoApellido, nodoEdad, selectModalidad, optionPresencial, optionOnline, selectMedioDePago, nodoConfirmPago, nodoEliminar;
let tbody;
let inputType

//sirve para validaciones
let bandera = false; 
let turnoHabilitado = true;

//Cuando se carga la pagina ...
document.addEventListener("DOMContentLoaded", () => {
            insertarTurnosEnTabla();
});

//Evento para escuchar el boton cargarTurno y lo agrega en la tabla.
form.addEventListener("submit", cargarTurno);





 