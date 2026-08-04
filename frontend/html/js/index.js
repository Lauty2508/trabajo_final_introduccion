async function obtenerCantidadNaves(){
    const response = await fetch('http://localhost:3000/api/v1/nave/count');
    const data = await response.json();
    const p = document.getElementById("naves");
    p.textContent = data.total;
}