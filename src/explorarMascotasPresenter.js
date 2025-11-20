import { verMascotas } from "./services/verMascotas.js";
import Mascota from "./domain/Mascota.js";

document.addEventListener("DOMContentLoaded", () => {
  event.preventDefault();

  const div = document.querySelector("#resultado-div");

  const mascota1 = new Mascota({ nombre: "Apolo", img_ref: "https://www.mediterraneannatural.com/wp-content/uploads/2019/08/Guia-completa-de-las-razas-de-perros-Pit-Bull-Terrier-Americano-3.jpg", facilitador: "Centro Patitas al rescate", especie: "Perro", raza: "Pitbull", sexo: "Macho", edad: 2, estado: "Disponible"});
  const mascota2 = new Mascota({ nombre: "Perlita", img_ref: "https://apupabove.com/cdn/shop/articles/Chihuahua_2ab3f5c4-9781-48ed-8119-7f780902c133_1200x1200.jpg?v=1742407300", facilitador: "Rescatista María Prado", especie: "Perro", raza: "Chihuahua", sexo: "Hembra", edad: 3, estado: "Disponible"});
  const mascota3 = new Mascota({ nombre: "Bruno", img_ref: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/MiniDachshund1_wb.jpg/330px-MiniDachshund1_wb.jpg", facilitador: "Albergue Huellitas Libres", especie: "Perro", raza: "Dachshund", sexo: "Macho", edad: 4, estado: "Disponible"});
  const mascota4 = new Mascota({ nombre: "Estela", img_ref: "https://upload.wikimedia.org/wikipedia/commons/a/a0/English_Cocker_Simon_Left.jpg", facilitador: "Rescatista María Prado", especie: "Perro", raza: "Cocker Spaniel", sexo: "Hembra", edad: 3, estado: "Disponible"});
  let listaDeMascotasBD = [mascota1, mascota2, mascota3, mascota4];

  div.innerHTML = "";

  // const mascotas = verMascotas([])
  const conexion = navigator.onLine;
  const mascotasDisponibles = verMascotas(listaDeMascotasBD, conexion);
  
  if (typeof mascotasDisponibles == "string") {
    div.innerHTML = "<p>" + mascotas + "</p>";
  } else {
    for (let i = 0; i < mascotasDisponibles.length; i++) {
      let mascota = mascotasDisponibles[i];

      const a = document.createElement("a");
      a.href = `./UI/detalleMascota.html?nom=${encodeURIComponent(mascota[0])}`;
      a.style.display = "block";     // para que se vea como tarjeta clickable
      a.style.cursor  = "pointer";
      a.style.textDecoration = "none";

      const tarjeta = document.createElement("div");
      tarjeta.innerHTML = `<h2>${mascota[0]}</h2><p>${mascota[2]}</p>`;

      const img = document.createElement("img");
      img.src = mascota[1];
      img.alt = "Foto mascota disponible";

      tarjeta.appendChild(img);
      a.appendChild(tarjeta);
      div.appendChild(a);
      // div.appendChild(document.createElement("br"));
    };
  };
});