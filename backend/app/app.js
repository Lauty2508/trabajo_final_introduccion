import express from "express";

import { endpointsNave } from './api/nave.js';
import { endpointsPersona } from './api/pasajero.js';
import { endpointsPlataforma } from './api/plataforma.js';
import { endpointsReserva } from './api/reserva.js';
import { endpointsViaje } from './api/viaje.js';


const app = express();
const port = 3000;

// Para que Express sepa leer el cuerpo de la petición
app.use(express.json())

// Para que el Router de Express permita acortar las URLs
app.use('/api/v1/nave', endpointsNave);
app.use('/api/v1/pasajero', endpointsPasajero);
app.use('/api/v1/plataforma', endpointsPlataforma);
app.use('/api/v1/reserva', endpointsReserva);
app.use('/api/v1/viaje', endpointsViaje);

app.get("/", (req, res) => {
    res.send(`Hola!`);
})
app.listen(port, () => {
    console.log(`App escuchando en el puerto: ${port}`);
})
