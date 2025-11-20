function mostrarArchivoSeleccionado() {
  const archivo = archivoInput.files[0];
  document.getElementById('archivoSeleccionado').innerText = archivo ? `Archivo seleccionado: ${archivo.name}` : 'No hay archivo seleccionado';
}