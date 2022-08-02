function loadTurn(event){
    //detengo el envio del form
    event.preventDefault();
    buttonType = "newTurn"
    //Obtengo los datos del formulario
    let turnFormData = new FormData(form);
    //Aplico la funcion al formData en objeto y lo asigno a una variable
    let turnObject = convertFormDateToTurnObject(turnFormData);

    //True si la validacion fue correcta
    let validation = validationForm(turnObject);
    if (validation == true){
        //guardo turno e inserto en la tabla.
        saveTurnObjectInLocalStorage(turnObject);
        insertRowInTurnTable(turnObject);
    } else {
        Swal.fire({
            title: "Turno Ocupado!",
            icon: "error",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#F87474"
        });
    }
    event.submit();
}

function validationForm(turnObject){
    let validationOk = true;
    let turnsArrayForValidation = JSON.parse(localStorage.getItem("turnsData")) || [];
    turnsArrayForValidation.forEach( element => {
        if(element.turnDate === turnObject.turnDate){
            if(element.turnTime === turnObject.turnTime){
                validationOk = false;
            }
        }
    });
    return validationOk;
}

function convertFormDateToTurnObject(turnFormData){
    //Me guardo los datos del formulario en variables
    let turnTime = turnFormData.get("turnTime");
    let turnDate = turnFormData.get("turnDate");
    let turnName = turnFormData.get("turnName");
    let turnLastName = turnFormData.get("turnLastName");
    let turnAge = turnFormData.get("turnAge");
    let turnID;
    if (buttonType == "newTurn"){
        turnID = getNewTurnID();
    } else if (buttonType == "editTurn"){
        turnID = turnIdEdit;
    }
    //devuelve un objeto con la clave y el valor,
    //ej: clave: turnTime valor: turnTime es la variable con los datos del form.
    return {
        "turnTime" : turnTime,
        "turnDate" : turnDate,
        "turnName" : turnName,
        "turnLastName" : turnLastName,
        "turnAge" : turnAge,
        "turnID" : turnID
    };
}

function getNewTurnID(){
    //obtengo el ultimo ID del vector de la localStorage
    let lastTurnID = localStorage.getItem("lastTurnID") || "-1";
    //Guardo el valor y sumo 1
    let newTurnID = JSON.parse(lastTurnID) + 1;
    //Guardo el nuevo ID en la localStorage
    localStorage.setItem("lastTurnID", JSON.stringify(newTurnID));
    return newTurnID;
}

function deleteTurnObject(turnID){
    let turnsArrayFromStorage = JSON.parse(localStorage.getItem("turnsData"));
    //Busco el ID que coincida
    let turnIndexFromArray = turnsArrayFromStorage.findIndex(element => element.turnID === turnID);
    //Elimino el elemento del array en la posicion que encontro. ,1 elimina solo 1 elemento
    turnsArrayFromStorage.splice(turnIndexFromArray, 1);
    //convierto de objeto a JSON
    let newturnArrayJSON = JSON.stringify(turnsArrayFromStorage);
    //guardo el nuevo array en la localStorage
    localStorage.setItem("turnsData", newturnArrayJSON);
}

function saveTurnObjectInLocalStorage(turnObject){
    //Obtengo desde el localStorage el array donde guardare los turnos.
    //Como esta en JSON lo parseo para que sea objeto
    //Si es el primer turno, entonces lo declaro vacio.
    let turnsArray = JSON.parse(localStorage.getItem("turnsData")) || [];
    //A mi array le agrego el objeto turno
    turnsArray.push(turnObject);
    //Transformo mi array a JSON y lo asigno a una variable
    let turnArrayJSON = JSON.stringify(turnsArray);
    //Guardo el array JSON en la localStorage
    localStorage.setItem("turnsData", turnArrayJSON);
    Swal.fire({
        title: "Turno Guardado!",
        icon: "success",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#F87474"
    });
}

