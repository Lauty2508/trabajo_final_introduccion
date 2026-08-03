import { Router } from 'express';
import { actualizarReserva, agregarReserva, eliminarReserva, obtenerTodasReservas } from '../db/reserva.js';

export const endpointsReserva = Router();

// Para obtener todas las reservas
endpointsReserva.get("/", async (req, res) => {
    const reservas = await obtenerTodasReservas();
    res.json(reservas);
}) 

// Para agregar una reserva
endpointsReserva.post("/", async (req, res) => {
    const reserva = await agregarReserva(
        req.body.asiento,
        req.body.fecha,
        req.body.precio,
        req.body.vuelo,
        req.body.pasajero
    );
    res.status(201).json({message: "Reserva agregada."});
}) 

// Para eliminar una reserva
endpointsReserva.delete("/", async (req, res) => {
    const reserva = await eliminarReserva(
        req.body.id
    );
    res.status(200).json({message: "Reserva eliminada."});
}) 

// Para actualizar una reserva
endpointsReserva.put("/:id", async (req, res) => {
    const id = req.params.id;
    const exito = await actualizarReserva(
        id,
        req.body.asiento,
        req.body.fecha,
        req.body.precio,
        req.body.vuelo,
        req.body.pasajero
    );
    if (exito) {
        res.status(200).json({ message: "Reserva actualizada correctamente." });
    } else {
        res.status(404).json({ message: "No se encontro la reserva para actualizar." });
    }
})
