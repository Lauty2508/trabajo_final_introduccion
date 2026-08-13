function crearFilaPlataforma(plataforma) {
    return `
        <tr>

            <td>${plataforma.plataforma_id}</td>

            <td><strong>${plataforma.pais}</strong></td>

            <td>
                ${plataforma.latitud},
                ${plataforma.longitud}
            </td>

            <td>${plataforma.capacidad_max_naves}</td>

            <td>
                <span class="estado ${obtenerClaseEstado(plataforma.estado_plataforma)}">
                    ${plataforma.estado_plataforma}
                </span>
            </td>

            <td>

                <button
                    class="boton-tabla editar"
                    data-id="${plataforma.plataforma_id}">
                    Editar
                </button>

                <button
                    class="boton-tabla eliminar"
                    data-id="${plataforma.plataforma_id}">
                    Eliminar
                </button>

            </td>

        </tr>
    `;

}

function obtenerClaseEstado(estado) {

    if (estado === "Operativa") {
        return "disponible-texto";
    }

    if (estado === "En mantenimiento") {
        return "mantenimiento-texto";
    }

    if (estado === "Fuera de servicio") {
        return "activo-texto";
    }

    return "";

}

async function obtenerPlataformas() {

    try {

        const respuesta = await fetch("http://localhost:3000/api/v1/plataforma");

        const datos = await respuesta.json();

        const tabla = document.getElementById("tabla-plataformas");

        let filas = "";

        datos.forEach(plataforma => {

            filas += crearFilaPlataforma(plataforma);

        });

        tabla.innerHTML = filas;

    } catch (error) {

        console.error(error);

    }

}

obtenerPlataformas();

const botonNuevaPlataforma = document.getElementById("btn-nueva-plataforma");

const formulario = document.getElementById("formulario-plataforma");

const formPlataforma = document.getElementById("form-plataforma");

const botonCancelar = document.getElementById("btn-cancelar");

let plataformaEditando = null;

function quedarseSoloConLetras(inputLetras) {
    inputLetras.addEventListener('input', function () {

        // Esta expresión regular busca cualquier carácter que NO sea:
        // a-z, A-Z, letras con tildes, la letra ñ, o espacios en blanco (\s)
        const regex = /[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g;

        // Reemplazamos lo que no coincida por una cadena vacía (lo eliminamos)
        this.value = this.value.replace(regex, '');
    });
}


quedarseSoloConLetras(document.getElementById("pais"));
const pais = document.getElementById("pais");
pais.maxLength = 30;

function abrirFormulario() {

    if (plataformaEditando === null) {

        formPlataforma.reset();

    }

    formulario.classList.add("activo");

    botonNuevaPlataforma.textContent = "Cancelar";

}

function cerrarFormulario() {

    formulario.classList.remove("activo");

    botonNuevaPlataforma.textContent = "+ Nueva Plataforma";

    formPlataforma.reset();

}

botonNuevaPlataforma.addEventListener("click", () => {

    if (formulario.classList.contains("activo")) {

        cerrarFormulario();

        plataformaEditando = null;

    } else {

        plataformaEditando = null;

        document.getElementById("titulo-formulario").textContent =
            "Nueva Plataforma";

        abrirFormulario();

    }

});
formPlataforma.addEventListener("submit", async (event) => {

    event.preventDefault();

    console.log("Formulario enviado");
    const valorCapacidad = parseFloat(document.getElementById("capacidad").value);
    if (isNaN(valorCapacidad) || valorCapacidad <= 0) {
        alert("La capacidad debe ser un mayor o igual a 1.");
        return;
    }
    const nuevaPlataforma = {

        pais: document.getElementById("pais").value,
        latitud: document.getElementById("latitud").value,
        longitud: document.getElementById("longitud").value,
        capacidad: valorCapacidad,
        estado: document.getElementById("estado").value

    };

    const url = plataformaEditando
        ? `http://localhost:3000/api/v1/plataforma/${plataformaEditando}`
        : "http://localhost:3000/api/v1/plataforma";

    const metodo = plataformaEditando ? "PUT" : "POST";

    const respuesta = await fetch(url, {

        method: metodo,

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(nuevaPlataforma)

    });

    const resultado = await respuesta.json();

    console.log(resultado);

    if (!respuesta.ok) {
        alert(resultado.message);
        return;
    }

    alert(resultado.message);

    cerrarFormulario();

    plataformaEditando = null;

    await obtenerPlataformas();


});

document.addEventListener("click", async (event) => {

    if (event.target.classList.contains("editar")) {

        const id = event.target.dataset.id;

        const respuesta = await fetch(`http://localhost:3000/api/v1/plataforma/${id}`);

        const plataforma = await respuesta.json();

        plataformaEditando = plataforma.plataforma_id;

        document.getElementById("titulo-formulario").textContent =
            "Editar Plataforma";

        document.getElementById("pais").value = plataforma.pais;
        document.getElementById("latitud").value = plataforma.latitud;
        document.getElementById("longitud").value = plataforma.longitud;
        document.getElementById("capacidad").value = plataforma.capacidad_max_naves;
        document.getElementById("estado").value = plataforma.estado_plataforma;

        abrirFormulario();

    }

});

document.addEventListener("click", async (event) => {

    if (!event.target.classList.contains("eliminar")) {
        return;
    }

    const confirmar = confirm("¿Deseas eliminar esta plataforma? Los viajes asociados a esta plataforma también serán eliminados");

    if (!confirmar) {
        return;
    }

    const id = event.target.dataset.id;

    const respuesta = await fetch("http://localhost:3000/api/v1/plataforma", {

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

    await obtenerPlataformas();

});

botonCancelar.addEventListener("click", () => {

    cerrarFormulario();

    plataformaEditando = null;

    document.getElementById("titulo-formulario").textContent =
        "Nueva Plataforma";

})