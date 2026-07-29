import { Router } from 'express';
import { obtenerTodosPasajeros, obtenerUnPasajero, agregarPasajero, eliminarPasajero } from '../db/pasajero.js';

const endpointsPasajero = Router();

// Para obtener todos los pasajeros
endpointsPasajero.get("/", async (req, res) => {
    const pasajeros = await obtenerTodosPasajeros();
    res.json(pasajeros);
}) 

// Para obtener un solo pasajero
endpointsPasajero.get("/:id", async (req, res) => {
    let id = req.params.id;
    const pasajero = await obtenerUnPasajero(id);
    res.json(pasajero);
}) 

// Para agregar un pasajero
endpointsPasajero.post("/", async (req, res) => {
    const pasajero = await agregarPasajero(
        req.body.documento,
        req.body.nombre,
        req.body.apellido,
        req.body.edad,
        req.body.telefono,
        req.body.salud,
        req.body.direccion
    );;
    res.status(201).json({message: "Pasajero agregado."});
}) 

// Para eliminar un pasajero
endpointsPasajero.delete("/", async (req, res) => {
    const pasajero = await eliminarPasajero(
        req.body.id
    );
    res.status(200).json({message: "Pasajero eliminado."});
}) 


