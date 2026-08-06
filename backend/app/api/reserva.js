import { Router } from 'express';
import { actualizarReserva, agregarReserva, eliminarReserva, obtenerTodasReservas, obtenerUnaReserva } from '../db/reserva.js';
import { obtenerUnPasajero } from '../db/pasajero.js';

export const endpointsReserva = Router();

// Para obtener todas las reservas
endpointsReserva.get("/", async (req, res) => {
    const reservas = await obtenerTodasReservas();
    res.json(reservas);
})

// Para obtener una sola reserva
endpointsReserva.get("/:id", async (req, res) => {

    const id = req.params.id;

    const reserva = await obtenerUnaReserva(id);

    res.json(reserva);

});

// Para agregar una reserva
endpointsReserva.post("/", async (req, res) => {
    try {
        const id_pasajero = req.body.pasajero;
        const pasajero = await obtenerUnPasajero(id_pasajero);
        if (!pasajero || pasajero.estado_salud !== true) {
            return res.status(400).json({
                message: "Operación rechazada. El pasajero no se encuentra apto para tomar el vuelo"
            });
        }

        await agregarReserva(
            req.body.asiento,
            req.body.fecha,
            req.body.precio,
            req.body.vuelo,
            req.body.pasajero
        );
        res.status(201).json({ message: "Reserva agregada." });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error del servidor"
        });
    }
})

// Para eliminar una reserva
endpointsReserva.delete("/", async (req, res) => {
    const reserva = await eliminarReserva(
        req.body.id
    );
    res.status(200).json({ message: "Reserva eliminada." });
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
