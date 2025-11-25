import { JSDOM } from 'jsdom';
import { MarcarEstado } from '../services/MarcarEstado.js';

describe('MarcarEstado', () => {
  let result;

  beforeEach(() => {
    const dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <body>
          <input type="radio" name="estado" value="disponible">
          <input type="radio" name="estado" value="adoptado">
          <div id="resultEstadoMarc"></div>
        </body>
      </html>
    `);

    global.document = dom.window.document;
    result = document.getElementById('resultEstadoMarc');
  });

  it('debería marcar el estado como "disponible"', () => {
    const radio = document.querySelector('input[value="disponible"]');
    radio.checked = true;
    const event = new dom.window.Event('change');
    radio.dispatchEvent(event);

    const seleccionado = document.querySelector('input[name="estado"]:checked');
    result.textContent = MarcarEstado(seleccionado.value);
    expect(result.textContent).toBe('La mascota ha sido marcada como disponible para adopción.');
  });

  it('debería marcar el estado como "adoptado"', () => {
    const radio = document.querySelector('input[value="adoptado"]');
    radio.checked = true;
    const event = new dom.window.Event('change');
    radio.dispatchEvent(event);

    const seleccionado = document.querySelector('input[name="estado"]:checked');
    result.textContent = MarcarEstado(seleccionado.value);
    expect(result.textContent).toBe('La mascota ha sido marcada como adoptado.');
  });
});
