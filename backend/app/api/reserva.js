import { Router } from 'express';
import { obtenerTodasReservas, agregarReserva, eliminarReserva } from '../db/reserva.js';

const endpointsReserva = Router();

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
    res.status(200).json({message: "Reserva agregada."});
}) 

// Para eliminar una reserva
endpointsReserva.delete("/", async (req, res) => {
    const reserva = await eliminarReserva(
        req.body.id
    );
    res.status(200).json({message: "Reserva eliminada."});
}) 


