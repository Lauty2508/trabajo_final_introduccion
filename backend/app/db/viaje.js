import { db } from './pool.js';

// Para obtener la cantidad de viajes
export async function obtenerCantidadViajes(){
    const query = await db.query('SELECT COUNT(*) FROM viaje');
    const totalRegistros = parseInt(query.rows[0].count, 10);
    return totalRegistros;
}

// Para obtener los primeros tres viajes
export async function obtenerTresViajes(){
    const query = `
    SELECT 
        v.Viaje_id,
        v.Fecha_despegue,
        v.Horario_salida,
        v.Duracion,
        v.Estado_despegues,
        v.Plataforma_origen_id,
        v.Plataforma_destino_id,
        v.Naves_id,
        CONCAT(po.Pais, ' (Id - ', po.Plataforma_id, ')') AS plataforma_origen_nombre,
        CONCAT(pd.Pais, ' (Id - ', pd.Plataforma_id, ')') AS plataforma_destino_nombre
    FROM VIAJE v
    JOIN PLATAFORMA po ON v.Plataforma_origen_id = po.Plataforma_id
    JOIN PLATAFORMA pd ON v.Plataforma_destino_id = pd.Plataforma_id
    JOIN NAVE n ON v.Naves_id = n.Nave_id
    ORDER BY Viaje_id ASC
    LIMIT 3;`
    const res = await db.query(query);
    return res.rows;
}

// Para obtener todos los viajes
export async function obtenerTodosViajes(){
    const query = `
    SELECT 
        v.Viaje_id,
        v.Fecha_despegue,
        v.Horario_salida,
        v.Duracion,
        v.Estado_despegues,
        v.Plataforma_origen_id,
        v.Plataforma_destino_id,
        v.Naves_id,
        CONCAT(po.Pais, ' (Id - ', po.Plataforma_id, ')') AS plataforma_origen_nombre,
        CONCAT(pd.Pais, ' (Id - ', pd.Plataforma_id, ')') AS plataforma_destino_nombre,
        CONCAT(n.Modelo, ' (Id - ', n.Nave_id, ')') AS nave_nombre
    FROM VIAJE v
    JOIN PLATAFORMA po ON v.Plataforma_origen_id = po.Plataforma_id
    JOIN PLATAFORMA pd ON v.Plataforma_destino_id = pd.Plataforma_id
    JOIN NAVE n ON v.Naves_id = n.Nave_id
    ORDER BY Viaje_id ASC;`
    const res = await db.query(query);
    return res.rows;
}


// Para obtener solo un viaje
export async function obtenerUnViaje(id){
    const query = "SELECT * FROM viaje WHERE Viaje_id = $1;";
    const res = await db.query(query, [id]);
    return res.rows[0];
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

// Para obtener la cantidad de viajes asignados a una plataforma (como origen o destino)
export async function obtenerCantidadViajesPorPlataforma(plataformaId, viajeIdExcluido = null) {
    let query = "SELECT COUNT(*) FROM viaje WHERE (Plataforma_origen_id = $1 OR Plataforma_destino_id = $1)";
    const params = [plataformaId];
    if (viajeIdExcluido) {
        query += " AND Viaje_id != $2";
        params.push(viajeIdExcluido);
    }
    const res = await db.query(query, params);
    return parseInt(res.rows[0].count, 10);
}

// Para verificar si una nave ya tiene asignado un viaje en la misma fecha y horario
export async function existeViajeNaveEnHorario(naveId, fecha, horario, viajeIdExcluido = null) {
    let query = "SELECT COUNT(*) FROM viaje WHERE Naves_id = $1 AND Fecha_despegue = $2 AND Horario_salida = $3";
    const params = [naveId, fecha, horario];
    if (viajeIdExcluido) {
        query += " AND Viaje_id != $4";
        params.push(viajeIdExcluido);
    }
    const res = await db.query(query, params);
    return parseInt(res.rows[0].count, 10) > 0;
}

