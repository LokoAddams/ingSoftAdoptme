import express from "express";
import { dbReady } from "../BD/conexionDB.js";
import MascotaRouter from "./api/mascota.api.js";
import SolicitudRouter from "./api/solicitud.api.js";

const app = express();

app.use(express.json());

app.use('/uploads', express.static('backend/uploads'));
const allowedOrigins = [
  "http://localhost:1234",
  "http://localhost:3001",
  "https://ingsoftadoptme.onrender.com"
];

// Middleware CORS simple - permite llamadas desde el frontend de desarrollo
app.use((req, res, next) => {
	// Cambia el origen según necesites; para desarrollo se permite el origen del dev server
	const origin = req.headers.origin;

  	if (allowedOrigins.includes(origin)) {
    	res.header("Access-Control-Allow-Origin", origin);
  	}
	res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	// responder preflight
	if (req.method === 'OPTIONS') {
		return res.sendStatus(204);
	}
	next();
});

// Health-check root endpoint: devuelve 200 para que el frontend y tests lo puedan verificar
app.get('/', (req, res) => {
	return res.json({ status: 'ok' });
});

app.use("/api/mascotas", MascotaRouter);
app.use("/api/solicitudes", SolicitudRouter); 

await dbReady; // 👈 Esperamos BD antes de levantar server

app.listen(3001, () => console.log("🔥 Backend en http://localhost:3001"));
