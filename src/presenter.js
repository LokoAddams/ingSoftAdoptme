import { MarcarEstado } from './MarcarEstado.js';

const botonSubir = document.getElementById('subirDocumentoBtn');
const archivoInput = document.getElementById('documento');
const archivoSeleccionadoDiv = document.getElementById('archivoSeleccionado');

const botonRegistrar = document.getElementById('registrarBtn');
const botonEnviarSolicitud = document.getElementById('enviarSolicitudBtn');
let registroMensajeDiv = document.getElementById('registroMensaje');
const Estado = document.getElementById('MarcarEstado');

const radios = document.querySelectorAll('input[name="estado"]');
const result = document.getElementById('resultEstadoMarc');

function mostrarArchivoSeleccionado() {
  if (!archivoSeleccionadoDiv) return;

  const archivo = archivoInput && archivoInput.files && archivoInput.files[0];
  archivoSeleccionadoDiv.innerText = archivo ? `Archivo seleccionado: ${archivo.name}` : 'No hay archivo seleccionado';
}

function mostrarMensajeRegistro(text) {
  if (!registroMensajeDiv) {
    registroMensajeDiv = document.createElement('div');
    registroMensajeDiv.id = 'registroMensaje';
    if (botonRegistrar) botonRegistrar.insertAdjacentElement('afterend', registroMensajeDiv);
    else document.body.appendChild(registroMensajeDiv);
  }

  registroMensajeDiv.innerText = text || '';
}

function initPresenter() {
  if (botonSubir && archivoInput) {
    botonSubir.addEventListener('click', () => {
      archivoInput.click();
    });
  }

  if (archivoInput && archivoSeleccionadoDiv) {
    archivoInput.addEventListener('change', mostrarArchivoSeleccionado);
  }

  if (botonRegistrar) {
    if (!registroMensajeDiv) {
      registroMensajeDiv = document.createElement('div');
      registroMensajeDiv.id = 'registroMensaje';
      botonRegistrar.insertAdjacentElement('afterend', registroMensajeDiv);
    }

    botonRegistrar.addEventListener('click', () => {
      const campos = ['nombre', 'especie', 'raza', 'sexo', 'edad'];
      const faltan = campos.some((id) => {
        const el = document.getElementById(id);
        return !el || !String(el.value || '').trim();
      });

      if (faltan) {
        mostrarMensajeRegistro('Por favor complete todos los campos antes de registrar');
      } else {
        mostrarMensajeRegistro('se registro correctamente');
        Estado.style.display = 'block';
      }
    });
  }

  if (botonEnviarSolicitud) {
    botonEnviarSolicitud.addEventListener('click', () => {
      const adoptante = {
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
      };

      const mascota = {
        nombre: (document.getElementById('mascotaNombre') || {}).value || '',
        especie: (document.getElementById('mascotaEspecie') || {}).value || '',
        raza: (document.getElementById('mascotaRaza') || {}).value || '',
        sexo: (document.getElementById('mascotaSexo') || {}).value || '',
        edad: Number((document.getElementById('mascotaEdad') || {}).value) || 0,
        estado: (document.getElementById('mascotaEstado') || {}).value || 'disponible',
      };
      
      console.log("hola1");
      Promise.all([
        import('./SolicitudAdopcion.js'),
        import('./Adoptante.js'),
        import('./Mascota.js')
      ]).then(([{ default: SolicitudAdopcion }, { default: Adoptante }, { default: Mascota }]) => {
        const adoptanteInstance = new Adoptante(adoptante);
        const mascotaInstance = new Mascota(mascota);
        const solicitud = new SolicitudAdopcion(adoptanteInstance, mascotaInstance);
        
        window.__ultimaSolicitudAdopcion = solicitud;
        const mensajeDiv = document.getElementById('solicitudMensaje');
        if (mensajeDiv) mensajeDiv.innerText = 'Solicitud enviada correctamente';
      }).catch((err) => {
        const mensajeDiv = document.getElementById('solicitudMensaje');
        if (mensajeDiv) mensajeDiv.innerText = err.message || 'Error al enviar la solicitud';
        console.error('Error creando SolicitudAdopcion', err);
      });
    });
  }

  mostrarArchivoSeleccionado();

  return {
    botonSubirPresent: !!botonSubir,
    archivoInputPresent: !!archivoInput,
    archivoSeleccionadoDivPresent: !!archivoSeleccionadoDiv,
    botonRegistrarPresent: !!botonRegistrar,
    registroMensajeDivPresent: !!registroMensajeDiv,
  };
}


 radios.forEach(radio => {
    radio.addEventListener('change', () => {
      const seleccionado = document.querySelector('input[name="estado"]:checked');

      if (seleccionado) {
        result.style.display = 'block'; 
        result.textContent = `${MarcarEstado(seleccionado.value)}`;
        console.log('Seleccionado:', seleccionado.value);
      } else {
        result.style.display = 'none'; 
      }
    });
  });

const _initResult = initPresenter();

export { mostrarArchivoSeleccionado, mostrarMensajeRegistro, initPresenter };
