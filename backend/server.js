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
	"https://ingsoftadoptme.onrender.com",
	"https://6925b3c9d2dbbd000825d4e9--adoptmebombastic.netlify.app/"
];

// Middleware CORS simple - permite llamadas desde el frontend de desarrollo
app.use((req, res, next) => {
	// Normalizar origen removiendo una barra final si existe
	const rawOrigin = req.headers.origin || '';
	const origin = rawOrigin.replace(/\/$/, '');

	// Normalizar lista una sola vez
	const normalizedAllowed = allowedOrigins.map(o => o.replace(/\/$/, ''));

	if (origin && normalizedAllowed.includes(origin)) {
		res.header('Access-Control-Allow-Origin', origin);
		res.header('Vary', 'Origin');
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
