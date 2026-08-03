import { db } from './pool.js';

// Para obtener todos los pasajeros
export async function obtenerTodosPasajeros(){
    const query = "SELECT * FROM pasajeros;";
    const res = await db.query(query);
    return res.rows;
}

// Para obtener solo un pasajero
export async function obtenerUnPasajero(id){
    const query = "SELECT * FROM pasajeros WHERE Pasajero_id = $1;";
    const res = await db.query(query, [id]);
    return res.rows[0];
}

// Para agregar un pasajero
export async function agregarPasajero(documento, nombre, apellido, edad, telefono, salud, direccion){
    const query = "INSERT INTO pasajeros (Documento, Nombre, Apellido, Edad, Telefono, Estado_salud, Direccion) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);";
    const res = await db.query(query, [documento, nombre, apellido, edad, telefono, salud, direccion]);
    return res.rowCount == 1;
}

// Para eliminar un pasajero
export async function eliminarPasajero(id){
    const query = "DELETE FROM pasajeros WHERE Pasajero_id = $1";
    const res = await db.query(query, [id]);
    return res.rowCount == 1;
}

// Para actualizar un pasajero
export async function actualizarPasajero(id, documento, nombre, apellido, edad, telefono, salud, direccion) {
    const query = "UPDATE pasajeros SET Documento = $1, Nombre = $2, Apellido = $3, Edad = $4, Telefono = $5, Estado_salud = $6, Direccion = $7 WHERE Pasajero_id = $8;";
    const res = await db.query(query, [documento, nombre, apellido, edad, telefono, salud, direccion, id]);
    return res.rowCount == 1;
}
