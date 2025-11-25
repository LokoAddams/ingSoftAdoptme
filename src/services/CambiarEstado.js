import { MarcarEstado } from './MarcarEstado.js';

export function inicializarEstadoMascota(radiosSelector, resultSelector) {
  const radios = document.querySelectorAll(radiosSelector);
  const result = document.querySelector(resultSelector);
  if (!radios.length || !result) return;
  function actualizarEstado() {
    const seleccionado = document.querySelector(`${radiosSelector}:checked`);
    if (!seleccionado) {
      result.style.display = 'none';
      return;
    }
    result.style.display = 'block';
    result.textContent = MarcarEstado(seleccionado.value);
  }
  radios.forEach(radio => radio.addEventListener('change', actualizarEstado));
}
