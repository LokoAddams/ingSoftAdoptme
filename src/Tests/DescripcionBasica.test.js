import { MarcarEstado } from '../services/MarcarEstado.js';

describe('Pruebas para la función MarcarEstado', () => {
    it('Debería ser Marcar a la mascota como disponible', () => {
        expect(MarcarEstado("disponible")).toBe('La mascota ha sido marcada como disponible para adopción.');
    });
     it('Debería ser Marcar a la mascota como en proceso de Adopcion', () => {
        expect(MarcarEstado("en proceso")).toBe('La mascota ha sido marcada como en proceso para adopción.');
    }); it('Debería ser Marcar a la mascota como adoptada', () => {
        expect(MarcarEstado("adoptado")).toBe('La mascota ha sido marcada como adoptado.');
    });
});