function insertRowInTurnTable(turnObject){
    //Obtengo la tabla
    let turnTableRef = document.getElementById("turnsTable");
    //Inserto una fila en la ultima posicion
    let newTurnRow = turnTableRef.insertRow(-1);
    //Agrego tambien el atributo ID para luego poder eliminar si es necesario
    newTurnRow.setAttribute("turn-ID-number", turnObject["turnID"]);
    //Inserto la celda en la fila y creo botones

    //Creo el boton Editar como un enlace
    let newEditCell = newTurnRow.insertCell(0);
    let editButton = document.createElement("a");
    editButton.setAttribute("href","#")
    //le agrego una clase al boton
    editButton.classList.add("turnButtonEdit");
    editButton.textContent = "Editar";
    newEditCell.appendChild(editButton);

    //Creo el doble input checkbox Confirmacion / Asistencia
    let newConfirmCell = newTurnRow.insertCell(1);
    let confirmInput = document.createElement("input");
    let asistInput = document.createElement("input");
    newConfirmCell.appendChild(confirmInput);
    newConfirmCell.appendChild(asistInput);

    //Tomo los datos y los inserto en la celda
    let newTypeCellRef = newTurnRow.insertCell(2);
    newTypeCellRef.textContent = turnObject["turnTime"];
    newTypeCellRef = newTurnRow.insertCell(3);
    //La fecha la cambio a un objeto fecha
    if (buttonType == "newTurn" || buttonType == "editTurn" || buttonType == "withoutFilterTurn") {
        newObjetOfTurnDate = new Date(`${turnObject["turnDate"]}T00:00:00`);
        newTypeCellRef.textContent = newObjetOfTurnDate.toLocaleDateString();
    } else if (buttonType == "filterTurn") {
        newObjetOfTurnDate = new Date(`${turnObject["turnDate"]}`);
        newTypeCellRef.textContent = newObjetOfTurnDate.toLocaleDateString();
    }
    newTypeCellRef = newTurnRow.insertCell(4);
    newTypeCellRef.textContent = turnObject["turnName"];
    newTypeCellRef = newTurnRow.insertCell(5);
    newTypeCellRef.textContent = turnObject["turnLastName"];
    newTypeCellRef = newTurnRow.insertCell(6);
    newTypeCellRef.textContent = turnObject["turnAge"];

    //Creo el select con las opciones de modalidad Presencial, Online
    let newModCell = newTurnRow.insertCell(7);
    let modSelect = document.createElement("select");
    let optionInFace = document.createElement("option");
    optionInFace.textContent = "Presencial";
    let optionOnline = document.createElement("option");
    optionOnline.textContent = "Online";
    newModCell.appendChild(modSelect);
    modSelect.appendChild(optionInFace);
    modSelect.appendChild(optionOnline);

    //Creo el select con las opciones de medio de Pago Efectivo, Transferencia
    let newPayModCell = newTurnRow.insertCell(8);
    let payModSelect = document.createElement("select");
    let optionCash = document.createElement("option");
    optionCash.textContent = "Efectivo";
    let optionTransfer = document.createElement("option");
    optionTransfer.textContent = "Transferencia";
    newPayModCell.appendChild(payModSelect);
    payModSelect.appendChild(optionCash);
    payModSelect.appendChild(optionTransfer);

    //Creo el checkbox de confirmacion de pago
    let newPayConfirmCell = newTurnRow.insertCell(9);
    let payConfirmInput = document.createElement("input");
    newPayConfirmCell.appendChild(payConfirmInput);


    //Creo el boton eliminar en la tabla
    let newDeleteCell = newTurnRow.insertCell(10);
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    newDeleteCell.appendChild(deleteButton);

    //añado el atributo checkbox a los inputs
    //me guardo el lugar donde quiero agregar el type checkbox
    let inputType = document.querySelectorAll("#turnsTable td input");

    //Recorro todos los inputs encontrandos agregando el atributo checkbox
    inputType.forEach((element, i) => {
        inputType[i].setAttribute("type", "checkbox");
    });

    //Escucha el boton "Eliminar", confirma la eliminacion y elimina la fila.
    deleteButton.addEventListener("click", (event) => {
        Swal.fire({
            title: '¿Esta seguro de eliminar el turno ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, Eliminar',
            confirmButtonColor: "#F87474",
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed){
                 //obtengo la fila a eliminar
                let turnRowDelete = event.target.parentNode.parentNode;
                //Obtengo el valor del atributo de turn-ID-number que seteamos mas arriba
                let turnID = turnRowDelete.getAttribute("turn-ID-number");
                //Elimino la fila del HTML
                turnRowDelete.remove();
                //Elimino el objeto de la localStorage
                deleteTurnObject(turnID);
                Swal.fire({
                    icon: 'success',
                    title: 'Turno Borrado!',
                    showConfirmButton: false,
                    timer: 1500,
                    padding: '5em'
                });
            }
        });
    });

    //Escucha el boton editar
    editButton.addEventListener("click", (e) => {
        buttonType = "editTurn";
        //me guardo el id de la fila que se hizo click para luego en la funcion editarlo
        //obtengo la fila a eliminar
        let turnRowEdit = e.target.parentNode.parentNode;
        //Obtengo el valor del atributo de turn-ID-number que seteamos mas arriba
        turnIdEdit = turnRowEdit.getAttribute("turn-ID-number");


        //Ventanas modales EDITAR TURNO
        let closeEdit = document.querySelectorAll(".closeEdit")[0];
        let modalEdit = document.querySelectorAll(".modalEdit")[0];
        let modalContainerEdit = document.querySelectorAll(".modalContainerEdit")[0];

        modalContainerEdit.style.opacity = "1";
        modalContainerEdit.style.visibility = "visible";
        modalEdit.classList.toggle("modalCloseEdit");

        closeEdit.addEventListener("click", () => {
            modalEdit.classList.toggle("modalCloseEdit");
            modalContainerEdit.style.opacity = "0";
            modalContainerEdit.style.visibility = "hidden";
        })

        window.addEventListener("click", (e) => {
            if (e.target == modalContainerEdit){
                modalEdit.classList.toggle("modalCloseEdit");
                modalContainerEdit.style.opacity = "0";
                modalContainerEdit.style.visibility = "hidden";
            }
        });
    });
}

