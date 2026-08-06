function crearFilaNave(nave) {
    return `
        <tr>
            <td>${nave.nave_id}</td>
            <td><strong>${nave.modelo}</strong></td>
            <td>${nave.capacidad_max_pasajeros}</td>
            <td>
                <span class="estado ${obtenerClaseEstado(nave.estado)}">
                    ${nave.estado}
                </span>
            </td>
            <td>
                <button
                    class="boton-tabla editar"
                    data-id="${nave.nave_id}">
                    Editar
                </button>

                <button
                    class="boton-tabla eliminar"
                    data-id="${nave.nave_id}">
                    Eliminar
                </button>
            </td>
        </tr>
    `;
}

function obtenerClaseEstado(estado) {

    if (estado === "Operativa" || estado === "Operativa 2") {
        return "disponible-texto";
    }

    if (estado === "En mantenimiento" || estado === "En revision tecnica") {
        return "mantenimiento-texto";
    }

    if (estado === "Fuera de servicio") {
        return "activo-texto";
    }

    return "";
}

async function obtenerNaves() {
    try {
        const respuesta = await fetch("http://localhost:3000/api/v1/nave");
        const datos = await respuesta.json();

        const tabla = document.getElementById("tabla-naves");

        let filas = "";

        datos.forEach(nave => {
        filas += crearFilaNave(nave);
        });

        tabla.innerHTML = filas;

    } catch (error) {
        console.error("Error al obtener las naves:", error);
    }
}

const modelo = document.getElementById("modelo");
modelo.maxLength = 30;

obtenerNaves();

// aparicion formulario
const botonNuevaNave = document.getElementById("btn-nueva-nave");
const formulario = document.getElementById("formulario-nave");
const formNave = document.getElementById("form-nave");
const botonCancelar = document.getElementById("btn-cancelar");
let naveEditando = null;

function abrirFormulario() {
    if (naveEditando === null) {
    formNave.reset();
    }
    formulario.classList.add("activo");

    botonNuevaNave.textContent = "Cancelar";

}

function cerrarFormulario() {

    formulario.classList.remove("activo");

    botonNuevaNave.textContent = "+ Nueva Nave";

    formNave.reset();

}


botonNuevaNave.addEventListener("click", () => {

    if (formulario.classList.contains("activo")) {

        cerrarFormulario();

        naveEditando = null;

    } else {

        naveEditando = null;

        document.getElementById("titulo-formulario").textContent = "Nueva Nave";

        abrirFormulario();

    }

});

formNave.addEventListener("submit", async (event) => {

    event.preventDefault();

    const nuevaNave = {
        modelo: document.getElementById("modelo").value,
        tiempo: document.getElementById("tiempo").value,
        anio: document.getElementById("anio").value,
        kilometraje: document.getElementById("kilometraje").value,
        capacidad: document.getElementById("capacidad").value,
        estado: document.getElementById("estado").value
    };
    const url = naveEditando
        ? `http://localhost:3000/api/v1/nave/${naveEditando}`
        : "http://localhost:3000/api/v1/nave";

    const metodo = naveEditando ? "PUT" : "POST";

    const respuesta = await fetch(url, {
        method: metodo,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevaNave)
    });

const resultado = await respuesta.json();


    console.log(resultado);

    cerrarFormulario();
    naveEditando = null;

    await obtenerNaves();

});

document.addEventListener("click", async (event) => {

    if (event.target.classList.contains("editar")) {

        const id = event.target.dataset.id;

        const respuesta = await fetch(`http://localhost:3000/api/v1/nave/${id}`);

        const nave = await respuesta.json();

        naveEditando = nave.nave_id;

        document.getElementById("titulo-formulario").textContent = "Editar Nave";

        document.getElementById("modelo").value = nave.modelo;
        document.getElementById("tiempo").value = nave.tiempo_de_uso;
        document.getElementById("anio").value = nave.anio_fabricacion;
        document.getElementById("kilometraje").value = nave.kilometraje_recorrido;
        document.getElementById("capacidad").value = nave.capacidad_max_pasajeros;
        document.getElementById("estado").value = nave.estado;

        abrirFormulario();

    }

});

document.addEventListener("click", async (event) => {

    if (!event.target.classList.contains("eliminar")) {
        return;
    }

    const confirmar = confirm("¿Deseas eliminar esta nave?");

    if (!confirmar) {
        return;
    }

    const id = event.target.dataset.id;

    const respuesta = await fetch("http://localhost:3000/api/v1/nave", {
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

    await obtenerNaves();

});

botonCancelar.addEventListener("click", () => {

    cerrarFormulario();

    naveEditando = null;

    document.getElementById("titulo-formulario").textContent = "Nueva Nave";

});
