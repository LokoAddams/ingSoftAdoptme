import Mascota from '../domain/Mascota.js';
import { verMascotas, verDetalleMascota } from '../services/verMascotas.js';

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


describe('verMascotas', () => {
  afterEach(() => jest.restoreAllMocks());

  it('retorna un mensaje cuando no hay conexión', async () => {
    try {
      await verMascotas(false);
    } catch (error) {
      expect(error.message).toBe('Revise su conexión a internet.');
      
    }
  });

  it('devuelve un array vacío cuando la API responde con []', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({ ok: true, json: async () => [] });
    try {
      const result = await verMascotas(true);
    } catch (error) {
      expect(error.message).toBe('No hay mascotas disponibles.');
    }
  });

  it('lanza error con código HTTP cuando la respuesta no es ok', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({ ok: false, status: 500 });
    await expect(verMascotas(true)).rejects.toThrow('HTTP 500');
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

    const result = await verMascotas(true);
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

describe("Ver información de mascota si no hay conexión estable.", () => {
  it("deberia mostrar 'Revise su conexión a internet.'", () => {
    expect(verDetalleMascota()).toEqual("Revise su conexión a internet.");
  });
});

describe("Ver información de mascota por medio de su nombre.", () => {
  it("deberia mostrar la información de las mascota por el nombre", () => {
    const mascota1 = new Mascota({ nombre: "Apolo", img_ref: "https://www.mediterraneannatural.com/wp-content/uploads/2019/08/Guia-completa-de-las-razas-de-perros-Pit-Bull-Terrier-Americano-3.jpg", facilitador: "Centro Patitas al rescate", especie: "Perro", raza: "Pitbull", sexo: "Macho", edad: 2, estado: "Disponible"});
    const mascota2 = new Mascota({ nombre: "Perlita", img_ref: "https://apupabove.com/cdn/shop/articles/Chihuahua_2ab3f5c4-9781-48ed-8119-7f780902c133_1200x1200.jpg?v=1742407300", facilitador: "Rescatista María Prado", especie: "Perro", raza: "Chihuahua", sexo: "Hembra", edad: 3, estado: "Disponible"});
    const mascota3 = new Mascota({ nombre: "Bruno", img_ref: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/MiniDachshund1_wb.jpg/330px-MiniDachshund1_wb.jpg", facilitador: "Albergue Huellitas Libres", especie: "Perro", raza: "Dachshund", sexo: "Macho", edad: 4, estado: "Disponible"});
    const listaMascotas = [mascota1, mascota2, mascota3];
    expect(verDetalleMascota(true, "Apolo", listaMascotas)).toEqual({ nombre: "Apolo", img_ref: "https://www.mediterraneannatural.com/wp-content/uploads/2019/08/Guia-completa-de-las-razas-de-perros-Pit-Bull-Terrier-Americano-3.jpg", facilitador: "Centro Patitas al rescate", especie: "Perro", raza: "Pitbull", sexo: "Macho", edad: 2, estado: "Disponible"});
  });
});