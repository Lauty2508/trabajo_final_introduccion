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
                    class="boton-tabla"
                    data-id="${nave.nave_id}">
                    Editar
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

obtenerNaves();

// aparicion formulario
const botonNuevaNave = document.getElementById("btn-nueva-nave");
const formulario = document.getElementById("formulario-nave");
const formNave = document.getElementById("form-nave");


botonNuevaNave.addEventListener("click", () => {

    if (formulario.style.display === "none") {

        formulario.style.display = "block";
        botonNuevaNave.textContent = "Cancelar";

    } else {

        formulario.style.display = "none";
        botonNuevaNave.textContent = "+ Nueva Nave";

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

    const respuesta = await fetch("http://localhost:3000/api/v1/nave", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevaNave)
    });

    const resultado = await respuesta.json();

    console.log(resultado);

    formNave.reset();

    formulario.style.display = "none";

    botonNuevaNave.textContent = "+ Nueva Nave";

    await obtenerNaves();

});

document.addEventListener("click", async (event) => {

    if (!event.target.classList.contains("boton-tabla")) {
        return;
    }

    const id = event.target.dataset.id;

    const respuesta = await fetch(`http://localhost:3000/api/v1/nave/${id}`);

    const nave = await respuesta.json();
    document.getElementById("modelo").value = nave.modelo;
    document.getElementById("tiempo").value = nave.tiempo_de_uso;
    document.getElementById("anio").value = nave.anio_fabricacion;
    document.getElementById("kilometraje").value = nave.kilometraje_recorrido;
    document.getElementById("capacidad").value = nave.capacidad_max_pasajeros;
    document.getElementById("estado").value = nave.estado;

    formulario.style.display = "block";

    botonNuevaNave.textContent = "Cancelar";

    console.log(nave);

});
