async function obtenerCantidades(){
    obtenerCantidadNaves();
    obtenerCantidadPlataformas();
    obtenerCantidadViajes();
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
