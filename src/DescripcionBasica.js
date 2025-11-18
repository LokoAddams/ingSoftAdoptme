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
function validarFormulario() {
  const nombreMascota = document.getElementById('nombreMascota').value;
  const edadMascota = document.getElementById('edadMascota').value;
  const tipoMascota = document.getElementById('tipoMascota').value;
  const razaMascota = document.getElementById('razaMascota').value;
  const descripcionMascota = document.getElementById('descripcionMascota').value; 
  if (!nombreMascota || !edadMascota || !tipoMascota || !razaMascota || !descripcionMascota) {
    alert('Por favor, complete todos los campos del formulario.');
    return false;
  }
}
function registrarMascota() {
  const registrarbton = document.getElementById('registrarBtn');
  registrarbton.addEventListener('click', () => {

  alert('Mascota registrada con éxito.');
  });
}
