import { db } from './pool.js';

// Para obtener la cantidad de viajes
export async function obtenerCantidadViajes(){
    const query = await db.query('SELECT COUNT(*) FROM viaje');
    const totalRegistros = parseInt(query.rows[0].count, 10);
    return totalRegistros;
}


// Para obtener todos los viajes
export async function obtenerTodosViajes(){
    const query = "SELECT * FROM viaje ORDER BY Viaje_id ASC;";
    const res = await db.query(query);
    return res.rows;
}

// Para agregar un viaje
export async function agregarViaje(fecha, horario, duracion, estado, plataforma_origen, plataforma_destino, naves){
    const query = "INSERT INTO viaje (Fecha_despegue, Horario_salida, Duracion, Estado_despegues, Plataforma_origen_id, Plataforma_destino_id, Naves_id) VALUES ($1, $2, $3, $4, $5, $6, $7);";
    const res = await db.query(query, [fecha, horario, duracion, estado, plataforma_origen, plataforma_destino, naves]);
    return res.rowCount == 1;
}

// Para actualizar un viaje
export async function actualizarViaje(id, fecha, horario, duracion, estado, plataforma_origen, plataforma_destino, naves) {
    const query = "UPDATE viaje SET Fecha_despegue = $1, Horario_salida = $2, Duracion = $3, Estado_despegues = $4, Plataforma_origen_id = $5, Plataforma_destino_id = $6, Naves_id = $7 WHERE Viaje_id = $8;";
    const res = await db.query(query, [fecha, horario, duracion, estado, plataforma_origen, plataforma_destino, naves, id]);
    return res.rowCount == 1;
}

// Para eliminar un viaje
export async function eliminarViaje(id){
    const query = "DELETE FROM viaje WHERE Viaje_id = $1";
    const res = await db.query(query, [id]);
    return res.rowCount == 1;
}
