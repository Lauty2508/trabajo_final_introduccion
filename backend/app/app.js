const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
app.use(cors());
const { Pool } = require("pg");
const db = new Pool({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "123",
    port: 5432,
});
app.get("/nave", async (req, res) => {
    try {
        const query = "SELECT * FROM NAVE;";
        const resultado = await db.query(query);
        res.json(resultado.rows);
    } catch (error) {
        console.error("Hubo un error:", error);
        res.status(500).send("Error en la base de datos");
    }
});

app.get("/pasajeros", async (req, res) => {
    try {
        const query = "SELECT * FROM PASAJEROS;";
        const resultado = await db.query(query);
        res.json(resultado.rows);
    } catch (error) {
        console.error("Hubo un error:", error);
        res.status(500).send("Error en la base de datos");
    }
});

app.get("/plataforma", async (req, res) => {
    try {
        const query = "SELECT * FROM PLATAFORMA;";
        const resultado = await db.query(query);
        res.json(resultado.rows);
    } catch (error) {
        console.error("Hubo un error:", error);
        res.status(500).send("Error en la base de datos");
    }
});

app.get("/viaje", async (req, res) => {
    try {
        const query = "SELECT * FROM VIAJE;";
        const resultado = await db.query(query);
        res.json(resultado.rows);
    } catch (error) {
        console.error("Hubo un error:", error);
        res.status(500).send("Error en la base de datos");
    }
});

app.get("/reserva", async (req, res) => {
    try {
        const query = "SELECT * FROM RESERVA;";
        const resultado = await db.query(query);
        res.json(resultado.rows);
    } catch (error) {
        console.error("Hubo un error:", error);
        res.status(500).send("Error en la base de datos");
    }
});

app.listen(port, () => {
    console.log(`App de ejemplo escuchando en el puerto: ${port}`);
});
