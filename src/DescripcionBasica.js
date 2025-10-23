// Obtener elementos del DOM
const botonSubir = document.getElementById('subirDocumentoBtn');
const archivoInput = document.getElementById('documento');

// Función para mostrar el archivo seleccionado
function mostrarArchivoSeleccionado() {
  const archivo = archivoInput.files[0];
  document.getElementById('archivoSeleccionado').innerText = archivo ? `Archivo seleccionado: ${archivo.name}` : 'No hay archivo seleccionado';
}

// Evento para abrir el selector de archivos
botonSubir.addEventListener('click', () => {
  archivoInput.click();
});

// Evento para manejar la selección de archivo
archivoInput.addEventListener('change', mostrarArchivoSeleccionado);
