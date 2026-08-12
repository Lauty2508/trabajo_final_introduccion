import { Router } from 'express';
import { actualizarNave, agregarNave, eliminarNave, obtenerTodasNaves, obtenerUnaNave, obtenerCantidadNaves } from '../db/nave.js';

export const endpointsNave = Router();

// Para obtener la cantidad de naves
endpointsNave.get("/count", async (req, res) => {
    const cantidad = await obtenerCantidadNaves();
    res.json({ total: cantidad });
})

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
    const anio = Number(req.body.anio);
        if (anio < 2000){
        return res.status(400).json({
            error: "El año de fabricacion debe ser 2000 o posterior"
        })
    }
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
