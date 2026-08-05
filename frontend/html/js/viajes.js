function crearFilaViaje(viaje) {

    return `
        <tr>

            <td>${viaje.viaje_id}</td>

            <td>${viaje.plataforma_origen_id} → ${viaje.plataforma_destino_id}</td>

            <td>${viaje.naves_id}</td>

            <td>${viaje.fecha_despegue} ${viaje.horario_salida}</td>

            <td>
                <span class="estado ${obtenerClaseEstado(viaje.estado_despegues)}">
                    ${viaje.estado_despegues}
                </span>
            </td>

            <td>

                <button
                    class="boton-tabla editar"
                    data-id="${viaje.viaje_id}">
                    Editar
                </button>

                <button
                    class="boton-tabla eliminar"
                    data-id="${viaje.viaje_id}">
                    Eliminar
                </button>

            </td>

        </tr>
    `;

}

function obtenerClaseEstado(estado) {

    if (estado === "Programado") {
        return "disponible-texto";
    }

    if (estado === "Preparación") {
        return "mantenimiento-texto";
    }

    if (estado === "Autorizado") {
        return "autorizado-texto";
    }

    return "";

}

async function obtenerViajes() {

    try {

        const respuesta = await fetch("http://localhost:3000/api/v1/viaje");

        const datos = await respuesta.json();

        const tabla = document.getElementById("tabla-viajes");

        let filas = "";

        datos.forEach(viaje => {

            filas += crearFilaViaje(viaje);

        });

        tabla.innerHTML = filas;

    } catch (error) {

        console.error(error);

    }

}

obtenerViajes();

const botonNuevoViaje = document.getElementById("btn-nuevo-viaje");

const formulario = document.getElementById("formulario-viaje");

const formViaje = document.getElementById("form-viaje");

const botonCancelar = document.getElementById("btn-cancelar");

let viajeEditando = null;

function abrirFormulario() {

    if (viajeEditando === null) {

        formViaje.reset();

    }

    formulario.classList.add("activo");

    botonNuevoViaje.textContent = "Cancelar";

}

function cerrarFormulario() {

    formulario.classList.remove("activo");

    botonNuevoViaje.textContent = "+ Programar Viaje";

    formViaje.reset();

}

botonNuevoViaje.addEventListener("click", () => {

    if (formulario.classList.contains("activo")) {

        cerrarFormulario();

        viajeEditando = null;

    } else {

        viajeEditando = null;

        document.getElementById("titulo-formulario").textContent =
            "Nuevo Viaje";

        abrirFormulario();

    }

});

formViaje.addEventListener("submit", async (event) => {

    event.preventDefault();

    const nuevoViaje = {

        fecha: document.getElementById("fecha").value,
        horario: document.getElementById("horario").value,
        duracion: document.getElementById("duracion").value,
        estado: document.getElementById("estado").value,
        plataforma_origen: document.getElementById("plataforma_origen").value,
        plataforma_destino: document.getElementById("plataforma_destino").value,
        naves: document.getElementById("nave").value

    };

    const url = viajeEditando
        ? `http://localhost:3000/api/v1/viaje/${viajeEditando}`
        : "http://localhost:3000/api/v1/viaje";

    const metodo = viajeEditando ? "PUT" : "POST";

    const respuesta = await fetch(url, {

        method: metodo,

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(nuevoViaje)

    });

    const resultado = await respuesta.json();

    console.log(resultado);

    cerrarFormulario();

    viajeEditando = null;

    await obtenerViajes();

});

document.addEventListener("click", async (event) => {

    if (event.target.classList.contains("editar")) {

        const id = event.target.dataset.id;

        const respuesta = await fetch(`http://localhost:3000/api/v1/viaje/${id}`);

        const viaje = await respuesta.json();

        viajeEditando = viaje.viaje_id;

        document.getElementById("titulo-formulario").textContent =
            "Editar Viaje";

        document.getElementById("fecha").value = viaje.fecha_despegue;
        document.getElementById("horario").value = viaje.horario_salida;
        document.getElementById("duracion").value = viaje.duracion;
        document.getElementById("estado").value = viaje.estado_despegues;
        document.getElementById("plataforma_origen").value = viaje.plataforma_origen_id;
        document.getElementById("plataforma_destino").value = viaje.plataforma_destino_id;
        document.getElementById("nave").value = viaje.naves_id;

        abrirFormulario();

    }

});

document.addEventListener("click", async (event) => {

    if (!event.target.classList.contains("eliminar")) {
        return;
    }

    const confirmar = confirm("¿Deseas eliminar este viaje?");

    if (!confirmar) {
        return;
    }

    const id = event.target.dataset.id;

    const respuesta = await fetch("http://localhost:3000/api/v1/viaje", {

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

    await obtenerViajes();

});

botonCancelar.addEventListener("click", () => {

    cerrarFormulario();

    viajeEditando = null;

    document.getElementById("titulo-formulario").textContent =
        "Nuevo Viaje";

});
