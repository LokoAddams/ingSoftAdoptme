const botonSubir = document.getElementById('subirDocumentoBtn');
const archivoInput = document.getElementById('documento');

function mostrarArchivoSeleccionado() {
  const archivo = archivoInput.files[0];
  document.getElementById('archivoSeleccionado').innerText = archivo ? `Archivo seleccionado: ${archivo.name}` : 'No hay archivo seleccionado';
}

botonSubir.addEventListener('click', () => {
  archivoInput.click();
});

archivoInput.addEventListener('change', mostrarArchivoSeleccionado);
