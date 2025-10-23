const botonSubir = document.getElementById('subirDocumentoBtn');
const archivoInput = document.getElementById('documento');
const archivoSeleccionadoDiv = document.getElementById('archivoSeleccionado');

const botonRegistrar = document.getElementById('registrarBtn');
let registroMensajeDiv = document.getElementById('registroMensaje');

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

const _initResult = initPresenter();

export { mostrarArchivoSeleccionado, mostrarMensajeRegistro, initPresenter };