function cleanTable(){
    let turnsTable = document.getElementById("turnsTable");
    while (turnsTable.rows.length > 1){
        turnsTable.deleteRow(1); //No arranco en la fila 0 para que no borre el header
    }
}

function filterTable(arrayFilter){
    //Limpio la tabla y luego agrego el array filtrado
    cleanTable();
    //Agrego el array filtrado
    arrayFilter.forEach(element => {
        insertRowInTurnTable(element);
    });

};

function editTurn(){
    //obtengo el nuevo formulario a editar
    let formToEdit = new FormData(editForm);
    //lo transformo a objeto
    let turnEditObject = convertFormDateToTurnObject(formToEdit);
    let turnsArrayFromStorage = JSON.parse(localStorage.getItem("turnsData"));
    //Busco el ID que coincida
    let turnIndexFromArray = turnsArrayFromStorage.findIndex(element => element.turnID == turnIdEdit);
    //Modifico el array con los nuevos valores
    let eliminado = turnsArrayFromStorage.splice(turnIndexFromArray, 1, turnEditObject)
    //convierto de objeto a JSON
    let newEditturnArrayJSON = JSON.stringify(turnsArrayFromStorage);
    //guardo el nuevo array en la localStorage
    localStorage.setItem("turnsData", newEditturnArrayJSON);
};

function loadArrayFromStorage(){
    //Si no hay datos no avanza el forEach
    let newTurnsArrayFromStorage = JSON.parse(localStorage.getItem("turnsData"));
    //Recorro el array e inserto a la tabla, llamando a la funcion, si hay datos.
    if (newTurnsArrayFromStorage != null || newTurnsArrayFromStorage != undefined){
        newTurnsArrayFromStorage.forEach( element => {
            insertRowInTurnTable(element);
        });
    }
};


//////////***************************    INCIO DE PROGRAMA     *************************************************///////////
//Guardo el formulario
const form = document.getElementById("form");
const editForm = document.getElementById("editForm");
const newTurnButton = document.getElementById("btnCargarTurno");
const editTurnButton = document.getElementById("btnEditTurn");

let turnIdEdit; //la declaro global ya que hira cambiando de valores en diferentes funciones
let buttonType; //Sirve para saber si al momento de convertir el form a objeto, el form viene de cargar turno o editar turno.

//Variables para los botones de filtro
let btnPrimaryFilterHour = document.getElementById("btnPrimaryFilterHour");
let btnFilterHour = document.getElementById("btnFilterHour");
let btnFilterDate = document.getElementById("btnFilterDate");
let whithoutFilters = document.getElementById("whithoutFilters");
let actualDate = new Date();

