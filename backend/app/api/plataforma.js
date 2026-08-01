import { Router } from 'express';
import { actualizarPlataforma, agregarPlataforma, eliminarPlataforma, obtenerTodasPlataformas, obtenerUnaPlataforma } from '../db/plataforma.js';

export const endpointsPlataforma = Router();

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

// Para actualizar una plataforma
endpointsPlataforma.put("/:id", async (req, res) => {
    const id = req.params.id;
    const exito = await actualizarPlataforma(
        id,
        req.body.pais,
        req.body.latitud,
        req.body.longitud,
        req.body.capacidad,
        req.body.estado
    );
    if (exito) {
        res.status(200).json({ message: "Plataforma actualizada correctamente." });
    } else {
        res.status(404).json({ message: "No se encontro la plataforma para actualizar." });
    }
})


