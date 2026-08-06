async function obtenerConexiones(){
    obtenerCantidadNaves();
    obtenerCantidadPlataformas();
    obtenerCantidadViajes();
    obtenerTresViajes();
}

async function obtenerCantidadNaves(){
    const response = await fetch('http://localhost:3000/api/v1/nave/count');
    const data = await response.json();
    const p = document.getElementById("naves");
    p.textContent = data.total;
}

async function obtenerCantidadPlataformas(){
    const response = await fetch('http://localhost:3000/api/v1/plataforma/count');
    const data = await response.json();
    const p = document.getElementById("plataformas");
    p.textContent = data.total;
}

async function obtenerCantidadViajes(){
    const response = await fetch('http://localhost:3000/api/v1/viaje/count');
    const data = await response.json();
    const p = document.getElementById("viajes");
    p.textContent = data.total;
}

async function obtenerTresViajes() {
    const response = await fetch('http://localhost:3000/api/v1/viaje/tres');
    const data = await response.json();
    let n = 1;
    data.forEach(viaje => {
        let h4viaje = document.getElementById(`viaje-${n}`);
        let pInformacion = document.getElementById(`informacion-${n}`);
        let spanEstado = document.getElementById(`estado-${n}`);
        const idViaje = viaje.viaje_id;
        const origen = viaje.plataforma_origen_nombre;
        const destino = viaje.plataforma_destino_nombre;
        const estado = viaje.estado_despegues;

        spanEstado.classList.remove("disponible-texto")
        spanEstado.classList.remove("mantenimiento-texto")
        spanEstado.classList.remove("activo-texto")

        if (estado === "Programado") {
            spanEstado.classList.add("disponible-texto")
        } else if ( estado === "Preparación") {
            spanEstado.classList.add("mantenimiento-texto")
        } else {
            spanEstado.classList.add("autorizado-texto")
        }

        h4viaje.textContent = `${origen} → ${destino}`;
        pInformacion.textContent = `Viaje #${idViaje}`;
        spanEstado.textContent = estado;
        n = n + 1;
    });
}