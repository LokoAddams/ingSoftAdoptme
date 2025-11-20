import express from "express";
import { dbReady } from "../BD/conexionDB.js";

const app = express();

// Middleware para JSON
app.use(express.json());


// Iniciamos backend
app.listen(3001, () => console.log("Backend corriendo en http://localhost:3001"));
