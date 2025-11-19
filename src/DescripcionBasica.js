import { MarcarEstado } from './services/MarcarEstado.js';
import { validarFormulario } from './services/ValidarFormRegistro.js';
import { mostrarArchivoSeleccionado } from './services/MostrarArchivoSeleccionado.js';

const botonSubir = document.getElementById('subirDocumentoBtn');
const archivoInput = document.getElementById('documento');
const Estado = document.getElementById('MarcarEstado');
const radios = document.querySelectorAll('input[name="estado"]');
const result = document.getElementById('resultEstadoMarc');


botonSubir.addEventListener('click', () => {
  archivoInput.click();
});

archivoInput.addEventListener('change', mostrarArchivoSeleccionado);

function registrarMascota() {
  const registrarbton = document.getElementById('registrarBtn');
  registrarbton.addEventListener('click', () => {
    if (validarFormulario()) {
      alert('Mascota registrada con éxito.');
      Estado.style.display = 'block';
    }
  });
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

registrarMascota();
