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
      body: JSON.stringify({ "mascotaId": mascotaId, "adoptanteNombre": adoptanteNombre })
    });

    if (!res.ok) {
      // tratar de extraer el mensaje de error devuelto por el servidor
      let message = 'Error al crear solicitud de adopción';
      try {
        const body = await res.json();
        if (body && body.message) message = body.message;
      } catch (e) {
        try {
          const text = await res.text();
          if (text) message = text;
        } catch (e2) {
          // ignore
        }
      }
      throw new Error(message);
    }

    const json = await res.json();
    return mapJsonToSolicitudAdopcion(json);
  }

  async obtenerTodasSolicitudes() {
    const res = await fetch(`${API_URL}/api/solicitudes`);

    if (!res.ok) {
      let message = 'Error al obtener solicitudes de adopción';
      try {
        const body = await res.json();
        if (body && body.message) message = body.message;
      } catch (e) {
        try {
          const text = await res.text();
          if (text) message = text;
        } catch (e2) {
          // ignore
        }
      }
      throw new Error(message);
    }

    const jsonArray = await res.json(); // es un array como el de Postman
    return jsonArray.map(mapJsonToSolicitudAdopcion);
  }
}
export default SolicitudAdopcionRepository;