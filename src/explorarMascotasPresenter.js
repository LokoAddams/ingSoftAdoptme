import { verMascotas } from "./services/verMascotas.js";
import Mascota from "./domain/Mascota.js";

document.addEventListener("DOMContentLoaded", async () => {
  const div = document.querySelector("#resultado-div");
  div.innerHTML = "";

  // Intentamos obtener la lista real desde el backend
  try {
    try{
      const mascotas = await verMascotas(navigator.onLine);
    }
    catch(error){
      div.innerHTML = `<p>${error.message}</p>`;
      return;
    }    
    
    

    mascotas.forEach((m) => {
      // Crear el enlace que envuelve la tarjeta (igual que la versión anterior)
      const a = document.createElement('a');
      // Pasamos el id en la query para que la vista detalle pueda pedir la mascota al backend
      const mascotaId = encodeURIComponent(m.id || m._id || '');
      a.href = `./UI/detalleMascota.html?id=${mascotaId}`;
      a.style.display = 'block';
      a.style.textDecoration = 'none';

      const inner = document.createElement('div');
      // título
      const titulo = document.createElement('h2');
      titulo.textContent = m.nombre || '';
      // raza/desc
      const p = document.createElement('p');
      p.textContent = m.raza || '';
      // imagen
      const img = document.createElement('img');
      img.src = m.img_ref || '';
      img.alt = `Foto de ${m.nombre || 'mascota'}`;

      inner.appendChild(titulo);
      inner.appendChild(p);
      inner.appendChild(img);

      a.appendChild(inner);

      const solicitarBtn = document.createElement('button');
      solicitarBtn.type = 'button';
      solicitarBtn.className = 'adopt-btn';
      solicitarBtn.textContent = 'Solicitar adopción';
      solicitarBtn.addEventListener('click', (ev) => {
        // evitar que el click en el botón active el <a> padre si está dentro
        ev.stopPropagation();
        ev.preventDefault();
        // Navegamos al formulario pasando solo el id en la query
        const idParam = encodeURIComponent(m.id || m._id || '');
        window.location.href = `./UI/FormSolicitudAdopcion.html?id=${idParam}`;
      });

      // Apilar: primero el enlace (tarjeta), luego el botón
      const container = document.createElement('div');
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.alignItems = 'center';
      container.appendChild(a);
      container.appendChild(solicitarBtn);

      div.appendChild(container);
    });
  } catch (err) {
    console.error('Error al obtener mascotas desde API, usando fallback:', err);
    // Fallback: mostrar mensaje o datos locales si es necesario
    div.innerHTML = '<p>Error al cargar mascotas. Intenta nuevamente más tarde.</p>';
  }
});