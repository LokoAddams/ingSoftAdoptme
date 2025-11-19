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

import { verMascotas, verDetalleMas } from './services/VerMascotas.js';

describe("Ver Mascota (no hay mascotas disponibles).", () => {
  it("deberia mostrar 'Lo siento, por el momento no hay mascotas disponibles.'", () => {
    expect(verMascotas()).toEqual("Lo siento, por el momento no hay mascotas disponibles.");
  });
});

describe("Ver Mascota (si no hay mascotas disponibles en la lista).", () => {
  it("deberia mostrar 'Lo siento, por el momento no hay mascotas disponibles.'", () => {
    expect(verMascotas([])).toEqual("Lo siento, por el momento no hay mascotas disponibles.");
  });
});

describe("Ver nombre, imagen y facilitador de una Mascota.", () => {
  it("deberia mostrar el nombre, imagen y facilitador de la mascota que está en la lista.", () => {
    expect(verMascotas([["Apolo", "https://www.mediterraneannatural.com/wp-content/uploads/2019/08/Guia-completa-de-las-razas-de-perros-Pit-Bull-Terrier-Americano-3.jpg", "Centro Patitas al rescate"]])).toEqual([["Apolo", "https://www.mediterraneannatural.com/wp-content/uploads/2019/08/Guia-completa-de-las-razas-de-perros-Pit-Bull-Terrier-Americano-3.jpg", "Centro Patitas al rescate"]]);
  });
});

describe("Ver nombre, imagen y facilitador de varias Mascotas.", () => {
  it("deberia mostrar el nombre, imagen y facilitador de las mascotas que están en la lista.", () => {
    expect(verMascotas([["Apolo", "https://www.mediterraneannatural.com/wp-content/uploads/2019/08/Guia-completa-de-las-razas-de-perros-Pit-Bull-Terrier-Americano-3.jpg", "Centro Patitas al rescate"], ["Perlita", "https://apupabove.com/cdn/shop/articles/Chihuahua_2ab3f5c4-9781-48ed-8119-7f780902c133_1200x1200.jpg?v=1742407300", "Rescatista María Prado"], ["Bruno", "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/MiniDachshund1_wb.jpg/330px-MiniDachshund1_wb.jpg", "Albergue Huellitas Libres"]])).toEqual([["Apolo", "https://www.mediterraneannatural.com/wp-content/uploads/2019/08/Guia-completa-de-las-razas-de-perros-Pit-Bull-Terrier-Americano-3.jpg", "Centro Patitas al rescate"], ["Perlita", "https://apupabove.com/cdn/shop/articles/Chihuahua_2ab3f5c4-9781-48ed-8119-7f780902c133_1200x1200.jpg?v=1742407300", "Rescatista María Prado"], ["Bruno", "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/MiniDachshund1_wb.jpg/330px-MiniDachshund1_wb.jpg", "Albergue Huellitas Libres"]]);
  });
});

describe("Ver mascota (la conexión no es estable).", () => {
  it("deberia mostrar el mensaje 'Revise su conexión a internet.'.", () => {
    expect(verMascotas([["Apolo", "https://www.mediterraneannatural.com/wp-content/uploads/2019/08/Guia-completa-de-las-razas-de-perros-Pit-Bull-Terrier-Americano-3.jpg", "Centro Patitas al rescate"], ["Perlita", "https://apupabove.com/cdn/shop/articles/Chihuahua_2ab3f5c4-9781-48ed-8119-7f780902c133_1200x1200.jpg?v=1742407300", "Rescatista María Prado"], ["Bruno", "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/MiniDachshund1_wb.jpg/330px-MiniDachshund1_wb.jpg", "Albergue Huellitas Libres"]], false)).toEqual("Revise su conexión a internet.");
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
    expect(verDetalleMas()).toEqual("Revise su conexión a internet.");
  });
});

describe("Ver información de mascota por medio de su nombre.", () => {
  it("deberia mostrar la información de las mascota por el nombre", () => {
    expect(verDetalleMas(true, "Apolo", [["Apolo", "Perro", "Pitbull", 2, "Macho", "Disponible", "https://www.mediterraneannatural.com/wp-content/uploads/2019/08/Guia-completa-de-las-razas-de-perros-Pit-Bull-Terrier-Americano-3.jpg"]])).toEqual(["Apolo", "Perro", "Pitbull", 2, "Macho", "Disponible", "https://www.mediterraneannatural.com/wp-content/uploads/2019/08/Guia-completa-de-las-razas-de-perros-Pit-Bull-Terrier-Americano-3.jpg"]);
  });
});