import { Router } from 'express';
import { actualizarNave, agregarNave, eliminarNave, obtenerTodasNaves, obtenerUnaNave } from '../db/nave.js';

export const endpointsNave = Router();

// Para obtener todas las naves
endpointsNave.get("/", async (req, res) => {
    const naves = await obtenerTodasNaves();
    res.json(naves);
}) 

// Para obtener una sola nave
endpointsNave.get("/:id", async (req, res) => {
    let id = req.params.id;
    const nave = await obtenerUnaNave(id);
    res.json(nave);
}) 

// Para agregar una nave
endpointsNave.post("/", async (req, res) => {
    const nave = await agregarNave(
        req.body.modelo,
        req.body.tiempo,
        req.body.anio,
        req.body.kilometraje,
        req.body.capacidad,
        req.body.estado
    );
    res.status(201).json({message: "Nave agregada."});
}) 

// Para eliminar una nave
endpointsNave.delete("/", async (req, res) => {
    const nave = await eliminarNave(
        req.body.id
    );
    res.status(200).json({ message: "Nave eliminada." });
}) 

// Para actualizar una nave
endpointsNave.put("/:id", async (req, res) => {
    const id = req.params.id;
    const exito = await actualizarNave(
        id,
        req.body.modelo,
        req.body.tiempo,
        req.body.anio,
        req.body.kilometraje,
        req.body.capacidad,
        req.body.estado
    );
    if (exito) {
        res.status(200).json({ message: "Nave actualizada correctamente." });
    } else {
        res.status(404).json({ message: "No se encontro la nave para actualizar." });
    }
})
