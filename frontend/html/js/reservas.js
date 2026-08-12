function crearFilaReserva(reserva) {

    return `
        <tr>

            <td>${reserva.reserva_id}</td>

            <td>${obtenerNombrePasajero(reserva.pasajero_id)}</td>

            <td>${obtenerNombreViaje(reserva.vuelo_id)}</td>

            <td>${reserva.codigo_asiento}</td>

            <td>$${reserva.precio_pasaje}</td>

            <td>

                <button
                    class="boton-tabla editar"
                    data-id="${reserva.reserva_id}">
                    Editar
                </button>

                <button
                    class="boton-tabla eliminar"
                    data-id="${reserva.reserva_id}">
                    Eliminar
                </button>

            </td>

        </tr>
    `;

}

const botonNuevaReserva = document.getElementById("btn-nueva-reserva");

const formulario = document.getElementById("formulario-reserva");

const formReserva = document.getElementById("form-reserva");

const botonCancelar = document.getElementById("btn-cancelar");

let reservaEditando = null;

let listaPasajeros = [];

let listaViajes = [];

function obtenerNombrePasajero(id) {

    const pasajero = listaPasajeros.find(
        pasajero => pasajero.pasajero_id == id
    );

    if (!pasajero) {

        return id;

    }

    return `${pasajero.nombre} ${pasajero.apellido}`;

}

function obtenerNombreViaje(id) {

    const viaje = listaViajes.find(
        viaje => viaje.viaje_id == id
    );

    if (!viaje) {

        return `Viaje #${id}`;

    }

    return `Viaje #${viaje.viaje_id} - ${viaje.fecha_despegue}`;

}

async function obtenerReservas() {

    try {

        const respuesta = await fetch(
            "http://localhost:3000/api/v1/reserva"
        );

        const datos = await respuesta.json();

        const tabla = document.getElementById(
            "tabla-reservas"
        );

        let filas = "";

        datos.forEach(reserva => {

            filas += crearFilaReserva(reserva);

        });

        tabla.innerHTML = filas;

    } catch (error) {

        console.error(error);

    }

}

async function cargarPasajeros() {

    const respuesta = await fetch(
        "http://localhost:3000/api/v1/pasajero"
    );

    listaPasajeros = await respuesta.json();

    const select = document.getElementById("pasajero");

    select.innerHTML = `
        <option value="">
            Seleccione un pasajero
        </option>
    `;

    listaPasajeros.forEach(pasajero => {

        select.innerHTML += `
            <option value="${pasajero.pasajero_id}">
                ${pasajero.nombre} ${pasajero.apellido}
            </option>
        `;

    });

}

async function cargarViajes() {

    const respuesta = await fetch(
        "http://localhost:3000/api/v1/viaje"
    );

    listaViajes = await respuesta.json();

    const select = document.getElementById("vuelo");

    select.innerHTML = `
        <option value="">
            Seleccione un viaje
        </option>
    `;

    listaViajes.forEach(viaje => {

        select.innerHTML += `
            <option value="${viaje.viaje_id}">
                Viaje #${viaje.viaje_id} - ${viaje.fecha_despegue}
            </option>
        `;

    });

}

async function iniciarPagina() {

    await cargarPasajeros();

    await cargarViajes();

    await obtenerReservas();

}

function abrirFormulario() {

    if (reservaEditando === null) {

        formReserva.reset();

    }

    formulario.classList.add("activo");

    botonNuevaReserva.textContent = "Cancelar";

}

function cerrarFormulario() {

    formulario.classList.remove("activo");

    botonNuevaReserva.textContent = "+ Nueva Reserva";

    formReserva.reset();

}

botonNuevaReserva.addEventListener("click", () => {

    if (formulario.classList.contains("activo")) {

        cerrarFormulario();

        reservaEditando = null;

    } else {

        reservaEditando = null;

        document.getElementById("titulo-formulario").textContent =
            "Nueva Reserva";

        abrirFormulario();

    }

});

iniciarPagina();

const asiento = document.getElementById("codigo_asiento");
asiento.maxLength = 10;

formReserva.addEventListener("submit", async (event) => {

    event.preventDefault();

    const valorPrecio = parseFloat(document.getElementById("precio_pasaje").value);
    if (isNaN(valorPrecio) || valorPrecio <= 0) {
        alert("El precio debe ser mayor o igual a 1.");
        return;
    }

    const idViajeSeleccionado = document.getElementById("vuelo").value;
    const fechaReservaStr = document.getElementById("fecha_reserva").value;

    const viajeSeleccionado = listaViajes.find(viaje => viaje.viaje_id == idViajeSeleccionado);

    if (viajeSeleccionado) {
        const fechaReserva = new Date(fechaReservaStr);
        const fechaViaje = new Date(viajeSeleccionado.fecha_despegue.split("T")[0]);
        if (fechaReserva > fechaViaje) {
            alert("La fecha de la reserva no puede ser posterior a la fecha de despegue del viaje.");
            return;
        }
    };

    const nuevaReserva = {

        asiento: document.getElementById("codigo_asiento").value,
        fecha: document.getElementById("fecha_reserva").value,
        precio: valorPrecio,
        vuelo: document.getElementById("vuelo").value,
        pasajero: document.getElementById("pasajero").value

    };

    const url = reservaEditando
        ? `http://localhost:3000/api/v1/reserva/${reservaEditando}`
        : "http://localhost:3000/api/v1/reserva";

    const metodo = reservaEditando
        ? "PUT"
        : "POST";

    const respuesta = await fetch(url, {

        method: metodo,

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(nuevaReserva)

    });

    const resultado = await respuesta.json();
    if (!respuesta.ok) {
        alert(resultado.message);
        return;
    }

    alert(resultado.message);

    cerrarFormulario();

    reservaEditando = null;

    document.getElementById("titulo-formulario").textContent =
        "Nueva Reserva";

    await obtenerReservas();

});

document.addEventListener("click", async (event) => {

    if (!event.target.classList.contains("editar")) {
        return;
    }

    const id = event.target.dataset.id;

    const respuesta = await fetch(
        `http://localhost:3000/api/v1/reserva/${id}`
    );

    const reserva = await respuesta.json();

    reservaEditando = reserva.reserva_id;

    document.getElementById("titulo-formulario").textContent =
        "Editar Reserva";

    document.getElementById("codigo_asiento").value =
        reserva.codigo_asiento;

    document.getElementById("fecha_reserva").value =
        reserva.fecha_reserva.split("T")[0];

    document.getElementById("precio_pasaje").value =
        reserva.precio_pasaje;

    document.getElementById("vuelo").value =
        reserva.vuelo_id;

    document.getElementById("pasajero").value =
        reserva.pasajero_id;

    abrirFormulario();

});

document.addEventListener("click", async (event) => {

    if (!event.target.classList.contains("eliminar")) {
        return;
    }

    const confirmar = confirm(
        "¿Deseas eliminar esta reserva?"
    );

    if (!confirmar) {
        return;
    }

    const id = event.target.dataset.id;

    await fetch(
        "http://localhost:3000/api/v1/reserva",
        {

            method: "DELETE",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                id: id
            })

        }
    );

    await obtenerReservas();

});

botonCancelar.addEventListener("click", () => {

    cerrarFormulario();

    reservaEditando = null;

    document.getElementById("titulo-formulario").textContent =
        "Nueva Reserva";

});