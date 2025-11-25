import Mascota from "../domain/Mascota.js";

const _hostname =
  typeof window !== "undefined" && window.location && window.location.hostname
    ? window.location.hostname
    : "localhost";

const API_URL =
  _hostname === "localhost"
    ? "http://localhost:3001" // desarrollo
    : "https://ingsoftadoptme.onrender.com"; // producción


function mapJsonToMascota(json) {
  return new Mascota({
    id: json.id ?? json._id,   
    nombre: json.nombre,
    especie: json.especie,
    raza: json.raza,
    sexo: json.sexo,
    edad: json.edad,
    estado: json.estado,
    img_ref: json.img_ref,
    facilitador: json.facilitador,
  });
}

export class MascotaRepository {

  async obtenerMascotas(hayConexion = true) {
    if(hayConexion) {
      const res = await fetch(`${API_URL}/api/mascotas`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const mascotas = await res.json();
        if (!Array.isArray(mascotas) || mascotas.length === 0) {
            throw new Error("No hay mascotas disponibles.");
        }
        return mascotas;
    } else {
        throw new Error("Revise su conexión a internet.");
    }
  }

  async obtenerDetalleMascota(hayConexion = false, idMascota = null) {
    if (hayConexion) {
        if (idMascota) {
            try {
          const res = await fetch(`${API_URL}/api/mascotas/${encodeURIComponent(idMascota)}`);
                if (res.ok) {
                    return await res.json();
                } else {
                    throw new Error(`HTTP ${res.status}`);
                }
            } catch (err) {
                throw err; // <-- re-lanzar el error para que el llamador/tests lo reciban
            }
        } else {
            throw new Error('id de mascota no proporcionado.');
        }
    } else {
        throw new Error("Revise su conexión a internet.");
    }
}


  async obtenerPorId(id) {
    const res = await fetch(`${API_URL}/api/mascotas/${id}`);
    if (!res.ok) {
      if (res.status === 404) {
            throw new Error("No Se encontró la mascota");
      }
      throw new Error("Error al obtener mascota por ID");
    }
    const json = await res.json();
    return mapJsonToMascota(json);
  }

  async crearMascota(mascotaData) {
    const res = await fetch(`${API_URL}/api/mascotas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mascotaData),
    });

    if (!res.ok) {
      throw new Error("Error al crear mascota");
    }

    const json = await res.json();
    return mapJsonToMascota(json);
  }

  async actualizarEstado(id, nuevoEstado) {
    const res = await fetch(`${API_URL}/api/mascotas/${id}/estado`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado: nuevoEstado }),
    });

    if (!res.ok) {
      if (res.status === 404) {
        throw new Error("Mascota no encontrada");
      }
      throw new Error("Error al actualizar estado de mascota");
    }

    const json = await res.json();
    return mapJsonToMascota(json);
  }
}
