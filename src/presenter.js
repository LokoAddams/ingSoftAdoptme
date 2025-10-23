const botonSubir = document.getElementById('subirDocumentoBtn');
const archivoInput = document.getElementById('documento');
const archivoSeleccionadoDiv = document.getElementById('archivoSeleccionado');

function mostrarArchivoSeleccionado() {
  if (!archivoSeleccionadoDiv) return;

  const archivo = archivoInput && archivoInput.files && archivoInput.files[0];
  archivoSeleccionadoDiv.innerText = archivo ? `Archivo seleccionado: ${archivo.name}` : 'No hay archivo seleccionado';
}
