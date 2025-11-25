import Mascota from "../domain/Mascota.js";

const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3001"                    // desarrollo
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

  async obtenerTodas() {
    const res = await fetch(`${API_URL}/api/mascotas`);
    if (!res.ok) {
      throw new Error("Error al obtener mascotas");
    }
    const data = await res.json(); // array JSON
    return data.map(mapJsonToMascota); // array de Mascota
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

  /*async actualizarEstado(id, nuevoEstado) {
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
  }*/
}
