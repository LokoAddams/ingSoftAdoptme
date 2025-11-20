
import SolicitudAdopcion from '../domain/SolicitudAdopcion.js';
import Adoptante from '../domain/Adoptante.js'; 
import Mascota from '../domain/Mascota.js';
import SolicitudAdopcionService from '../services/SolicitudAdopcionService.js';

describe('SolicitudAdopcion - EnviarSolicitud', () => {
	let solicitudAdopcionService;

	beforeEach(() => {
		solicitudAdopcionService = new SolicitudAdopcionService();
	});

	test('EnviarSolicitud debe fallar cuando no hay conexión a internet', async () => {
		const adoptante = new Adoptante({
			nombre: 'Juan Pérez',
			cuestionario: {
				responsabilidad: 'Porque quiero compañía y cuidar de un animal',
				ambiente: 'grande',
				Problemas_de_salud: 'No',
				ninos: 'Si',
				otras_mascotas: 'No',
				economia: 500,
			},
			contacto: {
				email: 'juan.perez@example.com',
				telefono: '555-1234'
			}
		});

		const mascota = new Mascota({
			nombre: 'Luna',
			especie: 'Perro',
			raza: 'Labrador',
			sexo: 'Hembra',
			edad: 2,
			estado: 'disponible'
		});

		// Simular fallo de red para la comprobación de conectividad
		const fetchMock = jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Network Error'));

		await expect(solicitudAdopcionService.createSolicitud(adoptante, mascota)).rejects.toThrow('No se puede crear una solicitud de adopción sin conexión a internet');

		fetchMock.mockRestore();
	});

	test('EnviarSolicitud debe construir una solicitud con adoptante, mascota, fecha y estado', async () => {
		const adoptante = new Adoptante({
			nombre: 'Juan Pérez',
			cuestionario: {
				responsabilidad: 'Porque quiero compañía y cuidar de un animal',
				ambiente: 'grande',
				Problemas_de_salud: 'No',
					ninos: 'Si',
				otras_mascotas: 'No',
				economia: 500,
			},
			contacto: {
				email: 'juan.perez@example.com',
				telefono: '555-1234'
			}
		});

		const mascota = new Mascota({
			nombre: 'Luna',
			especie: 'Perro',
			raza: 'Labrador',
			sexo: 'Hembra',
			edad: 2,
			estado: 'disponible'
		});

		const resultado = await solicitudAdopcionService.createSolicitud(adoptante, mascota);

		expect(resultado).toBeDefined();

		expect(resultado).toMatchObject({
			adoptante: adoptante,
			mascota: mascota,
			estado: expect.any(String),
			fechaSolicitud: expect.any(String)
		});

		expect(resultado.estado).toBe('pendiente');
	});

	
});

describe('SolicitudAdopcion - EnviarSolicitud', () => {
	test('EnviarSolicitud NO debe construir una solicitud porque la mascota no está disponible', () => {
		const adoptante = new Adoptante({
			nombre: 'Juan Pérez',
			cuestionario: {
				responsabilidad: 'Porque quiero compañía y cuidar de un animal',
				ambiente: 'grande',
				Problemas_de_salud: 'No',
					ninos: 'Si',
				otras_mascotas: 'No',
				economia: 500,
			},
			contacto: {
				email: 'juan.perez@example.com',
				telefono: '555-1234'
			}
		});

		const mascota = new Mascota({
			nombre: 'Luna',
			especie: 'Perro',
			raza: 'Labrador',
			sexo: 'Hembra',
			edad: 2,
			estado: 'en proceso'
		});

		expect(() => new SolicitudAdopcion(adoptante, mascota)).toThrowError('La mascota no está disponible para adopción');
	});
});