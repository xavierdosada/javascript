function loadTurn(event){
    //detengo el envio del form
    event.preventDefault();
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
    let turnID = getNewTurnID();
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

    //Creo el boton Editar
    let newEditCell = newTurnRow.insertCell(0);
    let editButton = document.createElement("button");
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
    newTypeCellRef.textContent = turnObject["turnDate"];
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

    /*function editTurnObject(turnID){
        let turnsArrayFromStorage = JSON.parse(localStorage.getItem("turnsData"));
        //Busco el ID que coincida
        let turnIndexFromArray = turnsArrayFromStorage.findIndex(element => element.turnID === turnID);
        //Elimino el elemento del array en la posicion que encontro. ,1 elimina solo 1 elemento
        turnsArrayFromStorage.splice(turnIndexFromArray, 1, )
    }*/

    //Escucha el boton "Editar", y muestra el formulario para editar el turno
    editButton.addEventListener("click", (event, turnID) => {
        
        let turnsArrayFromStorage = JSON.parse(localStorage.getItem("turnsData"));
        //Busco el ID que coincida
        let turnIndexFromArray = turnsArrayFromStorage.findIndex(element => element.turnID === turnID);

    });
}



//////////***************************    INCIO DE PROGRAMA     *************************************************///////////
//Guardo el formulario
const form = document.getElementById("form");

//Cuando cargo la pagina va a la localStorage y carga los datos que hay.
document.addEventListener("DOMContentLoaded", () => {
    //Si no hay datos no avanza el forEach
    let newTurnsArrayFromStorage = JSON.parse(localStorage.getItem("turnsData"));
    //Recorro el array e inserto a la tabla, llamando a la funcion, si hay datos.
    if (newTurnsArrayFromStorage != null || newTurnsArrayFromStorage != undefined){
        newTurnsArrayFromStorage.forEach( element => {
            insertRowInTurnTable(element);
        });
    }
});

//Escucha el boton "Reservar Turno"
form.addEventListener("submit", loadTurn);