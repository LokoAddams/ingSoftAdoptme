import { verMascotas } from "./verMascotas";

const form = document.querySelector("#verMasc-form");
const div = document.querySelector("#resultado-div");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const mascotas = verMascotas([["Apolo", "https://www.mediterraneannatural.com/wp-content/uploads/2019/08/Guia-completa-de-las-razas-de-perros-Pit-Bull-Terrier-Americano-3.jpg", "Centro Patitas al rescate"], ["Perlita", "https://apupabove.com/cdn/shop/articles/Chihuahua_2ab3f5c4-9781-48ed-8119-7f780902c133_1200x1200.jpg?v=1742407300", "Rescatista María Prado"], ["Bruno", "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/MiniDachshund1_wb.jpg/330px-MiniDachshund1_wb.jpg", "Albergue Huellitas Libres"]]);
  
  for (let i = 0; i < mascotas.length; i++) {
    let mascota = mascotas[i];

    div.innerHTML += "<p>" + 
    mascota[0] + "<br>" +
    mascota[2] +
    "</p>";
    const imagen = document.createElement("img");
    imagen.src = mascota[1];
    imagen.alt = "Foto mascota disponible";
    div.appendChild(imagen);
    div.innerHTML += "<br>"
  }
});