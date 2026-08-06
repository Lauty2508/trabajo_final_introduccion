import { Router } from 'express';
import { actualizarViaje, agregarViaje, eliminarViaje, obtenerTodosViajes, obtenerCantidadViajes, obtenerUnViaje, obtenerCantidadViajesPorPlataforma, existeViajeNaveEnHorario, obtenerTresViajes } from '../db/viaje.js';
import { obtenerUnaNave } from '../db/nave.js';
import { obtenerUnaPlataforma } from '../db/plataforma.js';

export const endpointsViaje = Router();

// Para obtener la cantidad de viajes
endpointsViaje.get("/count", async (req, res) => {
    const cantidad = await obtenerCantidadViajes();
    res.json({ total: cantidad });
})

// Para obtener todos los viajes
endpointsViaje.get("/tres", async (req, res) => {
    const viajes = await obtenerTresViajes();
    res.json(viajes);
}) 

// Para obtener todos los viajes
endpointsViaje.get("/", async (req, res) => {
    const viajes = await obtenerTodosViajes();
    res.json(viajes);
})

// Para obtener un solo viaje
endpointsViaje.get("/:id", async (req, res) => {
    let id = req.params.id;
    const viaje = await obtenerUnViaje(id);
    res.json(viaje);
})

// Para agregar un viaje
endpointsViaje.post("/", async (req, res) => {
    try {
        const id_nave = req.body.naves;
        const nave = await obtenerUnaNave(id_nave);
        if (!nave || nave.estado.toLowerCase() !== "operativa") {
            return res.status(400).json({
                message: "Operación rechazada. La nave no está operando en este momento"
            });
        }

        const plataforma_origen = await obtenerUnaPlataforma(req.body.plataforma_origen);
        const plataforma_destino = await obtenerUnaPlataforma(req.body.plataforma_destino);
        if (!plataforma_origen || !["operativa", "activa"].includes(plataforma_origen.estado_plataforma.toLowerCase())) {
            return res.status(400).json({
                message: "Operación rechazada. La plataforma de origen no está operando en este momento"
            });
        }

        if (!plataforma_destino || !["operativa", "activa"].includes(plataforma_destino.estado_plataforma.toLowerCase())) {
            return res.status(400).json({
                message: "Operación rechazada. La plataforma de destino no está operando en este momento"
            });
        }

        // Regla: Una plataforma solo podrá admitir vuelos siempre y cuando no supere su capacidad máxima de naves
        const navesEnOrigen = await obtenerCantidadViajesPorPlataforma(req.body.plataforma_origen);
        if (navesEnOrigen >= plataforma_origen.capacidad_max_naves) {
            return res.status(400).json({
                message: "Operación rechazada. La plataforma de origen ha alcanzado su capacidad máxima de naves"
            });
        }

        const navesEnDestino = await obtenerCantidadViajesPorPlataforma(req.body.plataforma_destino);
        if (navesEnDestino >= plataforma_destino.capacidad_max_naves) {
            return res.status(400).json({
                message: "Operación rechazada. La plataforma de destino ha alcanzado su capacidad máxima de naves"
            });
        }

        // Regla: Una nave no puede tener dos vuelos en el mismo horario
        const tieneVueloMismoHorario = await existeViajeNaveEnHorario(req.body.naves, req.body.fecha, req.body.horario);
        if (tieneVueloMismoHorario) {
            return res.status(400).json({
                message: "Operación rechazada. La nave ya tiene asignado un vuelo en la misma fecha y horario"
            });
        }

        await agregarViaje(
            req.body.fecha,
            req.body.horario,
            req.body.duracion,
            req.body.estado,
            req.body.plataforma_origen,
            req.body.plataforma_destino,
            req.body.naves
        );
        res.status(201).json({ message: "Viaje agregado." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error del servidor" })
    }
})

// Para actualizar un viaje
endpointsViaje.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const id_nave = req.body.naves;
        const nave = await obtenerUnaNave(id_nave);
        if (!nave || nave.estado.toLowerCase() !== "operativa") {
            return res.status(400).json({
                message: "Operación rechazada. La nave no está operando en este momento"
            });
        }

        const plataforma_origen = await obtenerUnaPlataforma(req.body.plataforma_origen);
        const plataforma_destino = await obtenerUnaPlataforma(req.body.plataforma_destino);
        if (!plataforma_origen || !["operativa", "activa"].includes(plataforma_origen.estado_plataforma.toLowerCase())) {
            return res.status(400).json({
                message: "Operación rechazada. La plataforma de origen no está operando en este momento"
            });
        }

        if (!plataforma_destino || !["operativa", "activa"].includes(plataforma_destino.estado_plataforma.toLowerCase())) {
            return res.status(400).json({
                message: "Operación rechazada. La plataforma de destino no está operando en este momento"
            });
        }

        // Regla: Una plataforma solo podrá admitir vuelos siempre y cuando no supere su capacidad máxima de naves (excluyendo el viaje actual)
        const navesEnOrigen = await obtenerCantidadViajesPorPlataforma(req.body.plataforma_origen, id);
        if (navesEnOrigen >= plataforma_origen.capacidad_max_naves) {
            return res.status(400).json({
                message: "Operación rechazada. La plataforma de origen ha alcanzado su capacidad máxima de naves"
            });
        }

        const navesEnDestino = await obtenerCantidadViajesPorPlataforma(req.body.plataforma_destino, id);
        if (navesEnDestino >= plataforma_destino.capacidad_max_naves) {
            return res.status(400).json({
                message: "Operación rechazada. La plataforma de destino ha alcanzado su capacidad máxima de naves"
            });
        }

        // Regla: Una nave no puede tener dos vuelos en el mismo horario (excluyendo el viaje actual)
        const tieneVueloMismoHorario = await existeViajeNaveEnHorario(req.body.naves, req.body.fecha, req.body.horario, id);
        if (tieneVueloMismoHorario) {
            return res.status(400).json({
                message: "Operación rechazada. La nave ya tiene asignado un vuelo en la misma fecha y horario"
            });
        }

        const exito = await actualizarViaje(
            id,
            req.body.fecha,
            req.body.horario,
            req.body.duracion,
            req.body.estado,
            req.body.plataforma_origen,
            req.body.plataforma_destino,
            req.body.naves
        );
        if (exito) {
            res.status(200).json({ message: "Viaje actualizado correctamente." });
        } else {
            res.status(404).json({ message: "No se encontro el viaje para actualizar." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error del servidor" });
    }
})

// Para eliminar un viaje
endpointsViaje.delete("/", async (req, res) => {
    const viaje = await eliminarViaje(
        req.body.id
    );
    res.status(200).json({ message: "Viaje eliminado." });
})


