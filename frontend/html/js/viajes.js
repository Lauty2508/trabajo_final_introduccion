function crearFilaViaje(viaje) {
    const origen = viaje.plataforma_origen_nombre;
    const destino = viaje.plataforma_destino_nombre;
    const nave = viaje.nave_nombre;

    return `
        <tr>
            <td>${viaje.viaje_id}</td>
            <td>${origen} → ${destino}</td>
            <td>${nave}</td>
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

let listaViajes = [];

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

        listaViajes = datos; // Guardamos los datos para validarlos luego

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

async function cargarPlataforma(){
    const respuesta = await fetch(
        "http://localhost:3000/api/v1/plataforma"
    );

    const listaPlataformas = await respuesta.json();
    const plataformaOrigen = document.getElementById("plataforma_origen");
    const plataformaDestino = document.getElementById("plataforma_destino");
    plataformaOrigen.innerHTML = `
        <option value="">
            Seleccione una plataforma de origen
        </option>
    `;
    plataformaDestino.innerHTML = `
        <option value="">
            Seleccione una plataforma de destino
        </option>
    `;

    listaPlataformas.forEach(plataforma => {
        // Usa la propiedad de ID que retorne la API de plataformas (ej: id o plataforma_id)
        const id = plataforma.plataforma_id || plataforma.id; 

        plataformaOrigen.innerHTML += `
            <option value="${id}">${plataforma.pais}</option>
        `;
        plataformaDestino.innerHTML += `
            <option value="${id}">${plataforma.pais}</option>
        `;
    });
}
async function cargarNave(){
    const respuesta = await fetch(
        "http://localhost:3000/api/v1/nave"
    );

    const listaNaves = await respuesta.json();
    const nave = document.getElementById("nave");
    nave.innerHTML = `
        <option value="">
            Seleccione una nave
        </option>
    `;
    listaNaves.forEach(naves => {

        nave.innerHTML += `
            <option value="${naves.nave_id}">
                ${naves.modelo}
            </option>
        `;
    });
}

cargarNave();
cargarPlataforma();
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

    const valorDuracion = parseFloat(document.getElementById("duracion").value);
    if (isNaN(valorDuracion) || valorDuracion <= 0) {
        alert("La duración debe ser mayor que 1.");
        return;
    }

    const fechaIngresada = document.getElementById("fecha").value;
    const horarioIngresado = document.getElementById("horario").value;
    const naveSeleccionada = document.getElementById("nave").value;

    // Cálculo de Inicio y Fin del nuevo viaje en milisegundos
    // Se agrega el ":00" para asegurar un formato válido en todos los navegadores
    const inicioNuevoViaje = new Date(`${fechaIngresada}T${horarioIngresado}:00`).getTime();
    // Sumamos la duración (minutos * 60000 para pasar a milisegundos)
    const finNuevoViaje = inicioNuevoViaje + (valorDuracion * 60000); 

    // Se verifica si hay algún conflicto con los viajes existentes
    const hayConflicto = listaViajes.some(viaje => {
        // Se ignora el viaje actual si estamos en modo "Edición"
        if (viajeEditando && viaje.viaje_id == viajeEditando) return false;

        // Si es otra nave distinta, no hay problema
        if (viaje.naves_id != naveSeleccionada) return false;

        // Cálculo de Inicio y Fin del viaje existente
        const fechaLimpia = viaje.fecha_despegue.split("T")[0];
        const inicioExistente = new Date(`${fechaLimpia}T${viaje.horario_salida}`).getTime();
        const finExistente = inicioExistente + (viaje.duracion * 60000);

        // Se verifica la superposición de rangos
        return (inicioExistente < finNuevoViaje && inicioNuevoViaje < finExistente505);
    });

    if (hayConflicto) {
        alert("La nave seleccionada ya está ocupada en ese rango de fecha y horario por otro viaje.");
        return;
    }
    
    const nuevoViaje = {

        fecha: fechaIngresada,
        horario: horarioIngresado,
        duracion: valorDuracion,
        estado: document.getElementById("estado").value,
        plataforma_origen: document.getElementById("plataforma_origen").value,
        plataforma_destino: document.getElementById("plataforma_destino").value,
        naves: naveSeleccionada

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

    if (!respuesta.ok) {
        alert(resultado.message);
        return;
    }

    alert(resultado.message);

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

        const fechaLimpia = viaje.fecha_despegue.split("T")[0];

        document.getElementById("fecha").value = fechaLimpia;
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

    const confirmar = confirm("¿Deseas eliminar este viaje? Las reservas asociadas a este viaje también serán eliminadas");

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

const hoy = new Date().toISOString().split("T")[0];
const campoFecha = document.getElementById("fecha");
campoFecha.min = hoy;

