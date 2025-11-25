import express from "express";
import { dbReady } from "../BD/conexionDB.js";
import MascotaRouter from "./api/mascota.api.js";

const app = express();

app.use(express.json());

app.use('/uploads', express.static('backend/uploads'));

// Middleware CORS simple - permite llamadas desde el frontend de desarrollo
app.use((req, res, next) => {
	// Cambia el origen según necesites; para desarrollo se permite el origen del dev server
	res.header('Access-Control-Allow-Origin', 'http://localhost:1234');
	res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	// responder preflight
	if (req.method === 'OPTIONS') {
		return res.sendStatus(204);
	}
	next();
});

app.use("/api/mascotas", MascotaRouter);

await dbReady; // 👈 Esperamos BD antes de levantar server

app.listen(3001, () => console.log("🔥 Backend en http://localhost:3001"));
