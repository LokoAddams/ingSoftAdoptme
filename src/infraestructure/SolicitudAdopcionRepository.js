import SolicitudAdopcion from '../domain/SolicitudAdopcion.js';
import Adoptante from '../domain/Adoptante.js';
import Mascota from '../domain/Mascota.js';
const _hostname =
  typeof window !== "undefined" && window.location && window.location.hostname
    ? window.location.hostname
    : "localhost";
const API_URL =
  _hostname === "localhost"
    ? "http://localhost:3001" // desarrollo
    : "https://ingsoftadoptme.onrender.com"; // producción


function mapJsonToSolicitudAdopcion(json = {}) {
  const adoptanteNombre = json.adoptanteNombre || (json.adoptante && json.adoptante.nombre) || '';
  const mascotaId = json.mascotaId || (json.mascota && (json.mascota.id || json.mascota._id)) || null;

  const adoptante = new Adoptante({ nombre: adoptanteNombre });
  const mascota = new Mascota({ id: mascotaId });

  const fecha = json.fechaSolicitud || json.createdAt || json.fecha || null;

  return new SolicitudAdopcion(adoptante, mascota, fecha);
}
class SolicitudAdopcionRepository {
  constructor() {
  }

  async create(mascotaId, adoptanteNombre) {
    const res = await fetch(`${API_URL}/api/solicitudes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mascotaId: mascotaId, adoptanteNombre: adoptanteNombre })
      
    });

    if (!res.ok) {
      throw new Error("Error al crear solicitud de adopción");
    }

    const json = await res.json();
    return mapJsonToSolicitudAdopcion(json);
  }
}
export default SolicitudAdopcionRepository;