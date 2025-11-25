import  MascotaRepository  from './infraestructure/MascotaRepository.js';
import Mascota from './domain/Mascota.js';

document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const idMascota = params.get('id');
    
    const detalleDiv = document.querySelector("#detalle-div");


    let detallesMascota;
    const mascotaRepository = new MascotaRepository();

    // Si no obtuvimos detalles desde API, usamos el fallback por nombre/local
    if (idMascota) {
        detallesMascota = await mascotaRepository.obtenerDetalleMascotaPorId(idMascota);
    }
    
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

        const img = document.createElement('img');
        // Determinar URL base del API según entorno (coincide con otros repos)
        const _hostname =
            typeof window !== 'undefined' && window.location && window.location.hostname
                ? window.location.hostname
                : 'localhost';
        const API_URL = _hostname === 'localhost' ? 'http://localhost:3001' : 'https://ingsoftadoptme.onrender.com';

        const buildImgUrl = (imgRef) => {
            if (!imgRef) return '';
            // si ya es absoluta
            if (/^https?:\/\//i.test(imgRef)) return imgRef;
            // si empieza con slash, unimos directamente
            if (imgRef.startsWith('/')) return `${API_URL}${imgRef}`;
            // si viene como uploads/filename
            return `${API_URL}/${imgRef}`;
        };

        img.src = buildImgUrl(detallesMascota.img_ref) || '';
        img.alt = `Foto de ${detallesMascota.nombre || 'mascota'}`;
        img.className = 'detalle-imagen';
        detalleDiv.appendChild(img);

        // Botón Adoptar dentro del contenedor de detalle
        const adoptBtn = document.createElement('button');
        adoptBtn.id = 'adoptBtn';
        adoptBtn.type = 'button';
        adoptBtn.className = 'adopt-btn';
        adoptBtn.textContent = 'Adoptar';
        // Navega a la pantalla de adopción (se crea `adoptarMascota.html` en src/UI)
        const targetName =  detallesMascota.id;
        adoptBtn.addEventListener('click', () => {
            const mascotaPayload = {
                nombre: detallesMascota.nombre || '',
                especie: detallesMascota.especie || '',
                raza: detallesMascota.raza || '',
                sexo: detallesMascota.sexo || '',
                edad: detallesMascota.edad || 0,
                estado: detallesMascota.estado || '',
                img_ref: detallesMascota.img_ref || '',
                facilitador: detallesMascota.facilitador || '',
                id: detallesMascota.id || ''
            };
            

            const q = targetName ? ('?id=' + encodeURIComponent(targetName)) : '';
            window.location.href = './FormSolicitudAdopcion.html' + q;
        });
        detalleDiv.appendChild(adoptBtn);
    }
});