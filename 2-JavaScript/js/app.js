const descargarUsuarios = cantidad => new Promise((resolve, reject) => {
    //Pasar cantidad a la API
    const api = `https://randomuser.me/api/?results=${cantidad}&nat=us`;

    //llamado AJAX
    const xhr = new XMLHttpRequest();

    //abrir conexión
    xhr.open('GET', api, true);

    //on load
    xhr.onload = () => {
        if(xhr.status === 200){
            resolve(JSON.parse(xhr.responseText).results);
        } else{
            reject(Error(xhr.statusText));
        }
    }

    //opcional (on error)
    xhr.onerror = (error) => reject(error);

    //send
    xhr.send();
});

descargarUsuarios(5)
    .then(
        miembros => imprimirHTML(miembros),
        error => console.error('Hubo un error ' + error)
    )

function imprimirHTML(usuarios){
    let html = '';
    usuarios.forEach(usuario => {
        html += `
            <li>
                Nombre: ${usuario.name.first} ${usuario.name.last}
                País: ${usuario.nat}
                Imagen: 
                    <img src="${usuario.picture.medium}">
            </li>
        `;
    });

    const contenedor = document.querySelector('#app');
    contenedor.innerHTML = html;
}