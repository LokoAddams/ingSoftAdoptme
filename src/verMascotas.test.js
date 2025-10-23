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

import { verMascotas } from "./verMascotas";

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