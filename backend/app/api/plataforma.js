import { Router } from 'express';
import { obtenerTodasPlataformas, obtenerUnaPlataforma, agregarPlataforma, eliminarPlataforma } from '../db/plataforma.js';

const endpointsPlataforma = Router();

// Para obtener todas las plataformas
endpointsPlataforma.get("/", async (req, res) => {
    const plataformas = await obtenerTodasPlataformas();
    res.json(plataformas);
}) 

// Para obtener una sola plataforma
endpointsPlataforma.get("/:id", async (req, res) => {
    let id = req.params.id;
    const plataforma = await obtenerUnaPlataforma(id);
    res.json(plataforma);
}) 

// Para agregar una plataforma
endpointsPlataforma.post("/", async (req, res) => {
    const plataforma = await agregarPlataforma(
        req.body.pais,
        req.body.latitud,
        req.body.longitud,
        req.body.capacidad,
        req.body.estado
    );
    res.status(201).json({message: "Plataforma agregada."});
}) 

// Para eliminar una plataforma
endpointsPlataforma.delete("/", async (req, res) => {
    const plataforma = await eliminarPlataforma(
        req.body.id
    );
    res.status(200).json({message: "Plataforma eliminada."});
}) 


