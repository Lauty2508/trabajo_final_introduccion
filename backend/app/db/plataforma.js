import { db } from './pool.js';

// Para obtener la cantidad de plataformas
export async function obtenerCantidadPlataformas(){
    const query = await db.query('SELECT COUNT(*) FROM plataforma');
    const totalRegistros = parseInt(query.rows[0].count, 10);
    return totalRegistros;
}



// Para obtener todas las plataformas
export async function obtenerTodasPlataformas(){
    const query = "SELECT * FROM plataforma ORDER BY Plataforma_id ASC;";
    const res = await db.query(query);
    return res.rows;
}

// Para obtener solo una plataforma
export async function obtenerUnaPlataforma(id){
    const query = "SELECT * FROM plataforma WHERE Plataforma_id = $1;";
    const res = await db.query(query, [id]);
    return res.rows[0];
}

// Para agregar una plataforma
export async function agregarPlataforma(pais, latitud, longitud, capacidad, estado){
    const query = "INSERT INTO plataforma (Pais, Latitud, Longitud, Capacidad_max_naves, Estado_plataforma) VALUES ($1, $2, $3, $4, $5);";
    const res = await db.query(query, [pais, latitud, longitud, capacidad, estado]);
    return res.rowCount == 1;
}

// Para eliminar una plataforma
export async function eliminarPlataforma(id){
    const query = "DELETE FROM plataforma WHERE Plataforma_id = $1";
    const res = await db.query(query, [id]);
    return res.rowCount == 1;
}

// Para actualizar una plataforma
export async function actualizarPlataforma(id, pais, latitud, longitud, capacidad, estado) {
    const query = "UPDATE plataforma SET Pais = $1, Latitud = $2, Longitud = $3, Capacidad_max_naves = $4, Estado_plataforma = $5 WHERE Plataforma_id = $6;";
    const res = await db.query(query, [pais, latitud, longitud, capacidad, estado, id]);
    return res.rowCount == 1;
}