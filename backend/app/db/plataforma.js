import { db } from './pool.js';

// Para obtener todas las plataformas
export async function obtenerTodasPlataformas(){
    const query = "SELECT * FROM plataforma;";
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