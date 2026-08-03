async function obtenerTodosPasajeros() {
    const url = "http://localhost:3000/api/v1/pasajero";
    const response = await fetch(url);
    const pasajeros = await response.json();
    const tablaPasajeros = document.getElementById("tabla-pasajeros");
    tablaPasajeros.innerHTML = '';
    pasajeros.forEach(pasajero => {

        const fila = document.createElement("tr");
        const filaId = document.createElement("th");
        const filaDocumento = document.createElement("td");
        const filaNombre = document.createElement("td");
        const filaApellido = document.createElement("td");
        const filaEdad = document.createElement("td");
        const filaTelefono = document.createElement("td");
        const filaEstado = document.createElement("td");
        const filaDireccion = document.createElement("td");
        const filaAcciones = document.createElement("td");

        filaId.textContent = pasajero.pasajero_id;
        filaDocumento.textContent = pasajero.documento;
        filaNombre.textContent = pasajero.nombre;
        filaApellido.textContent = pasajero.apellido;
        filaEdad.textContent = pasajero.edad;
        filaTelefono.textContent = pasajero.telefono;
        filaEstado.textContent = pasajero.estado_salud;
        filaDireccion.textContent = pasajero.direccion;

        const botones = document.createElement("div");
        botones.className = "buttons";

        const botonModificar = document.createElement("button");
        botonModificar.textContent = "Modificar";
        botonModificar.className = "button is-info is-dark";
        botonModificar.addEventListener("click", () => {
            window.location.href = `http://localhost:8080/modificar-pasajero.html?id=${pasajero.pasajero_id}`;
            actualizarPasajero(pasajero.pasajero_id);
        })

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.className = "button is-danger is-dark";
        botonEliminar.addEventListener("click", () => {
            eliminarPasajero(pasajero.pasajero_id);
        })

        botones.appendChild(botonModificar);
        botones.appendChild(botonEliminar);
        filaAcciones.appendChild(botones);

        fila.appendChild(filaId);
        fila.appendChild(filaDocumento);
        fila.appendChild(filaNombre);
        fila.appendChild(filaApellido);
        fila.appendChild(filaEdad);
        fila.appendChild(filaTelefono);
        fila.appendChild(filaEstado);
        fila.appendChild(filaDireccion);
        fila.appendChild(filaAcciones);

        tablaPasajeros.appendChild(fila);
    });
}

async function eliminarPasajero(id) {
    const url = `http://localhost:3000/api/v1/pasajero/${id}`;
    const response = await fetch(url, {
        method: "DELETE"
    });

    // Si la respuesta está entre 200 - 299, que se actualice.
    if (response.ok) {
        await obtenerTodosPasajeros();
    }
}

async function nuevoPasajero() {
    const documento = document.getElementById("pasajero-documento");
    const nombre = document.getElementById("pasajero-nombre");
    const apellido = document.getElementById("pasajero-apellido");
    const edad = document.getElementById("pasajero-edad");
    const telefono = document.getElementById("pasajero-telefono");
    const estado = document.getElementById("pasajero-estado");
    const direccion = document.getElementById("pasajero-direccion");

    const url = `http://localhost:3000/api/v1/pasajero`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                documento: documento.value,
                nombre: nombre.value,
                apellido: apellido.value,
                edad: parseInt(edad.value, 10),
                telefono: telefono.value,
                salud: estado.value,
                direccion: direccion.value
            })
        });
    if (response.status == 201) {
        window.location.href = "http://localhost:8080/pasajero.html";
    };
}

async function obtenerPasajero() {
    let params = new URL(document.location.toString()).searchParams;
    const id = params.get('id');

    const url = `http://localhost:3000/api/v1/pasajero/${id}`;
    const response = await fetch(url);
    const pasajero = await response.json();

    const documento = pasajero.documento;
    const nombre = pasajero.nombre;
    const apellido = pasajero.apellido;
    const edad = pasajero.edad;
    const telefono = pasajero.telefono;
    const salud = pasajero.estado_salud;
    const direccion = pasajero.direccion;

    const filaId = document.getElementById("pasajero-id");
    const filaDocumento = document.getElementById("pasajero-documento");
    const filaNombre = document.getElementById("pasajero-nombre");
    const filaApellido = document.getElementById("pasajero-apellido");
    const filaEdad = document.getElementById("pasajero-edad");
    const filaTelefono = document.getElementById("pasajero-telefono");
    const filaEstado = document.getElementById("pasajero-estado");
    const filaDireccion = document.getElementById("pasajero-direccion");

    filaId.textContent = id;
    filaDocumento.textContent = documento;
    filaNombre.textContent = nombre;
    filaApellido.textContent = apellido;
    filaEdad.textContent = edad;
    filaTelefono.textContent = telefono;
    filaEstado.textContent = salud;
    filaDireccion.textContent = direccion;
}

async function actualizarPasajero() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const pasajeroActualizado = {
        documento: obtenerValorCampo("pasajero-documento"),
        nombre: obtenerValorCampo("pasajero-nombre"),
        apellido: obtenerValorCampo("pasajero-apellido"),
        edad: obtenerValorCampo("pasajero-edad"),
        telefono: obtenerValorCampo("pasajero-telefono"),
        salud: obtenerValorCampo("pasajero-estado"),
        direccion: obtenerValorCampo("pasajero-direccion")
    };

    const url = `http://localhost:3000/api/v1/pasajero/${id}`;
    const response = await fetch(url, {
        method: "PUT",
        headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pasajeroActualizado)
    });
    if (response.ok) {
            alert("Pasajero actualizado correctamente.");
            window.location.reload();
    }
}


// Diccionario para guardar los valores originales en caso de cancelar
const valoresOriginales = {};

/**
 * Convierte el texto de la celda en un Input
 */
function habilitarEdicion(idCampo, boton) {
    const td = document.getElementById(idCampo);
    
    // Si ya hay un input en la celda, no se hace nada
    if (td.querySelector('input')) return;

    // Guarda el valor actual para poder restaurarlo después
    const valorActual = td.textContent.trim();
    valoresOriginales[idCampo] = valorActual;

    // Reemplaza el contenido de la celda por un input con estilos de Bulma
    td.innerHTML = `<input class="input is-small" type="text" value="${valorActual}">`;

    // Transforma el botón a "Cancelar"
    boton.textContent = "Cancelar";
    boton.classList.remove("is-info");
    boton.classList.add("is-danger");

    // Cambia el evento onclick para cancelar la edición
    boton.onclick = function () {
        cancelarEdicion(idCampo, boton);
    };
}

/**
 * Restaura el estado original de la celda
 */
function cancelarEdicion(idCampo, boton) {
    const td = document.getElementById(idCampo);
    const valorOriginal = valoresOriginales[idCampo];

    // Vuelve a poner el texto original en el TD
    td.textContent = valorOriginal;

    // Vuelve a transformar el botón a "Modificar"
    boton.textContent = "Modificar";
    boton.classList.remove("is-danger");
    boton.classList.add("is-info");

    // Restaura el evento onclick a "habilitarEdicion"
    boton.onclick = function () {
        habilitarEdicion(idCampo, boton);
    };
}

/**
 * Función auxiliar para leer el valor final de un campo (sea input o texto plano)
 */
function obtenerValorCampo(idCampo) {
    const td = document.getElementById(idCampo);
    const input = td.querySelector('input');

    // Si existe un input, toma su valor; de lo contrario, toma el texto de la celda
    if (input) {
        return input.value.trim();
    } else {
        return td.textContent.trim();
    }
}