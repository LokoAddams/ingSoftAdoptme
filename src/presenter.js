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
