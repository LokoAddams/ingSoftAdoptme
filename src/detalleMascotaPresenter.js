import { verDetalleMas } from "./verMascotas";

document.addEventListener('DOMContentLoaded', () => {
    const detalleDiv = document.querySelector("#detalle-div");

    let detallesMas = verDetalleMas(true, "Apolo", [["Apolo", "Perruno", "Pitbull", 2, "Macho", "Disponible", "https://www.mediterraneannatural.com/wp-content/uploads/2019/08/Guia-completa-de-las-razas-de-perros-Pit-Bull-Terrier-Americano-3.jpg"]])

    detalleDiv. innerHTML += "<p>Nombre: " +
    detallesMas[0] + "<br>" + 
    "Especie: " + detallesMas[1] + "<br>" +
    "Raza: " + detallesMas[2] + "<br>" +
    "Edad: " + detallesMas[3] + "<br>" +
    "Género: " + detallesMas[4] + "<br>" +
    "Estado: " + detallesMas[5] + "</p><br>";
    const imagen = document.createElement("img");
    imagen.src = detallesMas[6];
    imagen.alt = "Foto mascota disponible";
    detalleDiv.appendChild(imagen);
});