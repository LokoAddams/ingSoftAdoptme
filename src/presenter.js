import { verMascotas } from "./verMascotas";

const form = document.querySelector("#verMasc-form");
const div = document.querySelector("#resultado-div");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const mascota = verMascotas(["Apolo"]);

  div.innerHTML = "<p>" + mascota[0] + "</p>";
});