//Agregando fetch cuando ingresa a la pagina statistics
fetch('https://jsonplaceholder.typicode.com/users')
    .then (response => response.json())
    .then(data => showData(data))
    .catch(error => console.log(error))

const showData = (data) => {
    console.log(data);
    let body = ''
    //recorre el arreglo del fetch y por cada iteracion crea una fila con los datos que necesito
    for (let i = 0; i < data.length; i++) {
        body += `<tr><td>${data[i].id}</td><td>${data[i].name}</td><td>${data[i].username}</td><td>${data[i].email}</td></tr>`
    };
    document.getElementById('data').innerHTML = body; //creo la fila en el body.
};
 
