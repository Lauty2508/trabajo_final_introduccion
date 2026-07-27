import { Router } from 'express';
import { obtenerTodosViajes, agregarViaje } from '../db/viaje.js';

const endpointsViaje = Router();

// Para obtener todos los viajes
endpointsViaje.get("/", async (req, res) => {
    const viajes = await obtenerTodosViajes();
    res.json(viajes);
}) 

// Para agregar un viaje
endpointsViaje.post("/", async (req, res) => {
    const viaje = await agregarViaje(
        req.body.fecha,
        req.body.horario,
        req.body.duracion,
        req.body.estado,
        req.body.plataforma_origen,
        req.body.plataforma_destino,
        req.body.naves
    );
    res.status(201).json({message: "Viaje agregado."});
}) 


