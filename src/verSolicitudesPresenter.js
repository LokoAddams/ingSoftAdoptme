import SolicitudAdopcionService from "./services/SolicitudAdopcionService.js";
import SolicitudAdopcionRepository from "./infraestructure/SolicitudAdopcionRepository.js";
import ValidarConexion from "./infraestructure/ValidarConexion.js";

const repository = new SolicitudAdopcionRepository();
const validarConexion = new ValidarConexion();
const service = new SolicitudAdopcionService(repository, validarConexion);

function formatoSolicitudes(solicitudes) {
  const contSolicitudes = document.querySelector("#cont-solicitudes");
  console.log("cont-solicitudes en formatoSolicitudes =", contSolicitudes);

  if (!contSolicitudes) {
    console.error("No se encontró #cont-solicitudes en el DOM");
    return;
  }

  contSolicitudes.innerHTML = "";

  if (!Array.isArray(solicitudes) || solicitudes.length === 0) {
    contSolicitudes.innerHTML =
      '<p style="text-align:center; color:#555;">No hay solicitudes para mostrar.</p>';
    return;
  }

  solicitudes.forEach((solicitud, idx) => {

    const id = solicitud.id ?? "(sin id)";
    console.log("Procesando solicitud ID =", solicitud.id);
    const nombreAdoptante =
      solicitud.adoptante?.nombre || solicitud.adoptanteNombre || "(sin nombre)";
    const mascotaId =
      solicitud.mascota?.id || solicitud.mascotaId || "(sin mascota)";
    const fecha = solicitud.fechaSolicitud
      ? new Date(solicitud.fechaSolicitud).toLocaleString()
      : "(sin fecha)";
    const estado = solicitud.estado || "(sin estado)";

    const contSolicitud = document.createElement("div");
    contSolicitud.classList.add("cont-solicitud");

    const idP = document.createElement("p");
    idP.classList.add("id-sol");
    idP.innerHTML = `<strong style="color: var(--electric-deep);">ID Solicitud:</strong> ${id}`;

    const adopP = document.createElement("p");
    adopP.classList.add("nom-adop-sol");
    adopP.innerHTML = `<strong style="color: var(--electric-deep);">Nombre adoptante:</strong> ${nombreAdoptante}`;

    const masIdP = document.createElement("p");
    masIdP.classList.add("mas-id-sol");
    masIdP.innerHTML = `<strong style="color: var(--electric-deep);">Mascota ID:</strong> ${mascotaId}`;

    const fechaP = document.createElement("p");
    fechaP.classList.add("fecha-sol");
    fechaP.innerHTML = `<strong style="color: var(--electric-deep);">Fecha:</strong> ${fecha}`;

    const estadoP = document.createElement("p");
    estadoP.classList.add("estado-sol");
    estadoP.innerHTML = `<strong style="color: var(--electric-deep);">Estado:</strong> ${estado}`;

    contSolicitud.appendChild(idP);
    contSolicitud.appendChild(adopP);
    contSolicitud.appendChild(masIdP);
    contSolicitud.appendChild(fechaP);
    contSolicitud.appendChild(estadoP);

    const contBotones = document.createElement("div");
    contBotones.classList.add("cont-botones-estado");
    const btnAceptar = document.createElement("button");
    btnAceptar.textContent = "Aceptar";
    btnAceptar.classList.add("btn-aceptar");
    btnAceptar.addEventListener("click", async () => {
      try {
        await service.actualizarEstadoSolicitud(id, "aprobada");
        alert("Solicitud aprobada correctamente");
        cargarSolicitudes();
      } catch (err) {
        alert(`Error: ${err.message}`);
      }
    });

    const btnRechazar = document.createElement("button");
    btnRechazar.textContent = "Rechazar";
    btnRechazar.classList.add("btn-rechazar");
    btnRechazar.addEventListener("click", async () => {
      try {
        await service.actualizarEstadoSolicitud(id, "rechazada");
        alert("Solicitud rechazada");
        cargarSolicitudes(); 
      } catch (err) {
        alert(`Error: ${err.message}`);
      }
    });

    contBotones.appendChild(btnAceptar);
    contBotones.appendChild(btnRechazar);
    if (estado === "pendiente") {
      contSolicitud.appendChild(contBotones);
    }

    contSolicitudes.appendChild(contSolicitud);
  });
}

async function cargarSolicitudes() {
  try {
    console.log("⏳ Cargando solicitudes...");
    service.validarConexion.validarConexionInternet();
    await service.validarConexion.validarConexionBackend();

    const solicitudes = await service.getTodasLasSolicitudes();
    console.log("Solicitudes obtenidas:", solicitudes);

    formatoSolicitudes(solicitudes);
  } catch (error) {
    alert(`Error al cargar las solicitudes: ${error.message}`);
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", cargarSolicitudes);