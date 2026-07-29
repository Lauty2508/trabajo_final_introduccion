import { db } from '../pool.js';

// Para obtener todas las naves
export async function obtenerTodasNaves(){
    const query = "SELECT * FROM nave;";
    const res = await db.query(query);
    return res.rows;
}

// Para obtener solo una nave
export async function obtenerUnaNave(id){
    const query = "SELECT * FROM nave WHERE Nave_id = $1;";
    const res = await db.query(query, [id]);
    return res.rows[0];
}

// Para agregar una nave
export async function agregarNave(modelo, tiempo, anio, kilometraje, capacidad, estado){
    const query = "INSERT INTO nave (Modelo, Tiempo_de_uso, Anio_fabricacion, Kilometraje_recorrido, Capacidad_max_pasajeros, Estado) VALUES ($1, $2, $3, $4, $5, $6);";
    const res = await db.query(query, [modelo, tiempo, anio, kilometraje, capacidad, estado]);
    return res.rowCount == 1;
}

// Para eliminar una nave
export async function eliminarNave(id){
    const query = "DELETE FROM nave WHERE Nave_id = $1";
    const res = await db.query(query, [id]);
    return res.rowCount == 1;
}