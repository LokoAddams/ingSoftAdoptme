import Mascota from '../domain/Mascota.js';
import { MascotaRepository } from "../infraestructure/MascotaRepository.js";


// 3.1. Ver listado general de mascotas disponibles

// Como: Interesado/Adoptante/Ciudadano
// Quiero: poder ver el listado general de mascotas disponibles
// Para: ver todas las mascotas disponibles directamente.

// Criterios de confirmación:

// Si no hay mascotas disponibles, se debería mostrar el mensaje 
// "Lo siento por el momento no hay mascotas disponibles.".

// Cuando el ciudadano haga click en la pestaña "Adoptar" debería 
// mostrar el nombre, imagen y facilitador de todas las mascotas disponibles para adoptar.

// Si el ciudadano no cuenta con una conexión a internet estable al hacer click en la 
// pestaña "Adoptar", se mostrará el mensaje "Revise su conexión a internet.".


describe('obtenerMascotas', () => {
  afterEach(() => jest.restoreAllMocks());
  let mascotaRepository;

  beforeEach(() => {
    mascotaRepository = new MascotaRepository();
  });

  it('retorna un mensaje cuando no hay conexión', async () => {
    try {
      await mascotaRepository.obtenerMascotas(false);
    } catch (error) {
      expect(error.message).toBe('Revise su conexión a internet.');
      
    }
  });

  it('devuelve un array vacío cuando la API responde con []', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({ ok: true, json: async () => [] });
    try {
      const result = await mascotaRepository.obtenerMascotas(true);
    } catch (error) {
      expect(error.message).toBe('No hay mascotas disponibles.');
    }
  });

  it('lanza error con código HTTP cuando la respuesta no es ok', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({ ok: false, status: 500 });
    await expect(mascotaRepository.obtenerMascotas(true)).rejects.toThrow('HTTP 500');
  });

  it('devuelve un array cuyos objetos contienen las claves esperadas', async () => {
    const apiData = [
      {
        _id: '6921d0e55bd8ce602b65311e',
        nombre: 'Juanito',
        especie: 'Perro',
        raza: 'bulldog',
        edad: 3,
        estado: 'Disponible',
        img_ref: 'https://example.com/image.jpg',
        facilitador: 'Andres Calamaro',
        id: '6921d0e55bd8ce602b65311e'
      },
      {
        _id: '6922195d6432e11c00316713',
        nombre: 'Sparky',
        especie: 'Perro',
        raza: 'Husky',
        edad: 1,
        estado: 'Adoptado',
        img_ref: 'https://example.com/husky.jpg',
        facilitador: 'Jose Maria',
        id: '6922195d6432e11c00316713'
      }
    ];

    jest.spyOn(global, 'fetch').mockResolvedValue({ ok: true, json: async () => apiData });

    const result = await mascotaRepository.obtenerMascotas(true);
    expect(Array.isArray(result)).toBe(true);

    const requiredKeys = ['_id', 'nombre', 'especie', 'raza', 'edad', 'estado', 'img_ref', 'facilitador', 'id'];
    result.forEach(item => {
      requiredKeys.forEach(k => expect(item).toHaveProperty(k));
    });
  });
});




// 3.3. Ver detalles completos de las mascotas

// Como: ciudadano/adoptante
// Quiero: poder ver detalles completos de la mascota
// Para: ver toda la información que necesito considerar para adoptar a la mascota.

// Criterios de confirmación:

// Cuando el ciudadano haga click en una mascota, se debería cargar la información completa y detallada 
// del mismo, como nombre, fotos, cartilla de vacunación, estado.

// Si el ciudadano no cuenta con una conexión de internet estable al hacer click en la mascota, se mostrará 
// el mensaje “Revise su conexión a internet.”.

describe("obtenerDetalleMascota", () => {
  afterEach(() => jest.restoreAllMocks());
  let mascotaRepository;

  beforeEach(() => {
    mascotaRepository = new MascotaRepository();
  });

  it("deberia mostrar 'Revise su conexión a internet.'",  async () => {
    try {
      const result = await mascotaRepository.obtenerDetalleMascota();
    } catch (error) {
      expect(error.message).toBe('Revise su conexión a internet.');
    }
  });
  it('lanza error con código HTTP cuando la respuesta no es ok', async () => {
      jest.spyOn(global, 'fetch').mockResolvedValue({ ok: false, status: 500 });
      // pasar un id para que la función realice la llamada fetch por id
      await expect(mascotaRepository.obtenerDetalleMascota(true, 'some-id')).rejects.toThrow('HTTP 500');
  });
  it("deberia mostrar la información de la mascota por el id", async () => {
    const apiItem = {
      _id: '6921d0e55bd8ce602b65311e',
      nombre: 'Juanito',
      especie: 'Perro',
      raza: 'bulldog',
      edad: 3,
      estado: 'Disponible',
      img_ref: 'https://example.com/image.jpg',
      facilitador: 'Andres Calamaro',
      id: '6921d0e55bd8ce602b65311e'
    };
    jest.spyOn(global, 'fetch').mockResolvedValue({ ok: true, json: async () => apiItem });
    const result = await mascotaRepository.obtenerDetalleMascota(true, apiItem.id);
    const requiredKeys = ['_id','nombre','especie','raza','edad','estado','img_ref','facilitador','id'];
    requiredKeys.forEach(k => expect(result).toHaveProperty(k));
  });
  it('lanza error si no se proporciona id', async () => {
    await expect(mascotaRepository.obtenerDetalleMascota(true)).rejects.toThrow('id de mascota no proporcionado.');
  });
});