import Adoptante from './domain/Adoptante.js';
import Mascota from './domain/Mascota.js';
import SolicitudAdopcionService from './services/SolicitudAdopcionService.js';
import SolicitudAdopcionRepository from './infraestructure/SolicitudAdopcionRepository.js';
import { MascotaRepository } from "./infraestructure/MascotaRepository.js";


const botonEnviarSolicitud = document.getElementById('enviarSolicitudBtn');
let registroMensajeDiv = document.getElementById('registroMensaje');
const Estado = document.getElementById('MarcarEstado');

let solicitudAdopcionService = new SolicitudAdopcionService(new SolicitudAdopcionRepository(new Date()));
let mascotaRepository = new MascotaRepository();
// Si venimos con ?id=..., pedimos la mascota al backend y precargamos los campos
(async () => {
  try {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (id) {
      const m = await mascotaRepository.obtenerDetalleMascota(navigator.onLine, id);
      const setVal = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.value = value;
      };
      setVal('mascotaNombre', m.nombre || '');
      setVal('mascotaEspecie', m.especie || '');
      setVal('mascotaRaza', m.raza || '');
      setVal('mascotaSexo', m.sexo || '');
      setVal('mascotaEdad', m.edad || '');
      const estadoEl = document.getElementById('mascotaEstado');
      if (estadoEl && m.estado) {
        const optValue = m.estado.toString().toLowerCase();
        const match = Array.from(estadoEl.options).find(o => o.value.toLowerCase() === optValue || o.value === m.estado);
        if (match) estadoEl.value = match.value;
      }
      
    }
  } catch (err) {
    console.error('Error procesando query string en FormSolicitudAdopcionPresenter', err);
  }
})();

if (botonEnviarSolicitud) {
    botonEnviarSolicitud.addEventListener('click', () => {
      const adoptante = new Adoptante({
        nombre: (document.getElementById('adoptanteNombre') || {}).value || '',
        cuestionario: {
          responsabilidad: (document.getElementById('cuestionarioResponsabilidad') || {}).value || '',
          ambiente: (document.getElementById('cuestionarioAmbiente') || {}).value || '',
          Problemas_de_salud: (document.getElementById('cuestionarioProblemasSalud') || {}).value || '',
          ninos: (document.getElementById('cuestionarioNinos') || {}).value || '',
          otras_mascotas: (document.getElementById('cuestionarioOtrasMascotas') || {}).value || '',
          economia: Number((document.getElementById('cuestionarioEconomia') || {}).value) || 0,
        },
        contacto: {
          email: (document.getElementById('adoptanteEmail') || {}).value || '',
          telefono: (document.getElementById('adoptanteTelefono') || {}).value || '',
        }
      });

      const mascota = new Mascota({
        nombre: (document.getElementById('mascotaNombre') || {}).value || '',
        especie: (document.getElementById('mascotaEspecie') || {}).value || '',
        raza: (document.getElementById('mascotaRaza') || {}).value || '',
        sexo: (document.getElementById('mascotaSexo') || {}).value || '',
        edad: Number((document.getElementById('mascotaEdad') || {}).value) || 0,
        estado: (document.getElementById('mascotaEstado') || {}).value || 'disponible',
      });
      
      Promise.all([
        import('./domain/SolicitudAdopcion.js'),
        import('./domain/Adoptante.js'),
        import('./domain/Mascota.js')
      ]).then(([{ default: SolicitudAdopcion }, { default: Adoptante }, { default: Mascota }]) => {
        (async () => {
          try {
            const adoptanteInstance = new Adoptante(adoptante);
            const mascotaInstance = new Mascota(mascota);
            // usar la factory asíncrona que valida conectividad
            const solicitud = await solicitudAdopcionService.createSolicitud(adoptanteInstance, mascotaInstance);

            window.__ultimaSolicitudAdopcion = solicitud;
            const mensajeDiv = document.getElementById('solicitudMensaje');
            if (mensajeDiv) mensajeDiv.innerText = 'Solicitud enviada correctamente';
          } catch (err) {
            const mensajeDiv = document.getElementById('solicitudMensaje');
            if (mensajeDiv) mensajeDiv.innerText = err && err.message ? err.message : 'Error al crear la solicitud';
            console.error('Error creando SolicitudAdopcion', err);
          }
        })();
      }).catch((err) => {
        const mensajeDiv = document.getElementById('solicitudMensaje');
        if (mensajeDiv) mensajeDiv.innerText = err.message || 'Error al enviar la solicitud';
        console.error('Error creando SolicitudAdopcion', err);
      });
    });
  }