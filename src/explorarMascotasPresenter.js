// src/index.js
import { MascotaService } from "./services/MascotaService.js";
import { renderMascotas } from "./services/MascotaUIService.js";
import MascotaRepository from "./infraestructure/MascotaRepository.js";
import ValidarConexion from "./infraestructure/ValidarConexion.js";

document.addEventListener("DOMContentLoaded", async () => {
  const div = document.querySelector("#resultado-div");
  if (!div) return;

  div.innerHTML = "";
  const mascotaRepository = new MascotaRepository();
  const validarConexion = new ValidarConexion();
  const mascotaService = new MascotaService(mascotaRepository, validarConexion);

  try {
    const mascotas = await mascotaService.listarMascotas();
    renderMascotas(div, mascotas);
  } catch (error) {
    console.error("Error al obtener mascotas desde API:", error);
    div.innerHTML =
      "<p>Error al cargar mascotas. Intenta nuevamente más tarde.</p>";
  }
});
