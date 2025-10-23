import { verMascotas } from "./verMascotas";

const form = document.querySelector("#verMasc-form");
const div = document.querySelector("#resultado-div");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const mascotas = verMascotas([["Apolo", "https://www.mediterraneannatural.com/wp-content/uploads/2019/08/Guia-completa-de-las-razas-de-perros-Pit-Bull-Terrier-Americano-3.jpg", "Centro Patitas al rescate"]]);
  const mascota = mascotas[0]

  div.innerHTML = "<p>" + 
  mascota[0] + "<br>" +
  mascota[1] + "<br>" +
  mascota[2]
  + "</p>";
});