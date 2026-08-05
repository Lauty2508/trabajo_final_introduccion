function crearFilaPasajero(pasajero) {
    return `
        <tr>
            <td>${pasajero.pasajero_id}</td>
            <td>${pasajero.documento}</td>
            <td><strong>${pasajero.nombre} ${pasajero.apellido}</strong></td>
            <td>${pasajero.edad}</td>
            <td>
                <button
                    class="boton-tabla editar"
                    data-id="${pasajero.pasajero_id}">
                    Editar
                </button>

                <button
                    class="boton-tabla eliminar"
                    data-id="${pasajero.pasajero_id}">
                    Eliminar
                </button>
            </td>
        </tr>
    `;
}

async function obtenerPasajeros() {

    try {

        const respuesta = await fetch("http://localhost:3000/api/v1/pasajero");

        const datos = await respuesta.json();

        const tabla = document.getElementById("tabla-pasajeros");

        let filas = "";

        datos.forEach(pasajero => {

            filas += crearFilaPasajero(pasajero);

        });

        tabla.innerHTML = filas;

    } catch (error) {

        console.error(error);

    }

}

obtenerPasajeros();

const botonNuevoPasajero = document.getElementById("btn-nuevo-pasajero");
const formulario = document.getElementById("formulario-pasajero");
const formPasajero = document.getElementById("form-pasajero");
const botonCancelar = document.getElementById("btn-cancelar");

let pasajeroEditando = null;

function abrirFormulario() {

    if (pasajeroEditando === null) {

        formPasajero.reset();

    }

    formulario.classList.add("activo");

    botonNuevoPasajero.textContent = "Cancelar";

}

function cerrarFormulario() {

    formulario.classList.remove("activo");

    botonNuevoPasajero.textContent = "+ Registrar Pasajero";

    formPasajero.reset();

}

botonNuevoPasajero.addEventListener("click", () => {

    if (formulario.classList.contains("activo")) {

        cerrarFormulario();

        pasajeroEditando = null;

    } else {

        pasajeroEditando = null;

        document.getElementById("titulo-formulario").textContent = "Nuevo Pasajero";

        abrirFormulario();

    }

});

formPasajero.addEventListener("submit", async (event) => {

    event.preventDefault();
    
    const estado = document.getElementById("estado-de-salud").value === "true";

    const nuevoPasajero = {

        documento: document.getElementById("documento").value,
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        edad: document.getElementById("edad").value,
        telefono: document.getElementById("telefono").value,
        salud: estado,
        direccion: document.getElementById("direccion").value

    };

    const url = pasajeroEditando
        ? `http://localhost:3000/api/v1/pasajero/${pasajeroEditando}`
        : "http://localhost:3000/api/v1/pasajero";

    const metodo = pasajeroEditando ? "PUT" : "POST";

    const respuesta = await fetch(url, {

        method: metodo,

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(nuevoPasajero)

    });

    const resultado = await respuesta.json();

    console.log(resultado);

    cerrarFormulario();

    pasajeroEditando = null;

    await obtenerPasajeros();

});

document.addEventListener("click", async (event) => {

    if (!event.target.classList.contains("editar")) {
        return;
    }

    const id = event.target.dataset.id;

    const respuesta = await fetch(`http://localhost:3000/api/v1/pasajero/${id}`);

    const pasajero = await respuesta.json();

    pasajeroEditando = pasajero.pasajero_id;

    document.getElementById("titulo-formulario").textContent = "Editar Pasajero";

    document.getElementById("documento").value = pasajero.documento;
    document.getElementById("nombre").value = pasajero.nombre;
    document.getElementById("apellido").value = pasajero.apellido;
    document.getElementById("edad").value = pasajero.edad;
    document.getElementById("telefono").value = pasajero.telefono;
    document.getElementById("estado-de-salud").value = String(pasajero.estado_salud ?? pasajero.salud);
    document.getElementById("direccion").value = pasajero.direccion;

    abrirFormulario();

});

document.addEventListener("click", async (event) => {

    if (!event.target.classList.contains("eliminar")) {
        return;
    }

    const confirmar = confirm("¿Deseas eliminar este pasajero?");

    if (!confirmar) {
        return;
    }

    const id = event.target.dataset.id;

    const respuesta = await fetch("http://localhost:3000/api/v1/pasajero", {

        method: "DELETE",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            id: id
        })

    });

    const resultado = await respuesta.json();

    console.log(resultado);

    await obtenerPasajeros();

});

botonCancelar.addEventListener("click", () => {

    cerrarFormulario();

    pasajeroEditando = null;

    document.getElementById("titulo-formulario").textContent = "Nuevo Pasajero";

});