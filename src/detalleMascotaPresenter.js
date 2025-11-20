import { verDetalleMas } from "./services/verMascotas.js";
import Mascota from "./domain/Mascota.js";

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const nomMascota = params.get('nom');
    
    const detalleDiv = document.querySelector("#detalle-div");

    const mascota1 = new Mascota({ nombre: "Apolo", img_ref: "https://www.mediterraneannatural.com/wp-content/uploads/2019/08/Guia-completa-de-las-razas-de-perros-Pit-Bull-Terrier-Americano-3.jpg", facilitador: "Centro Patitas al rescate", especie: "Perro", raza: "Pitbull", sexo: "Macho", edad: 2, estado: "Disponible"});
    const mascota2 = new Mascota({ nombre: "Perlita", img_ref: "https://apupabove.com/cdn/shop/articles/Chihuahua_2ab3f5c4-9781-48ed-8119-7f780902c133_1200x1200.jpg?v=1742407300", facilitador: "Rescatista María Prado", especie: "Perro", raza: "Chihuahua", sexo: "Hembra", edad: 3, estado: "Disponible"});
    const mascota3 = new Mascota({ nombre: "Bruno", img_ref: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/MiniDachshund1_wb.jpg/330px-MiniDachshund1_wb.jpg", facilitador: "Albergue Huellitas Libres", especie: "Perro", raza: "Dachshund", sexo: "Macho", edad: 4, estado: "Disponible"});
    const mascota4 = new Mascota({ nombre: "Estela", img_ref: "https://upload.wikimedia.org/wikipedia/commons/a/a0/English_Cocker_Simon_Left.jpg", facilitador: "Rescatista María Prado", especie: "Perro", raza: "Cocker Spaniel", sexo: "Hembra", edad: 3, estado: "Disponible"});
    let listaDeMascotasBD = [mascota1, mascota2, mascota3, mascota4];
    
    const conexion = navigator.onLine;
    
    let detallesMas = verDetalleMascota(conexion, nomMas, [["Apolo", "Perro", "Pitbull", 2, "Macho", "Disponible", "https://www.mediterraneannatural.com/wp-content/uploads/2019/08/Guia-completa-de-las-razas-de-perros-Pit-Bull-Terrier-Americano-3.jpg"], ["Perlita", "Perro", "Chihuahua", 2, "Hembra", "Disponible", "https://apupabove.com/cdn/shop/articles/Chihuahua_2ab3f5c4-9781-48ed-8119-7f780902c133_1200x1200.jpg?v=1742407300"], ["Bruno", "Perro", "Salchicha", 2, "Macho", "Disponible", "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/MiniDachshund1_wb.jpg/330px-MiniDachshund1_wb.jpg"]]);
    
    // Limpiamos el contenedor antes de armar el contenido
    detalleDiv.innerHTML = "";

    
    if (typeof detallesMascota === "string") {
        const p = document.createElement('p');
        p.textContent = detallesMascota;
        detalleDiv.appendChild(p);
    } else {
        

        // Contenedor de información
        const infoContainer = document.createElement('div');
        infoContainer.className = 'detalle-info';

        const fields = [
            ['Nombre', detallesMascota.nombre],
            ['Especie', detallesMascota.especie],
            ['Raza', detallesMascota.raza],
            ['Edad', detallesMascota.edad],
            ['Género', detallesMascota.sexo],
            ['Estado', detallesMascota.estado],
            ['Facilitador', detallesMascota.facilitador]
        ];

        fields.forEach(([label, value]) => {
            const item = document.createElement('div');
            item.className = 'detalle-item';

            const lab = document.createElement('div');
            lab.className = 'detalle-label';
            lab.textContent = label;

            const val = document.createElement('div');
            val.className = 'detalle-value';
            val.textContent = value;

            item.appendChild(lab);
            item.appendChild(val);
            infoContainer.appendChild(item);
        });

        detalleDiv.appendChild(infoContainer);

        const imagen = document.createElement("img");
        imagen.src = detallesMascota.img_ref;
        imagen.alt = "Foto mascota disponible";
        imagen.className = 'detalle-imagen';
        detalleDiv.appendChild(imagen);

        // Botón Adoptar dentro del contenedor de detalle
        const adoptBtn = document.createElement('button');
        adoptBtn.id = 'adoptBtn';
        adoptBtn.type = 'button';
        adoptBtn.className = 'adopt-btn';
        adoptBtn.textContent = 'Adoptar';
        // Navega a la pantalla de adopción (se crea `adoptarMascota.html` en src/UI)
        const targetName = nomMas || detallesMascota.nombre;
        adoptBtn.addEventListener('click', () => {
            const q = targetName ? ('?nom=' + encodeURIComponent(targetName)) : '';
            window.location.href = './FormSolicitudAdopcion.html' + q;
        });
        detalleDiv.appendChild(adoptBtn);
    }
});