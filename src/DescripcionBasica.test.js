import { MarcarEstado } from "./MarcarEstado";

describe('Pruebas para la función MarcarEstado', () => {
    it('Debería ser Marcar a la mascota como disponible', () => {
        expect(MarcarEstado("disponible")).toBe('La mascota ha sido marcada como disponible para adopción.');
    });
});