//Cuando cargo la pagina va a la localStorage y carga los datos que hay.
document.addEventListener("DOMContentLoaded", () => {
    loadArrayFromStorage();
    //Terminado de actualizar todos los turnos en la tabla cargo la configuracion de las ventanas modales
    //Ventanas modales CARGAR TURNO
    let close = document.querySelectorAll(".close")[0];
    let open = document.querySelectorAll(".turnButton")[0];
    let modal = document.querySelectorAll(".modal")[0];
    let modalContainer = document.querySelectorAll(".modalContainer")[0];

    open.addEventListener("click", (e) => {
        e.preventDefault();
        modalContainer.style.opacity = "1";
        modalContainer.style.visibility = "visible";
        modal.classList.toggle("modalClose");
    });

    close.addEventListener("click", () => {
        modal.classList.toggle("modalClose");
        setTimeout(() => {
            modalContainer.style.opacity = "0";
            modalContainer.style.visibility = "hidden";
        },500);
    })

    window.addEventListener("click", (e) => {
        if (e.target == modalContainer){
            modal.classList.toggle("modalClose");
            setTimeout(() => {
            modalContainer.style.opacity = "0";
            modalContainer.style.visibility = "hidden";
        },500);
        }
    });

    //CUANDO CARGA LA PAGINA FILTRO POR EL MES EN EL QUE NOS ENCONTRAMOS
    buttonType = "filterTurn"; //Identifico que esta filtrando, me sirve debido a un problema con las fechas mas adelante
    let actualMonth = actualDate.getMonth()+1;
    //obtengo el array del storage
    let turnsArrayFromStorage = JSON.parse(localStorage.getItem("turnsData"));
    //transformo las fechas a mes para trabajar con ellas
    turnsArrayFromStorage.forEach(e => e.turnDate = new Date(`${e.turnDate}T00:00:00`));
    //Guardo el array que se filtra con el rango horario
    let arrayFilterMonth = turnsArrayFromStorage.filter(e => e.turnDate.getMonth()+1 == actualMonth);
    arrayFilterMonth.forEach(e => e.turnDate = e.turnDate.toLocaleDateString());
    filterTable(arrayFilterMonth);
});

//Escucha el boton "Reservar Turno"
newTurnButton.addEventListener("click", loadTurn);
//Escucha el boton "Editar Turno"
editTurnButton.addEventListener("click", editTurn);
//FILTRAR POR HORA
btnFilterHour.addEventListener("click", (e) => {
    e.preventDefault();
    buttonType = "filterTurn";
    //Guardo la hora a filtrar
    let formFilterHourStart = document.getElementById("formFilterHour")[0].value; //Inicio Hora
    let formFilterHourEnd = document.getElementById("formFilterHour")[1].value; //Fin Hora
    //obtengo el array del storage
    let turnsArrayFromStorage = JSON.parse(localStorage.getItem("turnsData"));
    //Modifico el turnDate para que filtre a parte de la hora tambien por el mes actual
    turnsArrayFromStorage.forEach(e => e.turnDate = new Date(`${e.turnDate}T00:00:00`));
    //Guardo el array que se filtra con el rango horario y dentro del mes correspondiente
    let arrayFilterHour = turnsArrayFromStorage.filter(e => e.turnTime >= formFilterHourStart && e.turnTime <= formFilterHourEnd && e.turnDate.getMonth()+1 == actualDate.getMonth()+1);
    filterTable(arrayFilterHour);
});

//FILTRAR POR DIA
btnFilterDate.addEventListener("click", (e) => {
    e.preventDefault();
    buttonType = "filterTurn";
     //Guardo el dia a filtrar
    let formFilterDay = document.getElementById("formFilterDay")[0].value; //Inicio Date
    //obtengo el array del storage
    let turnsArrayFromStorage = JSON.parse(localStorage.getItem("turnsData"));
    //Modifico el turnDate para que filtre a parte de la hora tambien por el mes actual
    turnsArrayFromStorage.forEach(e => e.turnDate = new Date(`${e.turnDate}T00:00:00`));
    let arrayFormFilterDay = turnsArrayFromStorage.filter(e => e.turnDate.getDate() == formFilterDay && e.turnDate.getMonth()+1 == actualDate.getMonth()+1);
    arrayFormFilterDay.forEach((e) => {
        e.turnDate = e.turnDate.toLocaleDateString();
    });
    filterTable(arrayFormFilterDay);
});

//QUITAR LOS FILTROS
whithoutFilters.addEventListener("click", e => {
    buttonType = "withoutFilterTurn";
    e.preventDefault();
    cleanTable();
    loadArrayFromStorage();
})