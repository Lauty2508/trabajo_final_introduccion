import { db } from '../pool.js';

// Para obtener todas las reservas
export async function obtenerTodasReservas(){
    const query = "SELECT * FROM reserva;";
    const res = await db.query(query);
    return res.rows;
}

// Para agregar una reserva
export async function agregarReserva(asiento, fecha, precio, vuelo, pasajero){
    const query = "INSERT INTO reserva (Codigo_asiento, Fecha_reserva, Precio_pasaje, Vuelo_id, Pasajero_id) VALUES ($1, $2, $3, $4, $5);";
    const res = await db.query(query, [asiento, fecha, precio, vuelo, pasajero]);
    return res.rowCount == 1;
}

// Para eliminar una reserva
export async function eliminarReserva(id){
    const query = "DELETE FROM reserva WHERE Reserva_id = $1";
    const res = await db.query(query, [id]);
    return res.rowCount == 1;
}

// Para actualizar una reserva
export async function actualizarReserva(id, asiento, fecha, precio, vuelo, pasajero) {
    const query = "UPDATE reserva SET Codigo_asiento = $1, Fecha_reserva = $2, Precio_pasaje = $3, Vuelo_id = $4, Pasajero_id = $5 WHERE Reserva_id = $6;";
    const res = await db.query(query, [asiento, fecha, precio, vuelo, pasajero, id]);
    return res.rowCount == 1;
}