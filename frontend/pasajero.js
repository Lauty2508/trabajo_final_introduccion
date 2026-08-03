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