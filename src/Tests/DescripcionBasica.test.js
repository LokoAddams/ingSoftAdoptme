import { MarcarEstado } from '../services/MarcarEstado.js';

describe('Pruebas para la función MarcarEstado', () => {
    it('Debería ser Marcar a la mascota como disponible', () => {
        expect(MarcarEstado("disponible")).toBe('La mascota ha sido marcada como disponible para adopción.');
    });
    it('Debería ser Marcar a la mascota como en proceso de Adopcion', () => {
        expect(MarcarEstado("en proceso")).toBe('La mascota ha sido marcada como en proceso para adopción.');
    });
    it('Debería ser Marcar a la mascota como adoptada', () => {
        expect(MarcarEstado("adoptado")).toBe('La mascota ha sido marcada como adoptado.');
    });
    it('Debería retornar mensaje con estado personalizado', () => {
        expect(MarcarEstado("en cuarentena")).toBe('La mascota ha sido marcada como en cuarentena para adopción.');
    });
    it('Debería retornar mensaje correcto con estados diferentes a adoptado', () => {
        expect(MarcarEstado("recuperándose")).toBe('La mascota ha sido marcada como recuperándose para adopción.');
    });
    it('Debería diferenciar entre estados adoptado y otros', () => {
        const estadoAdoptado = MarcarEstado("adoptado");
        const estadoDisponible = MarcarEstado("disponible");
        expect(estadoAdoptado).not.toBe(estadoDisponible);
    });
    it('Debería incluir el estado en el mensaje para estados no adoptado', () => {
        const mensaje = MarcarEstado("temporal");
        expect(mensaje).toContain("temporal");
    });
    it('Debería siempre incluir la palabra adopción en el mensaje', () => {
        expect(MarcarEstado("disponible")).toContain("adopción");
        expect(MarcarEstado("en proceso")).toContain("adopción");
    });
});