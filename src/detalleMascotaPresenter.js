import { verDetalleMas } from "./services/verMascotas.js";

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const nomMas = params.get('nom');
    
    
    const detalleDiv = document.querySelector("#detalle-div");
    
    const conexion = navigator.onLine;
    
    let detallesMas = verDetalleMas(conexion, nomMas, [["Apolo", "Perro", "Pitbull", 2, "Macho", "Disponible", "https://www.mediterraneannatural.com/wp-content/uploads/2019/08/Guia-completa-de-las-razas-de-perros-Pit-Bull-Terrier-Americano-3.jpg"], ["Perlita", "Perro", "Chihuahua", 2, "Hembra", "Disponible", "https://apupabove.com/cdn/shop/articles/Chihuahua_2ab3f5c4-9781-48ed-8119-7f780902c133_1200x1200.jpg?v=1742407300"], ["Bruno", "Perro", "Salchicha", 2, "Macho", "Disponible", "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/MiniDachshund1_wb.jpg/330px-MiniDachshund1_wb.jpg"]]);
    
    // Limpiamos el contenedor antes de armar el contenido
    detalleDiv.innerHTML = "";

    
    if (typeof detallesMas === "string") {
        const p = document.createElement('p');
        p.textContent = detallesMas;
        detalleDiv.appendChild(p);
    } else {
        

        // Contenedor de información
        const infoContainer = document.createElement('div');
        infoContainer.className = 'detalle-info';

        const fields = [
            ['Nombre', detallesMas[0]],
            ['Especie', detallesMas[1]],
            ['Raza', detallesMas[2]],
            ['Edad', detallesMas[3]],
            ['Género', detallesMas[4]],
            ['Estado', detallesMas[5]]
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
        imagen.src = detallesMas[6];
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
        const targetName = nomMas || detallesMas[0];
        adoptBtn.addEventListener('click', () => {
            const q = targetName ? ('?nom=' + encodeURIComponent(targetName)) : '';
            window.location.href = './FormSolicitudAdopcion.html' + q;
        });
        detalleDiv.appendChild(adoptBtn);
    }
});