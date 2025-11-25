/**
 * @jest-environment jsdom
 */
import { validarFormulario } from '../services/ValidarFormRegistro.js';
import Mascota from '../domain/Mascota.js';

describe('Pruebas para registro de mascota - DescripcionBasica.js', () => {
    
    beforeEach(() => {
        document.body.innerHTML = `
            <button id="subirDocumentoBtn">Seleccionar fotos</button>
            <input type="file" id="documento" name="imagen" style="display: none;" />
            <div id="archivoSeleccionado"></div>
            <input type="text" id="nombre" />
            <input type="text" id="especie" />
            <input type="text" id="edad" />
            <select id="Raza"><option value="">Selecciona</option><option value="Labrador">Labrador</option></select>
            <select id="Sexo"><option value="">Selecciona</option><option value="Macho">Macho</option><option value="Hembra">Hembra</option></select>
            <button id="registrarBtn">Registrar</button>
            <div id="MarcarEstado" style="display: none;"></div>
            <div id="resultEstadoMarc"></div>
        `;
    });

    it('Debería tener el botón de subir documento', () => {
        const boton = document.getElementById('subirDocumentoBtn');
        expect(boton).toBeTruthy();
        expect(boton.textContent).toBe('Seleccionar fotos');
    });

    it('Debería tener el input de documento oculto', () => {
        const input = document.getElementById('documento');
        expect(input).toBeTruthy();
        expect(input.style.display).toBe('none');
        expect(input.type).toBe('file');
    });

    it('Debería tener el botón registrar', () => {
        const boton = document.getElementById('registrarBtn');
        expect(boton).toBeTruthy();
        expect(boton.textContent).toBe('Registrar');
    });

    it('Debería validar que el formulario tenga todos los campos', () => {
        const nombre = document.getElementById('nombre');
        const especie = document.getElementById('especie');
        const edad = document.getElementById('edad');
        const raza = document.getElementById('Raza');
        const sexo = document.getElementById('Sexo');
        
        expect(nombre).toBeTruthy();
        expect(especie).toBeTruthy();
        expect(edad).toBeTruthy();
        expect(raza).toBeTruthy();
        expect(sexo).toBeTruthy();
    });

    it('Debería crear una mascota válida con datos correctos', () => {
        document.getElementById('nombre').value = 'Max';
        document.getElementById('especie').value = 'Perro';
        document.getElementById('edad').value = '5';
        document.getElementById('Raza').value = 'Labrador';
        document.getElementById('Sexo').value = 'Macho';

        const mascota = validarFormulario();
        
        expect(mascota).toBeInstanceOf(Mascota);
        expect(mascota.nombre).toBe('Max');
        expect(mascota.especie).toBe('Perro');
        expect(mascota.edad).toBe(5);
        expect(mascota.raza).toBe('Labrador');
        expect(mascota.sexo).toBe('Macho');
    });

    it('Debería rechazar registro sin nombre', () => {
        document.getElementById('nombre').value = '';
        document.getElementById('especie').value = 'Perro';
        document.getElementById('edad').value = '5';
        document.getElementById('Raza').value = 'Labrador';
        document.getElementById('Sexo').value = 'Macho';

        const mascota = validarFormulario();
        expect(mascota).toBeNull();
    });

    it('Debería rechazar registro sin especie', () => {
        document.getElementById('nombre').value = 'Max';
        document.getElementById('especie').value = '';
        document.getElementById('edad').value = '5';
        document.getElementById('Raza').value = 'Labrador';
        document.getElementById('Sexo').value = 'Macho';

        const mascota = validarFormulario();
        expect(mascota).toBeNull();
    });

    it('Debería rechazar registro sin edad', () => {
        document.getElementById('nombre').value = 'Max';
        document.getElementById('especie').value = 'Perro';
        document.getElementById('edad').value = '';
        document.getElementById('Raza').value = 'Labrador';
        document.getElementById('Sexo').value = 'Macho';

        const mascota = validarFormulario();
        expect(mascota).toBeNull();
    });

    it('Debería rechazar registro sin raza', () => {
        document.getElementById('nombre').value = 'Max';
        document.getElementById('especie').value = 'Perro';
        document.getElementById('edad').value = '5';
        document.getElementById('Raza').value = '';
        document.getElementById('Sexo').value = 'Macho';

        const mascota = validarFormulario();
        expect(mascota).toBeNull();
    });

    it('Debería rechazar registro sin sexo', () => {
        document.getElementById('nombre').value = 'Max';
        document.getElementById('especie').value = 'Perro';
        document.getElementById('edad').value = '5';
        document.getElementById('Raza').value = 'Labrador';
        document.getElementById('Sexo').value = '';

        const mascota = validarFormulario();
        expect(mascota).toBeNull();
    });

    it('Debería permitir diferentes razas', () => {
        document.getElementById('nombre').value = 'Luna';
        document.getElementById('especie').value = 'Perro';
        document.getElementById('edad').value = '3';
        document.getElementById('Raza').value = 'Labrador';
        document.getElementById('Sexo').value = 'Hembra';

        const mascota = validarFormulario();
        expect(mascota.raza).toBe('Labrador');
    });

    it('Debería permitir diferentes sexos', () => {
        document.getElementById('nombre').value = 'Luna';
        document.getElementById('especie').value = 'Perro';
        document.getElementById('edad').value = '3';
        document.getElementById('Raza').value = 'Labrador';
        document.getElementById('Sexo').value = 'Hembra';

        const mascota = validarFormulario();
        expect(mascota.sexo).toBe('Hembra');
    });

    it('Debería convertir la edad a número', () => {
        document.getElementById('nombre').value = 'Buddy';
        document.getElementById('especie').value = 'Perro';
        document.getElementById('edad').value = '7';
        document.getElementById('Raza').value = 'Labrador';
        document.getElementById('Sexo').value = 'Macho';

        const mascota = validarFormulario();
        expect(typeof mascota.edad).toBe('number');
        expect(mascota.edad).toBe(7);
    });

    it('Debería trimear espacios en blanco del nombre', () => {
        document.getElementById('nombre').value = '  Max  ';
        document.getElementById('especie').value = 'Perro';
        document.getElementById('edad').value = '5';
        document.getElementById('Raza').value = 'Labrador';
        document.getElementById('Sexo').value = 'Macho';

        const mascota = validarFormulario();
        expect(mascota.nombre).toBe('Max');
    });

    it('Debería crear mascota con estado disponible por defecto', () => {
        document.getElementById('nombre').value = 'Rex';
        document.getElementById('especie').value = 'Perro';
        document.getElementById('edad').value = '2';
        document.getElementById('Raza').value = 'Labrador';
        document.getElementById('Sexo').value = 'Macho';

        const mascota = validarFormulario();
        expect(mascota.estado).toBe('disponible');
    });

    it('Debería tener la sección de estado oculta inicialmente', () => {
        const estadoDiv = document.getElementById('MarcarEstado');
        expect(estadoDiv.style.display).toBe('none');
    });

    it('Debería registrar mascota con todos los datos correctos', () => {
        document.getElementById('nombre').value = 'Mimi';
        document.getElementById('especie').value = 'Gato';
        document.getElementById('edad').value = '4';
        document.getElementById('Raza').value = 'Labrador';
        document.getElementById('Sexo').value = 'Hembra';

        const mascota = validarFormulario();
        
        expect(mascota.nombre).toBe('Mimi');
        expect(mascota.especie).toBe('Gato');
        expect(mascota.edad).toBe(4);
        expect(mascota.raza).toBe('Labrador');
        expect(mascota.sexo).toBe('Hembra');
        expect(mascota.estado).toBe('disponible');
    });

    it('Debería rechazar mascota si solo hay espacios en nombre', () => {
        document.getElementById('nombre').value = '    ';
        document.getElementById('especie').value = 'Perro';
        document.getElementById('edad').value = '5';
        document.getElementById('Raza').value = 'Labrador';
        document.getElementById('Sexo').value = 'Macho';

        const mascota = validarFormulario();
        expect(mascota).toBeNull();
    });

    it('Debería convertir edad no numérica a 0', () => {
        document.getElementById('nombre').value = 'Toby';
        document.getElementById('especie').value = 'Perro';
        document.getElementById('edad').value = 'abc';
        document.getElementById('Raza').value = 'Labrador';
        document.getElementById('Sexo').value = 'Macho';

        const mascota = validarFormulario();
        expect(mascota.edad).toBe(0);
    });
});