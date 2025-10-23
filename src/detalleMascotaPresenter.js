import { verDetalleMas } from "./verMascotas.js";

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const nomMas = params.get('nom');

    const detalleDiv = document.querySelector("#detalle-div");

    const conexion = navigator.onLine;

    let detallesMas = verDetalleMas(conexion, nomMas, [["Apolo", "Perruno", "Pitbull", 2, "Macho", "Disponible", "https://www.mediterraneannatural.com/wp-content/uploads/2019/08/Guia-completa-de-las-razas-de-perros-Pit-Bull-Terrier-Americano-3.jpg"], ["Perlita", "Perruno", "Chihuahua", 2, "Hembra", "Disponible", "https://apupabove.com/cdn/shop/articles/Chihuahua_2ab3f5c4-9781-48ed-8119-7f780902c133_1200x1200.jpg?v=1742407300"], ["Bruno", "Perruno", "Salchicha", 2, "Macho", "Disponible", "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/MiniDachshund1_wb.jpg/330px-MiniDachshund1_wb.jpg"]]);

    if (typeof detallesMas == "string") {
    div.innerHTML = "<p>" + mascotas + "</p>";
    } else {
        detalleDiv.innerHTML += "<p>Nombre: " +
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
    };
});