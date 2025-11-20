import express from "express";
import { dbReady } from "../BD/conexionDB.js";
import MascotaRouter from "./api/mascota.api.js";

const app = express();

app.use(express.json());

app.use("/api/mascotas", MascotaRouter);

await dbReady; // 👈 Esperamos BD antes de levantar server

app.listen(3001, () => console.log("🔥 Backend en http://localhost:3001"));
